import { fetchWordPressPosts } from "../api/wordpress";
import { addPostHoverEffects } from "../utils/helpers";

// Main Taxonomy Filter Component
function createTaxonomyFilter() {
    // Create main container div
    const div = document.createElement('div');
    div.id = 'content';
    div.className = 'site-content';
    
    // Create taxonomy data structure
    const taxonomiesData = {
        "topic": {
            "sanctification": "Sanctification",
            "hope": "Hope", 
            "heart": "Heart",
            "trinity": "Trinity"
        },
        "scripture": {
            "genesis-1": "Genesis 1",
            "genesis-2": "Genesis 2",
            "proverbs-1": "Proverbs 1",
            "proverbs-2": "Proverbs 2",
            "psalms-1": "Psalms 1"
        },
        "series": {
            "heart-of-the-matter": "Heart of the Matter",
            "our-fathers-heart": "Our Father's Heart",
            "gods-people": "God's People",
            "the-story": "The Story"
        },
        "theme": {
            "wisdom": "Wisdom",
            "theology": "Theology",
            "gospel": "Gospel",
            "church": "Church"
        }
    };
    
    // Store references to DOM elements
    let searchButton = null;
    let resetButton = null;
    let selectElements = {};
    
    // Store data in global scope for easy access
    const dataScript = document.createElement('script');
    dataScript.type = 'application/json';
    dataScript.id = 'taxonomy-data';
    dataScript.textContent = JSON.stringify(taxonomiesData);
    div.appendChild(dataScript);
    
    // Create header section
    const headerSection = document.createElement('section');
    headerSection.className = 'section__padding taxonomy-filter__header';
    
    const container = document.createElement('div');
    container.className = 'container header-wrap';
    
    const row1 = document.createElement('div');
    row1.className = 'row justify-content-xl-center';
    
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-12 col-xl-10';
    
    // Create title
    const h1 = document.createElement('h1');
    h1.className = 'text-center text-white section__heading section__heading--white';
    h1.textContent = 'Taxonomy Filter System';
    col.appendChild(h1);
    
    // Create subtitle
    const subtitle = document.createElement('p');
    subtitle.className = 'text-center text-white';
    subtitle.style.opacity = '0.8';
    subtitle.style.marginBottom = '2rem';
    subtitle.style.fontSize = '1.1rem';
    subtitle.textContent = 'Filter posts by selecting from the four main taxonomy categories';
    col.appendChild(subtitle);
    
    // Create filter block
    const filterBlock = document.createElement('div');
    filterBlock.className = 'filter-block';
    
    const h6 = document.createElement('h6');
    h6.className = 'text-white filter-block__title';
    h6.textContent = 'Step 04 - Make your selections:';
    filterBlock.appendChild(h6);
    
    // Create filter row with 4 columns
    const filterRow = document.createElement('div');
    filterRow.className = 'row';
    
    // Create filter items for each taxonomy
    const taxonomies = [
        { id: 'non_topic', label: '01 - TOPIC', options: taxonomiesData.topic },
        { id: 'non_scripture', label: '02 - SCRIPTURE', options: taxonomiesData.scripture },
        { id: 'non_series', label: '03 - SERIES', options: taxonomiesData.series },
        { id: 'non_theme', label: '04 - THEME', options: taxonomiesData.theme }
    ];
    
    taxonomies.forEach((taxonomy, index) => {
        const taxonomyCol = document.createElement('div');
        taxonomyCol.className = 'col-12 col-md-6 col-lg-3 filter-item';
        taxonomyCol.id = `taxonomy-${taxonomy.id}`;
        
        const taxonomyTitle = document.createElement('h6');
        taxonomyTitle.className = 'filter-item__title';
        taxonomyTitle.textContent = taxonomy.label;
        taxonomyCol.appendChild(taxonomyTitle);
        
        const selectWrap = document.createElement('div');
        selectWrap.className = 'select-wrap';
        
        const taxonomySelect = document.createElement('select');
        taxonomySelect.className = `filter-item__select js-taxonomy js-taxonomy-${taxonomy.id}`;
        taxonomySelect.id = `select-${taxonomy.id}`;
        taxonomySelect.dataset.taxonomy = taxonomy.id;
        
        // Create default option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.selected = true;
        defaultOption.disabled = true;
        defaultOption.textContent = `Choose ${taxonomy.id}`;
        taxonomySelect.appendChild(defaultOption);
        
        // Add "All" option
        const allOption = document.createElement('option');
        allOption.value = 'all';
        allOption.textContent = `All ${taxonomy.id.charAt(0).toUpperCase() + taxonomy.id.slice(1)}`;
        taxonomySelect.appendChild(allOption);
        
        // Add taxonomy options
        Object.entries(taxonomy.options).forEach(([value, label]) => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = label;
            option.className = `js-option js-${taxonomy.id}-option`;
            taxonomySelect.appendChild(option);
        });
        
        selectWrap.appendChild(taxonomySelect);
        taxonomyCol.appendChild(selectWrap);
        filterRow.appendChild(taxonomyCol);
        
        // Store reference
        selectElements[taxonomy.id] = taxonomySelect;
    });
    
    filterBlock.appendChild(filterRow);
    
    // Add control buttons row
    const controlRow = document.createElement('div');
    controlRow.className = 'row';
    controlRow.style.marginTop = '2rem';
    
    const controlCol = document.createElement('div');
    controlCol.className = 'col-12';
    controlCol.style.display = 'flex';
    controlCol.style.gap = '1rem';
    controlCol.style.justifyContent = 'center';
    controlCol.style.flexWrap = 'wrap';
    
    // Add reset button
    resetButton = document.createElement('button');
    resetButton.type = 'button';
    resetButton.className = 'filter-block__reset';
    resetButton.id = 'reset-button';
    resetButton.textContent = 'Reset All Selections';
    
    // Add search button
    searchButton = document.createElement('button');
    searchButton.type = 'button';
    searchButton.className = 'filter-block__search';
    searchButton.id = 'search-button';
    searchButton.textContent = 'Search Posts';
    searchButton.style.background = '#48bb78';
    searchButton.style.color = 'white';
    searchButton.style.border = '2px solid #48bb78';
    
    controlCol.appendChild(resetButton);
    controlCol.appendChild(searchButton);
    controlRow.appendChild(controlCol);
    filterBlock.appendChild(controlRow);
    
    col.appendChild(filterBlock);
    row1.appendChild(col);
    container.appendChild(row1);
    headerSection.appendChild(container);
    div.appendChild(headerSection);
    
    // Create results section
    const resultsSection = document.createElement('section');
    resultsSection.className = 'section__padding taxonomy-filter__results';
    
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'container';
    
    // Results content placeholder
    const resultsContent = document.createElement('div');
    resultsContent.id = 'results-content';
    resultsContent.className = 'results-content';
    resultsContent.innerHTML = `
        <div class="text-center" style="padding: 4rem;">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #63b3ed 0%, #4299e1 100%); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </div>
            <h3 style="color: #718096; margin-bottom: 1rem; font-size: 1.5rem;">Select taxonomy filters to find posts</h3>
            <p style="color: #a0aec0; max-width: 600px; margin: 0 auto;">
                Choose from any of the four taxonomy categories to filter WordPress posts. 
                You can select one or multiple filters to narrow down your search.
            </p>
        </div>
    `;
    
    resultsContainer.appendChild(resultsContent);
    resultsSection.appendChild(resultsContainer);
    div.appendChild(resultsSection);
    
    // Event Handlers
    function handleTaxonomyChange(event) {
        const select = event.target;
        const taxonomy = select.dataset.taxonomy;
        const selectedValue = select.value;
        
        // Update the select element style based on selection
        if (selectedValue && selectedValue !== 'all') {
            select.parentElement.parentElement.classList.add('filter-item--selected');
        } else {
            select.parentElement.parentElement.classList.remove('filter-item--selected');
        }
        
        // Update search button state
        updateSearchButtonState();
        
        // Update results preview
        updateResultsPreview();
    }
    
    function handleReset() {
        // Reset all select elements
        Object.values(selectElements).forEach(select => {
            select.value = '';
            select.selectedIndex = 0;
            select.parentElement.parentElement.classList.remove('filter-item--selected');
        });
        
        // Update search button
        updateSearchButtonState();
        
        // Reset results
        resetResults();
    }
    
    function handleSearch() {
        // Get all selected values
        const selectedFilters = {};
        let hasSelection = false;
        
        Object.entries(selectElements).forEach(([taxonomy, select]) => {
            if (select.value && select.value !== 'all') {
                selectedFilters[taxonomy] = select.value;
                hasSelection = true;
            }
        });
        
        if (!hasSelection) {
            // Show message to select at least one filter
            showMessage('Please select at least one filter before searching.', 'info');
            return;
        }
        
        // Show loading state
        showLoading();
        
        // Fetch WordPress posts based on selected filters
        fetchWordPressPosts(selectedFilters);
    }
    
    function updateSearchButtonState() {
        if (!searchButton) return;
        
        const hasSelection = Object.values(selectElements).some(select => 
            select.value && select.value !== 'all'
        );
        
        if (hasSelection) {
            searchButton.disabled = false;
            searchButton.style.opacity = '1';
            searchButton.style.cursor = 'pointer';
            searchButton.style.background = '#48bb78';
            searchButton.style.transform = 'scale(1)';
        } else {
            searchButton.disabled = true;
            searchButton.style.opacity = '0.6';
            searchButton.style.cursor = 'not-allowed';
            searchButton.style.background = '#a0aec0';
            searchButton.style.transform = 'scale(0.98)';
        }
    }
    
    function updateResultsPreview() {
        const selectedFilters = {};
        Object.entries(selectElements).forEach(([taxonomy, select]) => {
            if (select.value && select.value !== 'all') {
                selectedFilters[taxonomy] = {
                    value: select.value,
                    label: select.options[select.selectedIndex].text
                };
            }
        });
        
        const filterCount = Object.keys(selectedFilters).length;
        
        if (filterCount === 0) {
            // Remove existing preview if any
            const existingPreview = document.getElementById('filter-preview');
            if (existingPreview) {
                existingPreview.remove();
            }
            return;
        }
        
        // Show small preview of selected filters
        const preview = document.createElement('div');
        preview.id = 'filter-preview';
        preview.style.marginTop = '1.5rem';
        preview.style.padding = '1rem';
        preview.style.background = 'rgba(255, 255, 255, 0.05)';
        preview.style.borderRadius = '8px';
        preview.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        
        let previewHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between;">
                <div>
                    <span style="color: #a0aec0; font-size: 0.875rem;">Selected filters:</span>
                    <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem; flex-wrap: wrap;">
        `;
        
        Object.entries(selectedFilters).forEach(([taxonomy, data]) => {
            previewHTML += `
                <span style="display: inline-flex; align-items: center; gap: 0.25rem; padding: 0.25rem 0.75rem; background: rgba(99, 179, 237, 0.2); color: #63b3ed; border-radius: 4px; font-size: 0.875rem;">
                    <strong style="text-transform: uppercase; font-size: 0.75rem;">${taxonomy}:</strong> ${data.label}
                </span>
            `;
        });
        
        previewHTML += `
                    </div>
                </div>
                <div>
                    <span style="color: #a0aec0; font-size: 0.875rem;">${filterCount} filter${filterCount !== 1 ? 's' : ''} selected</span>
                </div>
            </div>
        `;
        
        preview.innerHTML = previewHTML;
        
        // Remove existing preview if any
        const existingPreview = document.getElementById('filter-preview');
        if (existingPreview) {
            existingPreview.remove();
        }
        
        // Insert after filter block title
        h6.parentNode.insertBefore(preview, h6.nextSibling.nextSibling);
    }
    
    function resetResults() {
        const resultsContent = document.getElementById('results-content');
        resultsContent.innerHTML = `
            <div class="text-center" style="padding: 4rem;">
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #63b3ed 0%, #4299e1 100%); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
                <h3 style="color: #718096; margin-bottom: 1rem; font-size: 1.5rem;">Select taxonomy filters to find posts</h3>
                <p style="color: #a0aec0; max-width: 600px; margin: 0 auto;">
                    Choose from any of the four taxonomy categories to filter WordPress posts. 
                    You can select one or multiple filters to narrow down your search.
                </p>
            </div>
        `;
        
        // Remove filter preview if exists
        const preview = document.getElementById('filter-preview');
        if (preview) {
            preview.remove();
        }
    }
    
    function showLoading() {
        const resultsContent = document.getElementById('results-content');
        resultsContent.innerHTML = `
            <div style="max-width: 1200px; margin: 0 auto; padding: 3rem 2rem;">
                <div style="text-align: center; padding: 4rem;">
                    <div style="display: inline-block; width: 60px; height: 60px; border: 4px solid #f3f3f3; border-top: 4px solid #63b3ed; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 1.5rem;"></div>
                    <h3 style="color: #718096; margin-bottom: 1rem; font-size: 1.5rem;">Searching WordPress posts...</h3>
                    <p style="color: #a0aec0; max-width: 600px; margin: 0 auto;">
                        Fetching posts based on your selected filters. This may take a moment.
                    </p>
                </div>
            </div>
        `;
    }
    
    function showMessage(message, type = 'info') {
        const colors = {
            info: '#63b3ed',
            success: '#48bb78',
            warning: '#ed8936',
            error: '#f56565'
        };
        
        const messageDiv = document.createElement('div');
        messageDiv.style.position = 'fixed';
        messageDiv.style.top = '20px';
        messageDiv.style.right = '20px';
        messageDiv.style.padding = '1rem 1.5rem';
        messageDiv.style.background = colors[type];
        messageDiv.style.color = 'white';
        messageDiv.style.borderRadius = '8px';
        messageDiv.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        messageDiv.style.zIndex = '1000';
        messageDiv.style.maxWidth = '400px';
        messageDiv.style.animation = 'slideIn 0.3s ease';
        
        messageDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    ${type === 'info' ? '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="8"></line>' : ''}
                    ${type === 'success' ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>' : ''}
                </svg>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(messageDiv);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 300);
        }, 3000);
    }
    
    // Add event listeners
    Object.values(selectElements).forEach(select => {
        select.addEventListener('change', handleTaxonomyChange);
    });
    
    resetButton.addEventListener('click', handleReset);
    searchButton.addEventListener('click', handleSearch);
    
    // Initialize search button state
    updateSearchButtonState();
    
    return div;
}

// Display WordPress posts in a grid
function displayWordPressPosts(posts, filters) {
    const resultsContent = document.getElementById('results-content');
    
    if (!posts || posts.length === 0) {
        resultsContent.innerHTML = `
            <div style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
                <div style="background: white; border-radius: 12px; padding: 2.5rem; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);">
                    <div style="text-align: center; padding: 3rem;">
                        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y1="15"></line>
                                <line x1="9" y1="9" x2="15" y1="15"></line>
                            </svg>
                        </div>
                        <h3 style="color: #718096; margin-bottom: 1rem; font-size: 1.5rem;">No posts found</h3>
                        <p style="color: #a0aec0; max-width: 600px; margin: 0 auto 1.5rem;">
                            No WordPress posts match your selected filters. Try adjusting your selections or check back later.
                        </p>
                        <button onclick="window.resetFilters && window.resetFilters()" 
                                style="padding: 0.75rem 1.5rem; background: #63b3ed; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
                            Try Different Filters
                        </button>
                    </div>
                </div>
            </div>
        `;
        return;
    }
    
    // Create posts grid HTML
    const postsGrid = posts.map(post => {
        const featuredImage = post.featured_image || `${window.location.origin}/wp-content/uploads/default-thumbnail.jpg`;
        
        const postDate = new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        const excerpt = post.excerpt ? post.excerpt.substring(0, 150) + '...' : '';
        
        return `
            <article class="post-card" style="background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); transition: transform 0.3s ease, box-shadow 0.3s ease; height: 100%;">
                <div style="height: 200px; overflow: hidden;">
                    <img src="${featuredImage}" 
                         alt="${post.title}" 
                         style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;">
                </div>
                <div style="padding: 1.5rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                        <span style="font-size: 0.875rem; color: #718096;">
                            ${postDate}
                        </span>
                        <span style="font-size: 0.75rem; color: #63b3ed; font-weight: 600; background: rgba(99, 179, 237, 0.1); padding: 0.25rem 0.75rem; border-radius: 4px;">
                            Post
                        </span>
                    </div>
                    
                    <h3 style="color: #2d3748; font-size: 1.125rem; font-weight: 600; margin-bottom: 0.75rem; line-height: 1.4;">
                        <a href="${post.link}" 
                           style="color: inherit; text-decoration: none;"
                           onmouseover="this.style.color='#63b3ed'"
                           onmouseout="this.style.color='#2d3748'">
                            ${post.title}
                        </a>
                    </h3>
                    
                    <p style="color: #718096; font-size: 0.9375rem; line-height: 1.6; margin-bottom: 1rem;">
                        ${excerpt}
                    </p>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
                        <a href="${post.link}" 
                           style="color: #63b3ed; font-weight: 600; text-decoration: none; font-size: 0.875rem; display: inline-flex; align-items: center; gap: 0.25rem;">
                            Read More 
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </article>
        `;
    }).join('');
    
    // Create filter summary
    const filterSummary = Object.entries(filters).map(([taxonomy, term]) => {
        const label = document.querySelector(`#select-${taxonomy} option[value="${term}"]`)?.textContent || term;
        return `<span style="padding: 0.25rem 0.75rem; background: rgba(99, 179, 237, 0.1); color: #63b3ed; border-radius: 4px; font-size: 0.875rem; margin-right: 0.5rem; margin-bottom: 0.5rem; display: inline-block;">${taxonomy}: ${label}</span>`;
    }).join('');
    
    // Update results
    resultsContent.innerHTML = `
        <div style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
            <!-- Results Header -->
            <div style="background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05); margin-bottom: 2rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                    <div>
                        <h2 style="color: #2d3748; margin-bottom: 0.5rem; font-size: 1.5rem;">Filter Results</h2>
                        <p style="color: #718096; margin-bottom: 1rem;">
                            Found ${posts.length} post${posts.length !== 1 ? 's' : ''} matching your criteria
                        </p>
                        <div style="margin-top: 0.5rem;">
                            ${filterSummary}
                        </div>
                    </div>
                    <button onclick="window.resetFilters && window.resetFilters()" 
                            style="padding: 0.75rem 1.5rem; background: transparent; color: #63b3ed; border: 2px solid #63b3ed; border-radius: 6px; cursor: pointer; font-weight: 600; white-space: nowrap;">
                        Clear Filters
                    </button>
                </div>
            </div>
            
            <!-- Posts Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem;">
                ${postsGrid}
            </div>
            
            <!-- Load More Button (if needed) -->
            ${posts.length >= 12 ? `
                <div style="text-align: center; margin-top: 3rem;">
                    <button onclick="window.loadMorePosts && window.loadMorePosts()" 
                            style="padding: 0.875rem 2rem; background: #63b3ed; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 1rem;">
                        Load More Posts
                    </button>
                </div>
            ` : ''}
        </div>
    `;
    
    // Add hover effects
    addPostHoverEffects();
}

