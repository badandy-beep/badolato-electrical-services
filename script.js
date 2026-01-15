/* © 2025 Badolato Electrical Services | www.badolatoelectrical.com */
/* Version 2.1 - Enhanced UX Script with Tagline Rotation */

document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // TAGLINE ROTATION (v2.1)
  // ========================================
  const taglines = document.querySelectorAll('.tagline-item');
  if (taglines.length > 0) {
    let currentTagline = 0;
    
    // Show first tagline immediately
    taglines[0].classList.add('active');
    
    // Rotate every 4 seconds
    setInterval(function() {
      taglines[currentTagline].classList.remove('active');
      currentTagline = (currentTagline + 1) % taglines.length;
      taglines[currentTagline].classList.add('active');
    }, 4000);
  }
  
  // ========================================
  // HEADER SCROLL STATE
  // ========================================
  const header = document.querySelector('.site-header');
  let lastScroll = 0;
  
  function updateHeader() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  }
  
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader(); // Check on load
  
  // ========================================
  // MOBILE MENU TOGGLE
  // ========================================
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mainNav = document.getElementById('main-nav');
  
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', function() {
      mainNav.classList.toggle('is-open');
      this.classList.toggle('is-active');
      
      // Toggle body scroll
      if (mainNav.classList.contains('is-open')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }
  
  // ========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        // Close mobile menu if open
        if (mainNav && mainNav.classList.contains('is-open')) {
          mainNav.classList.remove('is-open');
          mobileToggle.classList.remove('is-active');
          document.body.style.overflow = '';
        }
        
        target.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    });
  });
  
  // ========================================
  // SCROLL ANIMATIONS (Intersection Observer)
  // ========================================
  const animateElements = document.querySelectorAll(
    '.segment-card, .service-category, .testimonial, .resource-card, ' +
    '.timeline-item, .quote-card, .step, .safety-tip'
  );
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay based on element index within its container
        const siblings = entry.target.parentElement.children;
        const siblingIndex = Array.from(siblings).indexOf(entry.target);
        const delay = siblingIndex * 100;
        
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, delay);
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Set initial state and observe
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
  
  // ========================================
  // RESOURCE NAVIGATION
  // ========================================
  document.querySelectorAll('.resource-nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active from all
      document.querySelectorAll('.resource-nav-item').forEach(i => {
        i.classList.remove('active');
      });
      
      // Add active to clicked
      this.classList.add('active');
      
      // Scroll to target
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  
  // ========================================
  // FORM HANDLING (Placeholder - connect backend in Phase 2)
  // ========================================
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());
      
      // Log for debugging (remove in production)
      console.log('Form submitted:', data);
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'form-success';
      successMsg.innerHTML = `
        <div style="
          padding: 1.5rem;
          background: #E8F5E9;
          border: 1px solid #2E7D32;
          border-radius: 12px;
          color: #2E7D32;
          text-align: center;
          margin-top: 1rem;
        ">
          <strong>✓ Thank you!</strong><br>
          Your submission has been received. We'll contact you shortly.
        </div>
      `;
      
      // Replace form with success message
      this.style.display = 'none';
      this.parentNode.appendChild(successMsg);
      
      // Reset form in background
      this.reset();
    });
  });
  
  // ========================================
  // FILE UPLOAD PREVIEW
  // ========================================
  const fileInput = document.getElementById('ss-files');
  const fileUploadText = document.querySelector('.file-upload-text');
  
  if (fileInput && fileUploadText) {
    fileInput.addEventListener('change', function() {
      if (this.files && this.files.length > 0) {
        const fileCount = this.files.length;
        const fileNames = Array.from(this.files).map(f => f.name).join(', ');
        
        fileUploadText.innerHTML = `
          <span class="file-upload-icon">✓</span>
          <span><strong>${fileCount} file${fileCount > 1 ? 's' : ''} selected</strong></span>
          <small style="word-break: break-all;">${fileNames}</small>
        `;
        fileUploadText.style.borderColor = '#2E7D32';
        fileUploadText.style.background = '#E8F5E9';
        fileUploadText.style.color = '#2E7D32';
      }
    });
  }
  
  // ========================================
  // CONSOLE BRANDING
  // ========================================
  console.log('%c⚡ Badolato Electrical Services', 'color: #003366; font-size: 18px; font-weight: bold;');
  console.log('%c"The present is theirs; the future is mine." — Nikola Tesla', 'color: #7B1FA2; font-style: italic;');
  console.log('%c© 2025 Badolato Electrical Services | www.badolatoelectrical.com', 'color: #757575;');
  
});
