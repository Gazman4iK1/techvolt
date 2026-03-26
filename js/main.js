// ===== MAIN.JS =====

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  initNav();

  // Render featured products on homepage
  const featuredEl = document.getElementById('featuredProducts');
  if (featuredEl) {
    const featured = PRODUCTS.slice(0, 8);
    featuredEl.innerHTML = featured.map(renderProductCard).join('');
  }
});

// ===== NAV =====
function initNav() {
  const burger = document.getElementById('burger');
  const navLinks = document.querySelector('.nav__links');
  const searchToggle = document.getElementById('searchToggle');
  const searchBar = document.getElementById('searchBar');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }
  if (searchToggle && searchBar) {
    searchToggle.addEventListener('click', () => {
      searchBar.classList.toggle('open');
      if (searchBar.classList.contains('open')) {
        document.getElementById('searchInput')?.focus();
      }
    });
  }
}

function handleSearch() {
  const val = document.getElementById('searchInput')?.value.trim();
  if (val) {
    window.location.href = `pages/catalog.html?search=${encodeURIComponent(val)}`;
  }
}

// ===== PRODUCT CARD =====
function renderProductCard(product) {
  return `
    <div class="product-card fade-in">
      <div class="product-card__img">
        ${product.badge ? `<span class="product-card__badge">${product.badge}</span>` : ''}
        ${product.icon}
      </div>
      <div class="product-card__body">
        <div class="product-card__category">${product.catLabel}</div>
        <div class="product-card__name">${product.name}</div>
        <div class="product-card__rating">
          <span style="color:#ff2d78">${renderStars(product.rating)}</span>
          <span>${product.rating}.0</span>
          <span>(${product.reviews})</span>
        </div>
        <div class="product-card__footer">
          <div>
            ${product.oldPrice ? `<span class="product-card__old-price">${formatPrice(product.oldPrice)}</span>` : ''}
            <span class="product-card__price">${formatPrice(product.price)}</span>
          </div>
          <button class="btn-add" onclick="addToCart(${product.id})">В кошик</button>
        </div>
      </div>
    </div>
  `;
}
