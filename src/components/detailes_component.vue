<template>
    <div>
        <HeaderComponent />
        <div v-if="product" class="product">
    <div class="product-details-container">
      <div class="product-card-modern">
        <div class="product-image">
          <img :src="product.featuredImage" :alt="product.name" />
        </div>
        <div class="product-info">
          <h2 class="animate-title">{{ product.name }}</h2>
          <p class="price"> $ {{ product.price }}</p>
          <p class="description">{{ product.description }}</p>
          <p class="stock-status">
            <span v-if="product.stock > 0" class="in-stock">✔ In Stock</span>
            <span v-else class="out-of-stock">✖ Out of Stock</span>
          </p>
          <p class="rating">⭐ {{ product.avgRating }}/5</p>
          <button class="add-to-cart">🛒 Add to Cart</button>
        </div>
      </div>
    </div>
  </div>

    
            
      <FooterComponent />

    </div>
    
</template>

<script setup>
  import HeaderComponent from './header_component.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
  import FooterComponent from './footer_component.vue'
import { productStore } from '../stores/productStore.js'

  const route = useRoute()
const product = ref(null)
const store = productStore()

onMounted(async () => {
  
  product.value = await store.fetchProductById(route.params.id)
})
</script>

<style>
.product {

    margin-top: 100px;
  padding: 40px 20px;
  background: linear-gradient(to right, #f9f9f9, #f1f3f6);
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.product-details-container {
  display: flex;
  justify-content: center;
}

.product-card-modern {
  display: flex;
  flex-direction: row;
  gap: 30px;
  background: #fff;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  max-width: 1000px;
  width: 100%;
}

.product-card-modern:hover {
  transform: translateY(-5px);
}

.product-image img {
  width: 350px;
  border-radius: 15px;
  object-fit: cover;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.product-image img:hover {
  transform: scale(1.05);
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.animate-title {
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
  animation: fadeIn 0.7s ease-in-out;
}

.meta span {
  font-weight: 600;
  color: #555;
}

.meta {
  margin: 6px 0;
  color: #666;
}

.price {
  font-size: 24px;
  color: #2b8a3e;
  font-weight: 700;
  margin: 10px 0;
}

.description {
  margin: 10px 0;
  color: #444;
  line-height: 1.6;
}

.stock-status {
  margin: 10px 0;
}

.in-stock {
  color: green;
  font-weight: bold;
}

.out-of-stock {
  color: red;
  font-weight: bold;
}

.rating {
  font-size: 16px;
  margin-bottom: 20px;
  color: #ffa500;
}

.add-to-cart {
  align-self: start;
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 200, 255, 0.3);
}

.add-to-cart:hover {
  background: linear-gradient(135deg, #00f2fe, #4facfe);
  transform: scale(1.05);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .product-card-modern {
    flex-direction: column;
    align-items: center;
  }

  .product-image img {
    width: 100%;
    max-width: 100%;
  }

  .product-info {
    padding-top: 20px;
    align-items: center;
    text-align: center;
  }

  .add-to-cart {
    width: 100%;
  }
}


</style>