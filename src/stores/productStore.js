import { defineStore } from 'pinia'

export const  productStore = defineStore('product', {
    state: () => ({ 
     
        //like data in optional object
        products:[],
      
        
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
          }
          



    }            

})
