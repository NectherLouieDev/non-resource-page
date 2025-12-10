// Add CSS styles dynamically
function addStyles() {
  const styleElement = document.createElement("style");
  styleElement.textContent = `
        /* ========== BASE RESET & TYPOGRAPHY ========== */
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600&family=Roboto+Condensed:wght@400;500&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            color: #FEFFB7;
            line-height: 1.6;
            background-color: #1D1518;
            font-weight: 400;
        }

        h1, h2, h3, h4, h5, h6 {
            font-family: 'Aileron', 'Roboto Condensed', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
            font-weight: bold;
            letter-spacing: 0.5px;
        }

        /* Aileron fallback styles */
        @font-face {
            font-family: 'Aileron';
            src: local('Arial Black'), local('Helvetica Neue Bold'), local('Segoe UI Bold');
            font-weight: bold;
        }

        /* ========== MAIN CONTAINER & LAYOUT ========== */
        #test1742 {
            width: 100%;
            min-height: 100vh;
        }

        .site-content {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
        }

        /* ========== HEADER & TITLE SECTION ========== */
        .taxonomy-filter__header {
            background-color: #1D1518;
            padding: 4rem 1rem;
            margin-bottom: 2rem;
            border-bottom: 1px solid #333;
        }

        .section__heading {
            font-size: 2.8rem;
            font-weight: bold;
            margin-bottom: 1rem;
            color: #FEFFB7;
            text-align: center;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }

        .text-center {
            text-align: center;
        }

        .text-white {
            color: #FEFFB7 !important;
        }

        .section__heading--white {
            color: #FEFFB7;
        }

        /* ========== FILTER CONTAINER ========== */
        .filter-block {
            background: #1D1518;
            padding: 2.5rem;
            margin: 0 auto 3rem;
            max-width: 1000px;
            border: 1px solid #333;
        }

        .filter-block__title {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            color: #FEFFB7;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-family: 'Roboto Condensed', 'Open Sans', sans-serif;
        }

        /* ========== FILTER ROW & COLUMNS ========== */
        .row {
            display: flex;
            flex-wrap: wrap;
            margin: 0 -1rem;
        }

        .justify-content-xl-center {
            justify-content: center;
        }

        .col-12 {
            flex: 0 0 100%;
            max-width: 100%;
            padding: 0 1rem;
        }

        .filter-item {
            margin-bottom: 1.5rem;
        }

        .filter-item--selected .filter-item__title {
            color: #FEFFB7;
        }

        .filter-item--selected .filter-item__select {
            border-color: #FEFFB7;
            background-color: rgba(254, 255, 183, 0.05);
        }

        .filter-item__title {
            font-size: 0.85rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #FEFFB7;
            font-family: 'Roboto Condensed', 'Open Sans', sans-serif;
            opacity: 0.9;
        }

        /* ========== SELECT DROPDOWNS ========== */
        .select-wrap {
            position: relative;
        }

        .filter-item__select {
            width: 100%;
            padding: 1rem 1.25rem;
            font-size: 1rem;
            border: 1px solid #333;
            background-color: #1D1518;
            color: #FEFFB7;
            cursor: pointer;
            appearance: none;
            transition: all 0.2s ease;
            font-family: 'Open Sans', sans-serif;
            font-weight: 500;
        }

        .filter-item__select:hover {
            border-color: #555;
            background-color: #251e21;
        }

        .filter-item__select:focus {
            outline: none;
            border-color: #FEFFB7;
            background-color: #251e21;
        }

        .filter-item__select option {
            background-color: #1D1518;
            color: #FEFFB7;
            padding: 0.5rem;
        }

        /* ========== BUTTONS ========== */
        .filter-block__reset, 
        .filter-block__search {
            display: inline-block;
            padding: 1rem 2.5rem;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border: 1px solid transparent;
            font-family: 'Roboto Condensed', 'Open Sans', sans-serif;
        }

        .filter-block__reset {
            background-color: transparent;
            color: #FEFFB7;
            border-color: #FEFFB7;
        }

        .filter-block__reset:hover {
            background-color: rgba(254, 255, 183, 0.1);
            border-color: #FEFFB7;
        }

        .filter-block__search {
            background-color: #FEFFB7;
            color: #1D1518;
            border: 1px solid #FEFFB7;
        }

        .filter-block__search:hover:not(:disabled) {
            background-color: #FEFFB7;
            color: #1D1518;
            opacity: 0.9;
        }

        .filter-block__search:disabled {
            opacity: 0.3;
            cursor: not-allowed;
            background-color: #555;
            color: #999;
            border-color: #555;
        }

        .filter-block__reset:active, 
        .filter-block__search:active:not(:disabled) {
            transform: translateY(1px);
        }

        /* ========== CONTROL BUTTONS ROW ========== */
        .control-buttons-row {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 2.5rem;
            flex-wrap: wrap;
        }

        /* ========== RESULTS SECTION ========== */
        .taxonomy-filter__results {
            background-color: #1D1518;
            min-height: 500px;
            padding: 2rem 0;
        }

        .results-content {
            background: #1D1518;
            padding: 2rem;
            margin-top: 2rem;
            border: 1px solid #333;
        }

        /* ========== LOADING & ANIMATIONS ========== */
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }

        /* ========== RESPONSIVE DESIGN ========== */
        @media (min-width: 768px) {
            .col-md-6 {
                flex: 0 0 50%;
                max-width: 50%;
            }
            
            .filter-block {
                padding: 3rem;
            }
        }

        @media (min-width: 992px) {
            .col-lg-3 {
                flex: 0 0 25%;
                max-width: 25%;
            }
            
            .section__heading {
                font-size: 3.2rem;
            }
        }

        @media (min-width: 1200px) {
            .col-xl-10 {
                flex: 0 0 83.333333%;
                max-width: 83.333333%;
            }
        }

        @media (max-width: 768px) {
            .taxonomy-filter__header {
                padding: 3rem 1rem;
            }
            
            .section__heading {
                font-size: 2.2rem;
            }
            
            .filter-block {
                padding: 1.5rem;
                margin: 0 1rem 2rem;
            }
            
            .filter-block__reset, 
            .filter-block__search {
                padding: 0.9rem 1.8rem;
                font-size: 0.9rem;
                width: 100%;
            }
            
            .control-buttons-row {
                flex-direction: column;
                gap: 0.75rem;
            }
        }

        /* ========== UTILITY CLASSES ========== */
        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }

        .header-wrap {
            position: relative;
        }

        /* ========== CUSTOM SCROLLBAR ========== */
        .filter-item__select::-webkit-scrollbar {
            width: 8px;
        }
        
        .filter-item__select::-webkit-scrollbar-track {
            background: #1D1518;
        }
        
        .filter-item__select::-webkit-scrollbar-thumb {
            background: #333;
        }
        
        .filter-item__select::-webkit-scrollbar-thumb:hover {
            background: #444;
        }

        /* ========== TOAST NOTIFICATIONS ========== */
        .toast-notification {
            animation: fadeIn 0.3s ease;
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background-color: #1D1518;
            color: #FEFFB7;
            border: 1px solid #333;
            z-index: 1000;
            max-width: 400px;
            font-weight: 500;
            font-family: 'Roboto Condensed', 'Open Sans', sans-serif;
        }

        .toast-info {
            border-left: 4px solid #FEFFB7;
        }

        .toast-success {
            border-left: 4px solid #FEFFB7;
        }

        .toast-error {
            border-left: 4px solid #FEFFB7;
        }

        /* ========== POST CARD STYLING ========== */
        .post-card {
            background: #1D1518;
            overflow: hidden;
            transition: all 0.3s ease;
            height: 100%;
            border: 1px solid #333;
        }

        .post-card:hover {
            border-color: #FEFFB7;
            background-color: #251e21;
        }

        .post-card img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            transition: transform 0.3s ease;
        }

        .post-card:hover img {
            transform: scale(1.02);
        }

        .post-card-content {
            padding: 1.5rem;
        }

        .post-date {
            font-size: 0.875rem;
            color: #FEFFB7;
            margin-bottom: 0.75rem;
            display: block;
            opacity: 0.8;
            font-family: 'Roboto Condensed', 'Open Sans', sans-serif;
        }

        .post-title {
            font-size: 1.3rem;
            font-weight: bold;
            color: #FEFFB7;
            margin-bottom: 0.75rem;
            line-height: 1.4;
            font-family: 'Aileron', 'Roboto Condensed', 'Open Sans', sans-serif;
        }

        .post-excerpt {
            color: #FEFFB7;
            font-size: 0.95rem;
            line-height: 1.6;
            margin-bottom: 1rem;
            opacity: 0.9;
        }

        .post-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: 1rem;
        }

        .post-tag {
            background: rgba(254, 255, 183, 0.1);
            color: #FEFFB7;
            padding: 0.25rem 0.75rem;
            font-size: 0.8rem;
            font-weight: 500;
            border: 1px solid rgba(254, 255, 183, 0.2);
            font-family: 'Roboto Condensed', 'Open Sans', sans-serif;
        }

        /* ========== NO RESULTS STATE ========== */
        .no-results {
            text-align: center;
            padding: 4rem 2rem;
            color: #FEFFB7;
        }

        .no-results-icon {
            width: 80px;
            height: 80px;
            background: rgba(254, 255, 183, 0.1);
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
            border: 1px solid rgba(254, 255, 183, 0.2);
        }

        .no-results h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: #FEFFB7;
            font-family: 'Aileron', 'Roboto Condensed', 'Open Sans', sans-serif;
        }

        /* ========== FILTER PREVIEW ========== */
        #filter-preview {
            margin-top: 1.5rem;
            padding: 1rem;
            background: rgba(254, 255, 183, 0.05);
            border: 1px solid rgba(254, 255, 183, 0.1);
        }

        /* ========== LOADING SPINNER ========== */
        .loading-spinner {
            display: inline-block;
            width: 60px;
            height: 60px;
            border: 4px solid rgba(254, 255, 183, 0.1);
            border-top: 4px solid #FEFFB7;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 1.5rem;
        }

        /* ========== GRID LAYOUT ========== */
        .posts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }

        /* ========== CLEAR ALL BUTTON ========== */
        .clear-filters-btn {
            padding: 0.75rem 1.5rem;
            background: transparent;
            color: #FEFFB7;
            border: 1px solid #FEFFB7;
            cursor: pointer;
            font-weight: 600;
            font-family: 'Roboto Condensed', 'Open Sans', sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            transition: all 0.2s ease;
        }

        .clear-filters-btn:hover {
            background: rgba(254, 255, 183, 0.1);
        }
    `;
  document.head.appendChild(styleElement);
}

