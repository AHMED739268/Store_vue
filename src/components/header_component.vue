<template>
  <nav class="navbar navbar-expand-lg custom-navbar shadow-sm">
    <div class="container">
      <router-link class="navbar-brand d-flex align-items-center" to="/">
        <img src="@/assets/logo.png" alt="Logo" class="logo me-2" />

       
        <span class="brand-text">ElRo3B_Store</span>
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto text-center">
          <li class="nav-item">
            <router-link class="nav-link" to="/"><i class="bi bi-house-door me-1"></i> Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about"><i class="bi bi-info-circle me-1"></i> About</router-link>
          </li>
        





          <router-link class="nav-link position-relative" to="/cart">
  <i class="bi bi-cart3 me-1"></i> Cart
  <span
    v-if="cartCount > 0"
    class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
  >
    {{ cartCount }}
  </span>
</router-link>












          <li class="nav-item">
  <router-link class="nav-link position-relative" to="/wishlist">
    <i class="bi bi-heart me-1"></i> Wishlist
    <span v-if="wishlistCount > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
      {{ wishlistCount }}
    </span>
  </router-link>
</li>

        </ul>
      </div>
    </div>
  </nav>
</template>

  
  <script setup>
   import { computed, onMounted } from 'vue';
    import { productStore } from '../stores/productStore.js'

 const store = productStore();
const wishlistCount = computed(() => store.wishlist.length);
const cartCount = computed(() => store.cart.length);

onMounted(() => {
  store.getallproductinwishlist();
  store.fetchCart();
});


  </script>

  <style scoped>



.logo {
  height: 60px;
  width: 60px;
  object-fit: contain;
}




  .custom-navbar {
    background: linear-gradient(135deg, #0f2027, #064146, #144555);
    animation: gradientMove 10s ease infinite;
    background-size: 300% 300%;
  }
  
  @keyframes gradientMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .navbar-brand {
    font-size: 1.8rem;
    font-weight: bold;
    color: #ffc107;
    transition: all 0.3s ease;
  }
  
  .navbar-brand:hover {
    color: #fff;
    transform: scale(1.05);
  }
  
  .nav-link {
    color: #f8f9fa !important;
    font-weight: 500;
    transition: all 0.3s ease;
  }
  
  .nav-link:hover {
    color: #ffc107 !important;
    transform: translateY(-2px);
  }
  
  .form-control {
    width: 180px;
    border-radius: 0.5rem;
  }
  
  .btn-outline-light {
    border-radius: 0.5rem;
    transition: 0.3s ease;
  }
  
  .btn-outline-light:hover {
    background-color: #ffc107;
    color: #000;
  }
  
  .brand-text {
    font-family: 'Poppins', sans-serif;
  }
  
  @media (max-width: 992px) {
    .navbar-nav {
      margin-top: 1rem;
    }
  }
  </style>
  