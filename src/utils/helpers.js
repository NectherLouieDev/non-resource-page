
// Add CSS styles dynamically
function addStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Reset and Base Styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            background-color: #1a1a2e;
            color: #333;
            line-height: 1.6;
        }

        /* Main Container */
        #test1742 {
            width: 100%;
            min-height: 100vh;
        }

        /* Site Content */
        .site-content {
            width: 100%;
        }

        /* Section Padding */
        .section__padding {
            padding: 4rem 0;
        }

        /* Header Section */
        .taxonomy-filter__header {
            background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
        }

        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }

        .header-wrap {
            position: relative;
        }

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

        /* Title */
        .section__heading {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: #ffffff;
        }

        .section__heading--white {
            color: #ffffff;
        }

        .text-center {
            text-align: center;
        }

        .text-white {
            color: #ffffff !important;
        }

        /* Filter Block */
        .filter-block {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 2rem;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .filter-block__title {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            opacity: 0.9;
        }

        /* Filter Items */
        .filter-item {
            margin-bottom: 1.5rem;
        }

        .filter-item--selected .filter-item__title {
            color: #63b3ed;
        }

        .filter-item--selected .filter-item__select {
            border-color: #63b3ed;
        }

        .filter-item__title {
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #a0aec0;
        }

        /* Select Wrapper */
        .select-wrap {
            position: relative;
        }

        .filter-item__select {
            width: 100%;
            padding: 0.875rem 1rem;
            font-size: 1rem;
            border: 2px solid #4a5568;
            border-radius: 8px;
            background-color: #2d3748;
            color: #ffffff;
            cursor: pointer;
            appearance: none;
            transition: all 0.3s ease;
        }

        .filter-item__select:focus {
            outline: none;
            border-color: #63b3ed;
            box-shadow: 0 0 0 3px rgba(99, 179, 237, 0.1);
        }

        .filter-item__select option {
            background-color: #2d3748;
            color: #ffffff;
        }

        /* Column System */
        @media (min-width: 768px) {
            .col-md-6 {
                flex: 0 0 50%;
                max-width: 50%;
            }
        }

        @media (min-width: 992px) {
            .col-lg-3 {
                flex: 0 0 25%;
                max-width: 25%;
            }
        }

        @media (min-width: 1200px) {
            .col-xl-10 {
                flex: 0 0 83.333333%;
                max-width: 83.333333%;
            }
        }

        /* Control Buttons */
        .filter-block__reset, .filter-block__search {
            display: inline-block;
            padding: 0.875rem 2rem;
            border-radius: 6px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border: 2px solid transparent;
        }

        .filter-block__reset {
            background-color: transparent;
            color: #63b3ed;
            border-color: #63b3ed;
        }

        .filter-block__reset:hover {
            background-color: rgba(99, 179, 237, 0.1);
        }

        .filter-block__search {
            background: #48bb78;
            color: white;
            border-color: #48bb78;
        }

        .filter-block__search:hover:not(:disabled) {
            background: #38a169;
            border-color: #38a169;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(72, 187, 120, 0.2);
        }

        .filter-block__search:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .filter-block__reset:active, .filter-block__search:active:not(:disabled) {
            transform: translateY(1px);
        }

        /* Results Section */
        .taxonomy-filter__results {
            background-color: #f7fafc;
            min-height: 400px;
        }

        /* Loading Animation */
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
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

        /* Responsive Adjustments */
        @media (max-width: 768px) {
            .section__padding {
                padding: 2rem 0;
            }
            
            .section__heading {
                font-size: 2rem;
            }
            
            .filter-block {
                padding: 1.5rem;
            }
            
            .filter-block__reset, .filter-block__search {
                padding: 0.75rem 1.5rem;
                font-size: 0.9rem;
            }
        }

        @media (max-width: 576px) {
            .col-md-6 {
                flex: 0 0 100%;
                max-width: 100%;
            }
        }

        /* Additional Dynamic Styles */
        .results-content {
            transition: all 0.3s ease;
        }
        
        select:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        .filter-item__select:hover:not(:disabled) {
            border-color: #718096;
        }
        
        /* Custom scrollbar for select dropdowns */
        .filter-item__select::-webkit-scrollbar {
            width: 8px;
        }
        
        .filter-item__select::-webkit-scrollbar-track {
            background: #2d3748;
            border-radius: 4px;
        }
        
        .filter-item__select::-webkit-scrollbar-thumb {
            background: #4a5568;
            border-radius: 4px;
        }
        
        .filter-item__select::-webkit-scrollbar-thumb:hover {
            background: #718096;
        }
    `;
    document.head.appendChild(styleElement);
}

function addPostHoverEffects() {
    setTimeout(() => {
        const postCards = document.querySelectorAll('.post-card');
        postCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px)';
                this.style.boxShadow = '0 12px 20px rgba(0, 0, 0, 0.1)';
                const img = this.querySelector('img');
                if (img) img.style.transform = 'scale(1.05)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                const img = this.querySelector('img');
                if (img) img.style.transform = 'scale(1)';
            });
        });
    }, 100);
}

export { addStyles, addPostHoverEffects }