import { createTaxonomyFilter } from "./components/TaxonomyFilter";
import { addStyles, hideFilterLoadingState, showFilterErrorState, showFilterLoadingState } from "./utils/helpers";

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", async function () {
  // Add CSS styles first
  addStyles();

  // Optional: Show loading state for the filter component
  showFilterLoadingState();

  try {
    // Create and append the taxonomy filter component (now async)
    const taxonomyFilter = await createTaxonomyFilter();
    const container = document.querySelector("#test1742");

    if (container) {
      container.appendChild(taxonomyFilter);
    } else {
      // Create container if it doesn't exist
      const newContainer = document.createElement("div");
      newContainer.id = "test1742";
      document.body.appendChild(newContainer);
      newContainer.appendChild(taxonomyFilter);
    }

    // Hide loading state once filter is loaded
    hideFilterLoadingState();
  } catch (error) {
    // Handle errors from createTaxonomyFilter
    console.error("Failed to create taxonomy filter:", error);
    showFilterErrorState(error);
  }
});