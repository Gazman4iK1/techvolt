// ===== PRODUCT DATABASE =====
const PRODUCTS = [
  { id: 1, name: "iPhone 16 Pro", category: "phones", catLabel: "Смартфони", icon: "📱", price: 49999, oldPrice: 54999, badge: "Хіт", rating: 5, reviews: 312 },
  { id: 2, name: "Samsung Galaxy S25", category: "phones", catLabel: "Смартфони", icon: "📱", price: 38999, oldPrice: null, badge: null, rating: 4, reviews: 187 },
  { id: 3, name: "MacBook Pro M4", category: "laptops", catLabel: "Ноутбуки", icon: "💻", price: 89999, oldPrice: 99999, badge: "Новинка", rating: 5, reviews: 98 },
  { id: 4, name: "Sony WH-1000XM6", category: "audio", catLabel: "Навушники", icon: "🎧", price: 12999, oldPrice: 17999, badge: "-27%", rating: 5, reviews: 445 },
  { id: 5, name: "iPad Pro M4", category: "tablets", catLabel: "Планшети", icon: "📟", price: 34999, oldPrice: null, badge: null, rating: 4, reviews: 210 },
  { id: 6, name: "Apple Watch Ultra 3", category: "smart", catLabel: "Смарт-годинники", icon: "⌚", price: 31999, oldPrice: 34999, badge: "Хіт", rating: 5, reviews: 156 },
  { id: 7, name: "AirPods Pro 3", category: "audio", catLabel: "Навушники", icon: "🎧", price: 8999, oldPrice: 10499, badge: "-14%", rating: 5, reviews: 589 },
  { id: 8, name: "Xiaomi 15 Ultra", category: "phones", catLabel: "Смартфони", icon: "📱", price: 29999, oldPrice: null, badge: "Новинка", rating: 4, reviews: 74 },
  { id: 9, name: "ASUS ROG Zephyrus G16", category: "laptops", catLabel: "Ноутбуки", icon: "💻", price: 72999, oldPrice: 79999, badge: "-9%", rating: 4, reviews: 132 },
  { id: 10, name: "Samsung Galaxy Tab S10", category: "tablets", catLabel: "Планшети", icon: "📟", price: 24999, oldPrice: 27999, badge: null, rating: 4, reviews: 88 },
  { id: 11, name: "Bose QuietComfort 45", category: "audio", catLabel: "Навушники", icon: "🎧", price: 10499, oldPrice: 13999, badge: "-25%", rating: 4, reviews: 267 },
  { id: 12, name: "Google Pixel 9 Pro", category: "phones", catLabel: "Смартфони", icon: "📱", price: 35999, oldPrice: null, badge: null, rating: 4, reviews: 143 },
  { id: 13, name: "Lenovo ThinkPad X1 Carbon", category: "laptops", catLabel: "Ноутбуки", icon: "💻", price: 67999, oldPrice: null, badge: null, rating: 5, reviews: 201 },
  { id: 14, name: "Galaxy Watch 7 Ultra", category: "smart", catLabel: "Смарт-годинники", icon: "⌚", price: 18999, oldPrice: 21999, badge: null, rating: 4, reviews: 95 },
  { id: 15, name: "OnePlus 13", category: "phones", catLabel: "Смартфони", icon: "📱", price: 26999, oldPrice: 29999, badge: "-10%", rating: 4, reviews: 112 },
  { id: 16, name: "MacBook Air M4", category: "laptops", catLabel: "Ноутбуки", icon: "💻", price: 56999, oldPrice: 59999, badge: "Хіт", rating: 5, reviews: 378 },
];

// Cart storage
function getCart() {
  try { return JSON.parse(localStorage.getItem('techvolt_cart') || '[]'); } catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem('techvolt_cart', JSON.stringify(cart));
  updateCartBadge();
}
function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('#cartBadge').forEach(el => el.textContent = total);
}
function addToCart(productId) {
  const cart = getCart();
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const existing = cart.find(i => i.id === productId);
  if (existing) existing.qty += 1;
  else cart.push({ id: productId, qty: 1 });
  saveCart(cart);
  showToast(`✅ ${product.name} додано до кошика`);
}

function showToast(msg) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

function renderStars(rating) {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

function formatPrice(price) {
  return price.toLocaleString('uk-UA') + ' ₴';
}
