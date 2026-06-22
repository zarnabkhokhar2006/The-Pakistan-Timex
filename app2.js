// API key for News API (Note: You'll need to get your own API key from newsapi.org)
        // For demonstration, we'll use a placeholder and mock data
        const API_KEY = 'a220d7153f2b4c57a4e5b4b273cb49ea';
        let currentCategory = 'GET https://newsapi.org/v2/top-headlines?q=trump&apiKey=a220d7153f2b4c57a4e5b4b273cb49ea';
      

        // Background images
        const backgrounds = [
            'background2.jpg',
            'background3.jpg',
            'background4.jpg'
        ];

        // Function to change background
        function changeBackground(index) {
            document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${backgrounds[index]}')`;
        }

        // Mock data for demonstration (since we can't use real API without key)
        const mockNewsData = {
            articles: [
                {
                    title: "New Breakthrough in Renewable Energy",
                    description: "Scientists have developed a new solar panel technology that increases efficiency by 40%.",
                    urlToImage: "new1.jpg",
                    publishedAt: "2026-06-15T10:00:00Z",
                    source: { name: "Science Daily" },
                    category: "science"
                },
                {
                    title: "Stock Market Reaches All-Time High",
                    description: "The Dow Jones Industrial Average closed at a record high amid positive economic indicators.",
                    urlToImage: "psx.jpg",
                    publishedAt: "2026-06-14T15:30:00Z",
                    source: { name: "Financial Times" },
                    category: "business"
                },
                {
                    title: "Tech Industry is Rapidly gaining the makrket trend",
                    description: "Pakistan's Exports in IT industry are monitored record high...",
                    urlToImage: "IT.png",
                    publishedAt: "2026-06-14T12:00:00Z",
                    source: { name: "The New-York Times" },
                    category: "technology"
                },
                {
                    title: "Pakistan Continued it's legacy in exporting Footbal for FIFA Football World cup 2026...",
                    description: "The football world cup is scheduled this year in US, Mexico & Canada.",
                    urlToImage: "football.jfif",
                    publishedAt: "2026-05-20T20:45:00Z",
                    source: { name: "Top Headlines" },
                    category: "Global News"
                },
                {
                    title: "New Film Zombeid is creating it's great hype in Lollywood...",
                    description: "Will it gonna be breaking all records in Pakistan's film industry?",
                    urlToImage: "zombeid.jfif",
                    publishedAt: "2026-06-19T09:15:00Z",
                    source: { name: "Entertainment Weekly" },
                    category: "entertainment"
                },
                {
                    title: "Breakthrough in Cancer Research",
                    description: "Researchers have discovered a new approach to treatment that shows promising results.",
                    urlToImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&w=400",
                    
                    publishedAt: "2023-07-12T14:20:00Z",
                    source: { name: "Health Journal" },
                    category: "health"
                }
            ]
        };

        // Function to format date
        function formatDate(dateString) {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        }

        // Function to fetch news (using mock data for demonstration)
        async function fetchNews(category = 'general', page = 1) {
            isLoading = true;
            
         
            document.getElementById('news-container').innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading news...</div>';
            
            
            
           
            setTimeout(() => {
              
                let articles = mockNewsData.articles;
                if (category !== 'general') {
                    articles = mockNewsData.articles.filter(article => article.category === category);
                }
                
                displayNews(articles);
                isLoading = false;
            }, 1000);
        }

        // Function to display news
        function displayNews(articles) {
            const newsContainer = document.getElementById('news-container');
            
            if (articles.length === 0) {
                newsContainer.innerHTML = '<div class="error">No news articles found.</div>';
                return;
            }
            
            newsContainer.innerHTML = '';
            
            articles.forEach(article => {
                const newsCard = document.createElement('div');
                newsCard.classList.add('news-card');
                
                newsCard.innerHTML = `
                    <img src="${article.urlToImage}" alt="${article.title}" class="news-image">
                    <div class="news-content">
                        <span class="news-category">${article.category}</span>
                        <h3 class="news-title">${article.title}</h3>
                        <p class="news-description">${article.description}</p>
                        <div class="news-footer">
                            <span>${article.source.name}</span>
                            <span>${formatDate(article.publishedAt)}</span>
                        </div>
                    </div>
                `;
                
                newsContainer.appendChild(newsCard);
            });
        }

        // Function to handle category filter
        function handleCategoryFilter() {
            const filterButtons = document.querySelectorAll('.filter-btn');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    button.classList.add('active');
                    
                    // Get category from data attribute
                    currentCategory = button.getAttribute('data-category');
                    currentPage = 1;
                    
                    // Fetch news for selected category
                    fetchNews(currentCategory, currentPage);
                });
            });
        }

        // Function to handle search
        function handleSearch() {
            const searchButton = document.getElementById('search-btn');
            const searchInput = document.getElementById('search-input');
            
            searchButton.addEventListener('click', () => {
                const query = searchInput.value.trim();
                
                if (query) {
                    // In a real implementation, you would search using the API
                    alert(`In a real implementation, this would search for: ${query}`);
                    // For demonstration, we'll just filter our mock data
                    const filteredArticles = mockNewsData.articles.filter(article => 
                        article.title.toLowerCase().includes(query.toLowerCase()) ||
                        article.description.toLowerCase().includes(query.toLowerCase())
                    );
                    
                    displayNews(filteredArticles);
                }
            });
        }

        // Function to handle load more
        function handleLoadMore() {
            const loadMoreButton = document.getElementById('load-more');
            
            loadMoreButton.addEventListener('click', () => {
                if (isLoading) return;
                
                currentPage++;
                fetchNews(currentCategory, currentPage);
            });
        }

        // Function to handle background change
        function handleBackgroundChange() {
            const bgButtons = document.querySelectorAll('.bg-btn');
            
            bgButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const bgIndex = parseInt(button.getAttribute('data-bg')) - 1;
                    changeBackground(bgIndex);
                });
            });
        }

        // Initialize the app
        function init() {
            fetchNews();
            handleCategoryFilter();
            handleSearch();
            handleLoadMore();
            handleBackgroundChange();
        }

        // Start the app when DOM is loaded
        document.addEventListener('DOMContentLoaded', init);