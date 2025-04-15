<template>
    <div class="container my-5">
      <div class="row g-4">
        <div class="col-md-4" v-for="product in store.products" :key="product._id">
          <div class="card product-card h-100 shadow-sm"  style="cursor: pointer;">
            <img :src="product.featuredImage" class="img card-img-top" alt="Product Image" />
            <div class="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 class="card-title " @click="goToDetails(product._id)">{{ product.name }}</h5>
                <p class="card-text text-white">Price: <strong>${{ product.price }}</strong></p>
                <p class="card-text" :class="product.stock > 0 ? 'text-success' : 'text-danger'">
          {{ product.stock > 0 ? 'In Stock' : 'Out of Stock' }}
          </p>

                    <div class="rating">
                  <span
                v-for="star in 5"
                :key="star"
                class="fa"
                :class="{
                'fa-star': star <= Math.floor(product.avgRating),
                'fa-star-half-alt': star - 0.5 === product.avgRating,
                'fa-regular fa-star': star > product.avgRating
                }"
                style="color: gold;"
            ></span>
            <small class="text-warning ms-2">({{ product.reviewCount }} reviews)</small>
            </div>











              </div>
              <div class="d-flex justify-content-between mt-3">
                <button class="btn btn-outline-danger" @click="addToWishlist(product._id)">
                  <i class="fas fa-heart"></i>
                </button>
                <button class="btn btn-outline-warning" @click="addToCart(product)">
                  <i class="fas fa-shopping-cart"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import{productStore} from '../stores/productStore.js'
  import { useRouter } from 'vue-router'
  import { onMounted } from 'vue'
  const store = productStore();
  const router = useRouter();
  onMounted(() => {
  store.fetchProducts();
});
function goToDetails(productId) {
  router.push(`/product/${productId}`)
}

function  addToWishlist(productId) {
store.addProductToWishlist(productId)

}

function addToCart(product) {
  store.addToCart(product); 
  toast.success("✔️ Product added to cart!");
}




  </script>
  
  <style scoped>
  .product-card {
    border: none;
    border-radius: 16px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background: linear-gradient(135deg, #093a63, #085f51);
    color: #f8f9fa;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
  
  .card-title {
    font-weight: bold;
  }
  
  .btn i {
    font-size: 1.2rem;
  }
  .rating {
  font-size: 1.2rem;
  display: flex;
  align-items: center;
}
.img{
    padding-left: 70px;
   padding-top: 30px;
    height: 200px;
    width: 250px;
}

  </style>
  