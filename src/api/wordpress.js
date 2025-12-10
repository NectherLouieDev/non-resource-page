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

// Fetch WordPress posts based on selected filters
async function fetchWordPressPosts(filters) {
  try {
    // Construct query parameters for custom endpoint
    const params = new URLSearchParams();
    params.append("per_page", 12);

    // Add taxonomy filters
    Object.entries(filters).forEach(([taxonomySlug, termSlug]) => {
    //   console.log("taxonomySlug", taxonomySlug);
      params.append(taxonomySlug, termSlug);
    });

    
    // const paramsObj = Object.fromEntries(params);
    // console.log("params object", paramsObj);
    
    // Use custom WordPress REST API endpoint from functions.php
    const apiUrl = `${window.location.origin}/wp-json/taxonomy-filter/v1/posts`;
    const response = await fetch(`${apiUrl}?${params}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const posts = await response.json();

    // Display posts
    displayWordPressPosts(posts, filters);
  } catch (error) {
    console.error("Error fetching WordPress posts:", error);
    showFallbackContent(filters, error.message);
  }
}

export { fetchWordPressPosts, fetchSiteTaxonomies, buildTaxonomyData };
