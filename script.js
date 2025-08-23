document.addEventListener('DOMContentLoaded', () => {
    let categories = ["electronics", "apparel", "home", "books"];
    const productGrid = document.getElementById('product-grid');
    const cartCount = document.getElementById('cart-count');
    const cartToggle = document.getElementById('cart-toggle');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav .nav-link');


    let products = [
        {
            id: 1,
            name: "Wireless Bluetooth Headphones",
            category: "electronics",
            price: 79.99,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNhzvzKJxLjowcveny5ehUQq-mTXPpIg_8PA&s",
            description: "Experience premium sound quality with these comfortable, noise-cancelling headphones."
        },
        {
            id: 2,
            name: "Vintage Leather Backpack",
            category: "apparel",
            price: 120.00,
            image: "https://images.jdmagicbox.com/quickquotes/images_main/genuine-leather-vintage-handmade-casual-college-day-pack-cross-body-messenger-backpack-2020049161-ls9bux9p.jpg",
            description: "Stylish and durable, perfect for daily commute or weekend adventures."
        },
        {
            id: 3,
            name: "Smart Home Security Camera",
            category: "electronics",
            price: 99.50,
            image: "https://www.safewise.com/app/uploads/2024/07/Best-Wireless-Cameras-2024_Featured-Image.png",
            description: "Keep your home safe with 1080p video, night vision, and motion detection."
        },
        {
            id: 4,
            name: "Ergonomic Office Chair",
            category: "home",
            price: 249.99,
            image: "https://m.media-amazon.com/images/I/81qhB9v7ueL._UF894,1000_QL80_.jpg",
            description: "Designed for comfort and support during long working hours."
        },
        {
            id: 5,
            name: "Classic Novel Collection",
            category: "books",
            price: 45.00,
            image: "https://beautifulbooks.info/wp-content/uploads/2020/08/BN-Old-Leatherbound-books.jpg",
            description: "A timeless collection of literary masterpieces for every reader."
        },
        {
            id: 6,
            name: "Stainless Steel Coffee Maker",
            category: "home",
            price: 65.75,
            image: "https://m.media-amazon.com/images/I/81CcncO-6wL.jpg",
            description: "Brew your perfect cup of coffee every morning with ease."
        },
        {
            id: 7,
            name: "Men's Casual T-Shirt",
            category: "apparel",
            price: 25.00,
            image: "https://rukminim2.flixcart.com/image/704/844/xif0q/t-shirt/y/5/p/s-hg-mt-09-11-12-supersquad-original-imagtzxpkaggdgnj.jpeg?q=90&crop=false",
            description: "Soft cotton, modern fit, ideal for everyday wear."
        },
        {
            id: 8,
            name: "Portable Power Bank 20000mAh",
            category: "electronics",
            price: 35.99,
            image: "https://mobilla.in/cdn/shop/files/mpower725-black1.webp?v=1752826193",
            description: "Charge your devices on the go with this high-capacity power bank."
        },
        {
            id: 9,
            name: "Yoga Mat Eco-Friendly",
            category: "home",
            price: 30.00,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDpTJgrCocxzbT-huwPx6JnvMjDXBPYmxx4g&s",
            description: "Non-slip and made from sustainable materials for your daily practice."
        },
        {
            id: 10,
            name: "Bestseller Thriller Novel",
            category: "books",
            price: 18.99,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5ly3kNBksFMw5A6ON8xIk25GXUlEyp0s86Q&s",
            description: "A gripping story that will keep you on the edge of your seat."
        }
    ];

    let cart = [];
function updateCategoryFilter() {
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        categoryFilter.appendChild(option);
    });
}
    updateCategoryFilter();
    // --- Product Rendering ---
    const renderProducts = (filteredProducts) => {
        productGrid.innerHTML = ''; // Clear existing products
        if (filteredProducts.length === 0) {
            productGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; font-size: 1.2rem; color: var(--text-light);">No products found matching your criteria.</p>';
            return;
        }

        filteredProducts.forEach(product => {
            const productCard = document.createElement('article');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="category">${product.category}</p>
                    <p class="price">$${product.price.toFixed(2)}</p>
                    <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}">
                        Add to Cart <i class="fas fa-cart-plus"></i>
                    </button>
                </div>
            `;
            productGrid.appendChild(productCard);
        });
        addAddToCartListeners();
    };

    // --- Cart Functionality ---
    const updateCartCount = () => {
        cartCount.textContent = cart.length;
        checkoutBtn.disabled = cart.length === 0;
    };

    const calculateCartTotal = () => {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotalPrice.textContent = `$${total.toFixed(2)}`;
    };

    const renderCartItems = () => {
        cartItemsContainer.innerHTML = ''; // Clear existing cart items
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.dataset.id = item.id;
                cartItemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>Category: ${item.category}</p>
                    </div>
                    <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                    <button class="remove-item-btn" data-id="${item.id}" aria-label="Remove item from cart">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
            });
            addRemoveFromCartListeners();
        }
        calculateCartTotal();
    };

    const addToCart = (productId) => {
        const productToAdd = products.find(p => p.id === parseInt(productId));
        if (productToAdd) {
            // For simplicity, we just add the item. For multiple quantities,
            // we'd check if it exists and increment quantity.
            cart.push(productToAdd);
            updateCartCount();
            renderCartItems();
            openCart(); // Open cart automatically when item is added
        }
    };

    const removeFromCart = (productId) => {
        const index = cart.findIndex(item => item.id === parseInt(productId));
        if (index > -1) {
            cart.splice(index, 1);
            updateCartCount();
            renderCartItems();
        }
    };

    const addAddToCartListeners = () => {
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.onclick = (e) => addToCart(e.currentTarget.dataset.id);
        });
    };

    const addRemoveFromCartListeners = () => {
        document.querySelectorAll('.remove-item-btn').forEach(button => {
            button.onclick = (e) => removeFromCart(e.currentTarget.dataset.id);
        });
    };

    const openCart = () => {
        cartSidebar.classList.add('open');
        cartOverlay.style.display = 'block';
    };

    const closeCart = () => {
        cartSidebar.classList.remove('open');
        cartOverlay.style.display = 'none';
    };

    // --- Event Listeners ---
    cartToggle.addEventListener('click', (e) => {
        e.preventDefault();
        cartSidebar.classList.contains('open') ? closeCart() : openCart();
    });

    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    // --- Filtering and Searching ---
    const applyFilters = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        const filtered = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                                  product.description.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
        renderProducts(filtered);
    };

    searchInput.addEventListener('input', applyFilters);
    categoryFilter.addEventListener('change', applyFilters);

    // --- Mobile Menu Toggle ---
    mobileMenuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('open');
        mobileMenuToggle.querySelector('i').classList.toggle('fa-bars');
        mobileMenuToggle.querySelector('i').classList.toggle('fa-times');
    });

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('open')) {
                mainNav.classList.remove('open');
                mobileMenuToggle.querySelector('i').classList.remove('fa-times');
                mobileMenuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // --- Initial Load ---
    renderProducts(products); // Display all products initially
    updateCartCount();
    renderCartItems(); // Initialize cart display
    // Handle Sell Form Submission
const sellForm = document.getElementById('sell-form');
sellForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('product-name').value.trim();
    let category = document.getElementById('product-category').value;
    const customCategory = document.getElementById('custom-category').value.trim();
    const price = parseFloat(document.getElementById('product-price').value);
    const image = document.getElementById('product-image').value.trim();
    const description = document.getElementById('product-description').value.trim();

    if (!name || (!category && !customCategory) || isNaN(price) || !image || !description) {
        alert("Please fill in all fields correctly. Select or add a category.");
        return;
    }

    // If custom category provided, use it and add to categories list
    if (customCategory) {
        category = customCategory.toLowerCase();
        if (!categories.includes(category)) {
            categories.push(category);
            updateCategoryFilter();
        }
    }

    const newProduct = {
        id: products.length + 1,
        name,
        category,
        price,
        image,
        description
    };

    products.push(newProduct);
    renderProducts(products); // Re-render all products including the new one
    sellForm.reset();
    alert("Product added successfully!");
});


});

