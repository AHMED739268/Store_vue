<template>
    <footer class="footer text-light pt-5 pb-3">
      <div class="container">
        <div class="row text-center text-md-start">
         
          <div class="col-md-4 mb-4">
            <h5 class="footer-title"><i class="bi bi-info-circle-fill me-2"></i>About Us</h5>
            <p class="footer-text">
                ElRo3B_Store is your ultimate destination for smart, stylish, and effortless shopping.

Discover a new level of online shopping with ElRo3B_Store – fast, secure, and full of surprises.

Where quality meets convenience — welcome to ElRo3B_Store!
            </p>
          </div>
  

          <div class="col-md-4 mb-4">
            <h5 class="footer-title"><i class="bi bi-link-45deg me-2"></i>Quick Links</h5>
            <ul class="list-unstyled footer-links">
              <li><a href="#"><i class="bi bi-house-door me-1"></i>Home</a></li>
              <li><a href="#"><i class="bi bi-info-circle me-1"></i>About</a></li>
              <li><a href="#"><i class="bi bi-cart3 me-1"></i>Cart</a></li>
              <li><a href="#"><i class="bi bi-envelope me-1"></i>Contact</a></li>
            </ul>
          </div>
  
          <div class="col-md-4 mb-4">
            <h5 class="footer-title"><i class="bi bi-telephone-fill me-2"></i>Contact Us</h5>
            <p><i class="bi bi-envelope me-2"></i>support@elro3b.com</p>
            <p><i class="bi bi-phone me-2"></i>+20 114 567 5595</p>
          </div>
        </div>
      </div>
  
      <div class="text-center mt-4 footer-bottom">
        <small>&copy; 2025 ElRo3B_Store. All Rights Reserved.</small>
      </div>
    </footer>
  </template>
  
  <script setup>
  // No logic needed
  </script>
  
  <style scoped>
  .footer {
    background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
    background-size: 300% 300%;
    animation: footerGradient 12s ease infinite;
    color: #f8f9fa;
  }
  
  @keyframes footerGradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .footer-title {
    font-weight: 700;
    color: #ffc107;
    margin-bottom: 1rem;
  }
  
  .footer-text {
    font-size: 0.95rem;
    line-height: 1.6;
  }
  
  .footer-links li {
    margin-bottom: 0.5rem;
  }
  
  .footer-links a {
    color: #ddd;
    text-decoration: none;
    transition: all 0.3s ease;
  }
  
  .footer-links a:hover {
    color: #ffc107;
    transform: translateX(4px);
  }
  
  .footer-bottom {
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.85rem;
    background-color: rgba(0, 0, 0, 0.1);
  }
  </style>
  