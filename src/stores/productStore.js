import { defineStore } from 'pinia'

export const  productStore = defineStore('product', {
    state: () => ({ 
     
        //like data in optional object
        products:[],
        wishlist:[],
        
         }),
     //like computed properties in optional object    
    getters: {
     



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
              console.log('✅ Product added to wishlist:', data);
            } catch (error) {
              console.error('❌ Failed to add product to wishlist:', error);
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
              console.log('✅ Product removed from wishlist:', data);
          
            } catch (error) {
              console.error('❌ Failed to remove product from wishlist:', error);
            }
          }
          


    }            

})