// Add hover effects
function addPostHoverEffects() {
  setTimeout(() => {
    const postCards = document.querySelectorAll(".post-card");
    postCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-4px)";
        this.style.boxShadow = "0 12px 20px rgba(0, 0, 0, 0.1)";
        const img = this.querySelector("img");
        if (img) img.style.transform = "scale(1.05)";
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
        this.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.05)";
        const img = this.querySelector("img");
        if (img) img.style.transform = "scale(1)";
      });
    });
  }, 100);
}

// helper functions for loading/error states
function showFilterLoadingState() {
  const container = document.querySelector("#test1742");
  if (!container) {
    const newContainer = document.createElement("div");
    newContainer.id = "test1742";
    document.body.appendChild(newContainer);
  }

  const loadingHTML = `
        <div class="filter-loading" style="
            text-align: center; 
            padding: 3rem; 
            color: #718096;
        ">
            <div style="
                width: 60px; 
                height: 60px; 
                border: 4px solid #f3f3f3; 
                border-top: 4px solid #63b3ed; 
                border-radius: 50%; 
                animation: spin 1s linear infinite; 
                margin: 0 auto 1.5rem;
            "></div>
            <h3 style="margin-bottom: 1rem;">Loading filter options...</h3>
            <p>Fetching taxonomy data from WordPress.</p>
        </div>
    `;

  document.getElementById("test1742").innerHTML = loadingHTML;
}