// Fallback content
function showFallbackContent(filters, error) {
    const resultsContent = document.getElementById('results-content');
    
    resultsContent.innerHTML = `
        <div style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
            <div style="background: white; border-radius: 12px; padding: 2.5rem; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);">
                <div style="text-align: center; padding: 3rem;">
                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                            <line x1="12" y1="9" x2="12" y1="13"></line>
                            <line x1="12" y1="17" x2="12" y2="17"></line>
                        </svg>
                    </div>
                    <h3 style="color: #718096; margin-bottom: 1rem; font-size: 1.5rem;">Unable to load posts</h3>
                    <p style="color: #a0aec0; max-width: 600px; margin: 0 auto 1.5rem;">
                        There was an error fetching posts from WordPress. Please try again later.
                    </p>
                    <div style="color: #f56565; background: rgba(245, 101, 101, 0.1); padding: 1rem; border-radius: 6px; margin-bottom: 1.5rem; text-align: left; max-width: 600px; margin-left: auto; margin-right: auto;">
                        <code style="font-size: 0.875rem;">Error: ${error}</code>
                    </div>
                    <button onclick="location.reload()" 
                            style="padding: 0.75rem 1.5rem; background: #63b3ed; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; margin-right: 0.5rem;">
                        Refresh Page
                    </button>
                    <button onclick="window.resetFilters && window.resetFilters()" 
                            style="padding: 0.75rem 1.5rem; background: transparent; color: #63b3ed; border: 2px solid #63b3ed; border-radius: 6px; cursor: pointer; font-weight: 600;">
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Global helper functions
window.resetFilters = function() {
    const resetButton = document.getElementById('reset-button');
    if (resetButton) {
        resetButton.click();
    }
};

window.loadMorePosts = function() {
    alert('Load more functionality would be implemented here');
};

export { createTaxonomyFilter, displayWordPressPosts, showFallbackContent }