<template>

    <div>

    <HeaderComponent />
  
    <div class="container my-5">
      <h2 class="text-center mb-4">🛒 Your Cart</h2>
  
      <div v-if="cart.length === 0" class="alert alert-info text-center">
        Cart is empty
      </div>
  
      <table v-else class="table table-bordered table-striped text-center align-middle">
        <thead class="table-dark">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item.productid._id">
            <td>
              <img :src="item.productid.featuredImage" class="img-fluid" style="width: 60px; height: 60px; object-fit: cover" />
            </td>
            <td>{{ item.productid.name }}</td>
            <td>{{ item.productid.price }} $</td>
            <td>
              <div class="d-flex justify-content-center align-items-center">
                <button class="btn btn-sm btn-outline-secondary me-2" @click="decreaseQuantity(item.productid._id)">-</button>
                <span>{{ item.quantity }}</span>
                <button class="btn btn-sm btn-outline-success ms-2" @click="increaseQuantity(item.productid._id)">+</button>
              </div>
            </td>
            <td>{{ (item.quantity * item.productid.price).toFixed(2) }} $</td>
            <td>
              <button class="btn btn-danger btn-sm" @click="removeFromCart(item.productid._id)">🗑️ Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div class="text-end fs-4 mt-3">
        Total: <strong>{{ totalPrice.toFixed(2) }} $</strong>
      </div>
    </div>
    <FooterComponent />
</div>
  
  
  </template>
  
  <script setup>
  import FooterComponent from './footer_component.vue'
  import HeaderComponent from './header_component.vue'
  import { onMounted, computed } from 'vue';
  import { productStore } from '@/stores/productStore.js';
  import { storeToRefs } from 'pinia';
  
  const cartStore = productStore();
     const { cart } = storeToRefs(cartStore);
  
  onMounted(() => {
    cartStore.fetchCart();
  });
  
  const removeFromCart = (id) => {
      cartStore.deleteFromCart(id);
  };
  
  const increaseQuantity = (id) => {
    cartStore.increaseQuantity(id);
  };
  
  const decreaseQuantity = (id) => {
    cartStore.decreaseQuantity(id);
  };
  
  const totalPrice = computed(() => {
    return cart.value.reduce((total, item) => {
      return total + item.quantity * item.productid.price;
    }, 0);
  });
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  </style>
  