function hideFilterLoadingState() {
  const loadingEl = document.querySelector(".filter-loading");
  if (loadingEl) {
    loadingEl.remove();
  }
}

function showFilterErrorState(error) {
  const container = document.getElementById("test1742");
  if (!container) return;

  const errorHTML = `
        <div class="filter-error" style="
            text-align: center; 
            padding: 3rem; 
            color: #f56565;
            border: 2px solid rgba(245, 101, 101, 0.2);
            border-radius: 8px;
            background: rgba(245, 101, 101, 0.05);
        ">
            <div style="
                width: 60px; 
                height: 60px; 
                background: #f56565; 
                border-radius: 50%; 
                display: inline-flex; 
                align-items: center; 
                justify-content: center; 
                margin-bottom: 1.5rem;
            ">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12" y2="16"></line>
                </svg>
            </div>
            <h3 style="margin-bottom: 1rem;">Failed to load filter</h3>
            <p style="margin-bottom: 1.5rem;">Could not load taxonomy data from WordPress.</p>
            <button onclick="location.reload()" style="
                padding: 0.75rem 1.5rem; 
                background: #63b3ed; 
                color: white; 
                border: none; 
                border-radius: 6px; 
                cursor: pointer; 
                font-weight: 600;
            ">
                Retry
            </button>
        </div>
    `;

  container.innerHTML = errorHTML;
}

export { addStyles, addPostHoverEffects, showFilterLoadingState, showFilterErrorState, hideFilterLoadingState };
