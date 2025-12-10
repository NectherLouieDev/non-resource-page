<?php
// wp-content/themes/your-theme/inc/taxonomy-filter-rest-api.php (Production)

if (!defined('ABSPATH')) {
    exit;
}

add_action('rest_api_init', function() {
    register_rest_route('taxonomy-filter/v1', '/posts', array(
        'methods' => 'GET',
        'callback' => 'get_filtered_posts',
        'permission_callback' => '__return_true',
    ));
});

function get_filtered_posts($request) {
    $args = array(
        'post_type' => 'post',
        'posts_per_page' => 12,
        'post_status' => 'publish',
    );
    
    $taxonomies = array('non_topic', 'non_scripture', 'non_series', 'non_theme');
    $tax_query = array();
    
    foreach ($taxonomies as $taxonomy) {
        $term = $request->get_param($taxonomy);
        if ($term && $term !== 'all') {
            $tax_query[] = array(
                'taxonomy' => $taxonomy,
                'field' => 'slug',
                'terms' => $term,
            );
        }
    }
    
    if (!empty($tax_query)) {
        if (count($tax_query) > 1) {
            $tax_query['relation'] = 'AND';
        }
        $args['tax_query'] = $tax_query;
    }

    $query = new WP_Query($args);
    $posts = array();
    
    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $post_data = array(
                'id' => get_the_ID(),
                'title' => get_the_title(),
                'excerpt' => get_the_excerpt(),
                'content' => get_the_content(),
                'link' => get_permalink(),
                'date' => get_the_date('c'),
                'featured_image' => get_the_post_thumbnail_url(get_the_ID(), 'full'),
            );
            $posts[] = $post_data;
        }
        wp_reset_postdata();
    }
    
    return rest_ensure_response($posts);
}