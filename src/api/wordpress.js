import {
  displayWordPressPosts,
  showFallbackContent,
} from "../components/TaxonomyFilter";

async function fetchSiteTaxonomies() {
  try {
    const response = await fetch("/wp-json/wp/v2/taxonomies");
    const taxonomies = await response.json();
    console.log("Available taxonomies:", taxonomies);
    // This returns an object where keys are taxonomy slugs (e.g., 'category', 'post_tag', 'topic')
  } catch (error) {
    console.error("Error fetching taxonomies:", error);
  }
}

async function buildTaxonomyData() {
  // Define the slugs for your four specific taxonomies
  // maybe grab it from fetchSiteTaxonomies() using non_ as key
  const taxonomySlugs = [
    "non_topic",
    "non_scripture",
    "non_series",
    "non_theme",
  ];
  const taxonomiesData = {};

  for (const slug of taxonomySlugs) {
    try {
      const response = await fetch(`/wp-json/wp/v2/${slug}?per_page=100`); // Fetch many terms
      const terms = await response.json();

      // Transform the API data into your required { "slug": "Name" } format
      taxonomiesData[slug] = {};
      terms.forEach((term) => {
        taxonomiesData[slug][term.slug] = term.name;
      });
    } catch (error) {
      console.error(`Failed to fetch terms for taxonomy "${slug}":`, error);
      taxonomiesData[slug] = {}; // Assign empty object on error
    }
  }

//   console.log('Dynamic taxonomiesData:', taxonomiesData);
  return taxonomiesData;
}

window.currentPage = 1;
window.totalPages = 1;
window.allPosts = [];
window.currentFilters = {};

// Fetch WordPress posts based on selected filters
async function fetchWordPressPosts(filters = {}, isInitialLoad = false) {
  try {
    // Construct query parameters for custom endpoint
    const params = new URLSearchParams();
    params.append("per_page", 12);
    params.append('page', window.currentPage);

    // Add taxonomy filters
    Object.entries(filters).forEach(([taxonomySlug, termSlug]) => {
    //   console.log("taxonomySlug", taxonomySlug);
      params.append(taxonomySlug, termSlug || '');
    });

    console.log("Fetching with params:", params.toString());

    window.currentFilters = filters;
    
    // const paramsObj = Object.fromEntries(params);
    // console.log("params object", paramsObj);
    
    // Use custom WordPress REST API endpoint from functions.php
    // const apiUrl = `${window.location.origin}/wp-json/taxonomy-filter/v1/posts`;
    const apiUrl = getRestApiUrl() + `taxonomy-filter/v1/posts`;

    // console.log("Fetching from:", apiUrl);
    
    const response = await fetch(`${apiUrl}?${params}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Debug: Check all headers
    console.log("Response headers:");
    for (const [key, value] of response.headers.entries()) {
      console.log(`${key}: ${value}`);
    }

    // Get pagination headers
    const totalItems = response.headers.get('X-WP-Total');
    const totalPages = response.headers.get('X-WP-TotalPages');
    
    console.log("X-WP-Total:", totalItems);
    console.log("X-WP-TotalPages:", totalPages);

    // Parse the total pages
    const totalPagesNum = totalPages ? parseInt(totalPages) : 1;
    console.log("Parsed total pages:", totalPagesNum);

    const posts = await response.json();
    console.log("Fetched posts:", posts.length);

    if (isInitialLoad || window.currentPage === 1) {
      window.allPosts = posts;
    } else {
      window.allPosts = [...window.allPosts, ...posts];
    }

    window.totalPages = totalPagesNum;

    // Display posts
    displayWordPressPosts(window.allPosts, filters, window.totalPages, window.currentPage);

    return posts;
  } catch (error) {
    console.error("Error fetching WordPress posts:", error);
    showFallbackContent(filters, error.message);

    return null;
  }
}

function getRestApiUrl() {
    // Priority 1: wpData (if you define it)
    if (window.wpData && window.wpData.rest_url) {
        return window.wpData.rest_url;
    }
    
    // Priority 2: WordPress default
    if (typeof wpApiSettings !== 'undefined' && wpApiSettings.root) {
        return wpApiSettings.root;
    }
    
    // Priority 3: Try to construct it
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    
    // Check if WordPress is in a subdirectory
    if (pathname.includes('/wp-content/') || pathname.includes('/wp-admin/')) {
        // Extract WordPress directory
        const wpDir = pathname.split('/wp-content/')[0] || 
                      pathname.split('/wp-admin/')[0];
        return origin + wpDir + '/wp-json/';
    }
    
    // Default to root
    return origin + '/wp-json/';
}

// Function to load next page
function loadNextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    fetchWordPressPosts(currentFilters);
  }

  return currentPage;
}

// Function to load specific page
function loadPage(pageNumber) {
  if (pageNumber > 0 && pageNumber <= totalPages) {
    currentPage = pageNumber;
    fetchWordPressPosts(currentFilters);
  }
}

// Function to reset pagination
function resetPagination() {
  currentPage = 1;
  totalPages = 1;
  allPosts = [];
}

export { fetchWordPressPosts, fetchSiteTaxonomies, buildTaxonomyData, loadNextPage, loadPage, resetPagination };
