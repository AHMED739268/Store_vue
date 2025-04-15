<template>
  <div>
    <HeaderComponent />

    <div class="container my-5">
      <h2 class="text-white mb-4">My Wishlist</h2>

      <div v-if="store.wishlist.length === 0" class="empty-wishlist-message text-center">
        <div class="icon-wrapper mb-3">
          <i class="bi bi-heartbreak-fill display-4 text-danger"></i>
        </div>
        <h2 class="text-white">Your wishlist is empty</h2>
        <p class="text-secondary">Looks like you haven’t added anything yet. Start adding your favorite products!</p>
      </div>

     
      <div v-else class="wishlist-container">
        <div class="row g-4">
          <div
            class="col-md-4"
            v-for="(product, index) in store.wishlist"
            :key="product._id"
            :class="['wishlist-item', 'fade-in-up']"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="card wishlist-card h-100 shadow-lg">
              <img :src="product.featuredImage" class="card-img-top product-img" alt="Product Image" />
              <div class="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 class="card-title" @click="goToDetails(product._id)">
                    {{ product.name }}
                  </h5>
                  <p class="card-text text-light mb-1">
                    Price: <strong>${{ product.price }}</strong>
                  </p>
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
                      style="color: #ffc107;"
                    ></span>
                    <small class="text-warning ms-2">({{ product.reviewCount }} reviews)</small>
                  </div>
                </div>

                <div class="d-flex justify-content-around align-items-center mt-4">
                  <button class="btn btn-icon btn-delete" @click.stop="removeFromWishlist(product._id)">
                    <i class="fas fa-trash-alt"></i>
                  </button>

                  <button class="btn btn-icon btn-cart" @click.stop="addToCart(product)">
                    <i class="fas fa-shopping-cart"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Confirmation -->
        <div v-if="showConfirmDialog" class="confirm-backdrop">
          <div class="confirm-modal">
            <p>Are you sure you want to remove this product from your wishlist?</p>
            <div class="d-flex justify-content-end gap-2 mt-3">
              <button class="btn btn-secondary" @click="cancelRemove">Cancel</button>
              <button class="btn btn-danger" @click="confirmRemove">Yes, Remove</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <FooterComponent />
  </div>
</template>

<script setup>
import { toast } from 'vue3-toastify'
import FooterComponent from './footer_component.vue'
import HeaderComponent from './header_component.vue'
import { productStore } from '../stores/productStore.js'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

const store = productStore()
const router = useRouter()

const showConfirmDialog = ref(false)
const productToDelete = ref(null)

onMounted(() => {
  store.getallproductinwishlist()
})

function goToDetails(productId) {
  router.push(`/product/${productId}`)
}

function removeFromWishlist(productId) {
  productToDelete.value = productId
  showConfirmDialog.value = true
}

async function confirmRemove() {
  if (!productToDelete.value) return

  await store.deleteProductFromWishlist(productToDelete.value)

  store.wishlist = store.wishlist.filter(
    (product) => product._id !== productToDelete.value
  )

  toast.success('✅ Product removed from wishlist successfully')

  showConfirmDialog.value = false
  productToDelete.value = null
}

function cancelRemove() {
  showConfirmDialog.value = false
  productToDelete.value = null
}

function addToCart(product) {
  toast.info('🛒 Added to cart (placeholder action)')
}
</script>

<style>

.empty-wishlist-message {
  padding: 60px 20px;
  border-radius: 20px;
  background: linear-gradient(135deg, #093a63, #085f51);
  color: #fff;
  margin-bottom: 40px;
}

.icon-wrapper {
  font-size: 3rem;
}


.fade-in-up {
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


.wishlist-container {
  background: linear-gradient(13deg, #3b797e, #2a2a3d);
  border-radius: 20px;
  padding: 30px;
}

.wishlist-card {
  border: none;
  border-radius: 20px;
  background: linear-gradient(135deg, #093a63, #085f51);
  color: #ffffff;
  transition: all 0.3s ease;
  cursor: pointer;
}

.wishlist-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 30px rgba(230, 224, 226, 0.952);
}

.card-title {
  font-weight: bold;
  font-size: 1.1rem;
}

.product-img {
 
  padding-left: 70px;
   padding-top: 30px;
    height: 200px;
    width: 250px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.rating {
  font-size: 1.1rem;
  margin-top: 0.3rem;
  display: flex;
  align-items: center;
}


.btn-icon {
  border: none;
  padding: 10px 14px;
  border-radius: 50%;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.btn-cart {
  background-color: #cf9f1a;
  color: white;
}

.btn-delete {
  background-color: #6c757d;
  color: rgb(255, 255, 255);
}

.btn-delete:hover {
  background-color: #b91c1c;
}

.btn-icon:hover {
  transform: scale(1.1);
}


.confirm-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.confirm-modal {
  background: white;
  color: #000;
  border-radius: 12px;
  padding: 20px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}
</style>
