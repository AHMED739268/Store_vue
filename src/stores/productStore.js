import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify';

export const  productStore = defineStore('product', {
    state: () => ({ 
     
        //like data in optional object
        products:[],
        wishlist:[],
        showEmptyWishlistMessage : false,
        cart: [],
        totalPrice: 0
         }),
     //like computed properties in optional object    
    getters: {
      totalCartPrice(state) {
        return state.cart.reduce((total, item) => {
          return total + item.productid.price * item.quantity;
        }, 0);
      }



    },
    //like methods in optional object
    actions:   {
      
        async fetchProducts() {
            try {
              const response = await fetch('http://localhost:3000/allproduct');
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const productts = await response.json();
              this.products =productts.data;
            } catch (error) {
              console.error('❌ Failed to fetch products:', error);
            }
          },

          async fetchProductById(id) {
            try {
              const response = await fetch(`http://localhost:3000/products/${id}`);
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const product = await response.json();
              return product.data;
            } catch (error) {
              console.error('❌ Failed to fetch product:', error);
            }
          },

          async addProductToWishlist(productId) {
            try {
              const token = localStorage.getItem('token');
              const body = JSON.stringify({
                wishlist: [productId]
              });
          
              const response = await fetch('http://localhost:3000/addtowishlist', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'token':token
                },
                body: body
              });
          
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
          
              const data = await response.json();
              await this.getallproductinwishlist();
              toast.success('✔️ Product added to wishlist!');
              console.log('✅ Product added to wishlist:', data);
            } catch (error) {
              console.error('❌ Failed to add product to wishlist:', error);
              toast.warn(" Product is already in your wishlist!");
            }
          },

          async getallproductinwishlist() {
            try {
              const token = localStorage.getItem('token');
              const response = await fetch('http://localhost:3000/allwishlist', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'token': token
                }
              });
          
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
          
              const data = await response.json();
              this.wishlist = data.wishlist;


              if (this.wishlist.length === 0) {
                this.showEmptyWishlistMessage = true;  
              } else {
                this.showEmptyWishlistMessage = false;
              }
            } catch (error) {
              console.error('❌ Failed to fetch wishlist:', error);
            }

          },
          async deleteProductFromWishlist(productId) {
            try {
              const token = localStorage.getItem('token');
              console.log('🔐 Token:', token);
          
              const response = await fetch(`http://localhost:3000/deletefromwishlist/${productId}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'token': token
                }
              });
          
              console.log('🔍 Response status:', response.status, response.statusText);
          
              if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
              }
          
              const data = await response.json();
              await this.getallproductinwishlist();

              if (this.wishlist.length === 0) {
                this.showEmptyWishlistMessage = true;  
              } else {
                this.showEmptyWishlistMessage = false;
              }
              console.log('✅ Product removed from wishlist:', data);
          
            } catch (error) {
              console.error('❌ Failed to remove product from wishlist:', error);
            }
          },









          async fetchCart() {
            try {
              const token = localStorage.getItem('token');
              const response = await fetch('http://localhost:3000/getusercart', {
                headers: {
                  'token': token
                }
              });
              const data = await response.json();
              if (Array.isArray(data)) {
                this.cart = data[0]?.products || [];
              } else {
                this.cart = [];
              }
            } catch (error) {
              console.error('❌ Error fetching cart:', error);
            }
          },



          async addToCart(productid, quantity = 1) {
            try {
              const token = localStorage.getItem('token');
              const response = await fetch('http://localhost:3000/addtocart', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  token: token
                },
                body: JSON.stringify({
                  products: [{ productid, quantity }]
                })
              });
              const data = await response.json();
              toast.success('✔️ Product added to cart!');
              await this.fetchCart();
            } catch (error) {
              console.error('❌ Error adding to cart:', error);
              toast.error('⚠️ Already in cart!');
            }
          },
          async deleteFromCart(productid) {
            try {
              const token = localStorage.getItem('token');
              const response = await fetch(`http://localhost:3000/deletefromcart/${productid}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  token: token
                }
              });
              const data = await response.json();
              toast.success('🗑️ Product removed from cart');
              await this.fetchCart();
            } catch (error) {
              console.error('❌ Error deleting from cart:', error);
            }
          },
      
          increaseQuantity(productid) {
            const item = this.cart.find(item => item.productid._id === productid);
            if (item) {
              item.quantity++;
            }
          },
      
          decreaseQuantity(productid) {
            const item = this.cart.find(item => item.productid._id === productid);
            if (item && item.quantity > 1) {
              item.quantity--;
            }
          },
      
          getSubtotal(productid) {
            const item = this.cart.find(item => item.productid._id === productid);
            return item ? item.productid.price * item.quantity : 0;
          }

          


    }            

})
