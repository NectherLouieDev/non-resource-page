<?php
// Taxonomy Filtering Standalone
add_action('init', function() {
    error_log('Registered taxonomies:');
    $taxonomies = get_taxonomies();
    foreach($taxonomies as $tax) {
        error_log(" - $tax");
    }
});

add_action('rest_api_init', function() {
    register_rest_route('taxonomy-filter/v1', '/posts', array(
        'methods' => 'GET',
        'callback' => 'get_filtered_posts',
        'permission_callback' => '__return_true',
    ));
});

function get_filtered_posts($request) {

    
    error_log('=== START FILTERED POSTS DEBUG ===');
    error_log('Full request params: ' . print_r($request->get_params(), true));

    $args = array(
        'post_type' => 'post',
        'posts_per_page' => 12,
        'post_status' => 'publish',
    );
    
    // Array of possible taxonomy parameters
    $taxonomies = array('non_topic', 'non_scripture', 'non_series', 'non_theme');
    $tax_query = array();
    
    foreach ($taxonomies as $taxonomy) {
        $term = $request->get_param($taxonomy);
        error_log("Checking parameter '$taxonomy': " . ($term ? "'$term'" : 'NULL/EMPTY'));
        if ($term) {
            error_log("  -> Adding to tax_query: $taxonomy = $term");
            $tax_query[] = array(
                'taxonomy' => $taxonomy,
                'field' => 'slug',
                'terms' => $term,
            );
        }
    }
    
    // Apply tax_query if we have any filters
    if (!empty($tax_query)) {
        error_log("Applying tax_query (count: " . count($tax_query) . ")");
        if (count($tax_query) > 1) {
            $tax_query['relation'] = 'AND';
        }
        $args['tax_query'] = $tax_query;
    }
    
    // Debug: Log the query args (remove in production)
    error_log('tax_query array: ' . print_r($tax_query, true));
    
    error_log('Final WP_Query args: ' . print_r($args, true));

    $query = new WP_Query($args);
    error_log('Query found posts: ' . $query->found_posts);
    
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
    
    error_log('=== END FILTERED POSTS DEBUG ===');
    return rest_ensure_response($posts);
}
?>