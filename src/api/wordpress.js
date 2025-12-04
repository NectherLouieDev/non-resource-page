import { displayWordPressPosts, showFallbackContent } from "../components/TaxonomyFilter";

// Fetch WordPress posts based on selected filters
async function _fetchWordPressPosts(filters) {
    try {
        // Construct query parameters
        const params = new URLSearchParams();
        params.append('_embed', 'true');
        params.append('per_page', 12);
        
        // Add taxonomy filters
        Object.entries(filters).forEach(([taxonomy, term]) => {
            params.append(taxonomy, term);
        });
        
        // Use WordPress REST API
        const apiUrl = `${window.location.origin}/wp-json/wp/v2/posts`;
        const response = await fetch(`${apiUrl}?${params}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const posts = await response.json();
        
        // Display posts
        displayWordPressPosts(posts, filters);
        
    } catch (error) {
        console.error('Error fetching WordPress posts:', error);
        showFallbackContent(filters, error.message);
    }
}

// Fetch WordPress posts based on selected filters
async function fetchWordPressPosts(filters) {
    try {
        // Construct query parameters for custom endpoint
        const params = new URLSearchParams();
        params.append('per_page', 12);
        
        // Add taxonomy filters
        Object.entries(filters).forEach(([taxonomy, term]) => {
            params.append(taxonomy, term);
        });
        
        // Use custom WordPress REST API endpoint
        
        alert (JSON.stringify(params));

        const apiUrl = `${window.location.origin}/wp-json/taxonomy-filter/v1/posts`;
        const response = await fetch(`${apiUrl}?${params}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const posts = await response.json();
        
        // Display posts
        displayWordPressPosts(posts, filters);
        
    } catch (error) {
        console.error('Error fetching WordPress posts:', error);
        showFallbackContent(filters, error.message);
    }
}

export { fetchWordPressPosts }