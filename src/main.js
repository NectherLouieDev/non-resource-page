import { createTaxonomyFilter } from "./components/TaxonomyFilter";
import { addStyles } from "./utils/helpers";

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS styles first
    addStyles();
    
    // Create and append the taxonomy filter component
    const taxonomyFilter = createTaxonomyFilter();
    const container = document.querySelector('#test1742');
    if (container) {
        container.appendChild(taxonomyFilter);
    } else {
        // Create container if it doesn't exist
        const newContainer = document.createElement('div');
        newContainer.id = 'test1742';
        document.body.appendChild(newContainer);
        newContainer.appendChild(taxonomyFilter);
    }
});