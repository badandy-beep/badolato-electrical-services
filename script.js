/* © 2025 Badolato Electrical Services | www.badolatoelectrical.com */
/* Version 2.0 - Multi-Page Site Script */

document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // ROTATING TAGLINES (Homepage Only)
  // ========================================
  const taglineRotator = document.querySelector('.tagline-rotator');
  
  if (taglineRotator) {
    const taglines = taglineRotator.querySelectorAll('.tagline-item');
    let currentIndex = 0;
    
    function rotateTaglines() {
      // Remove active from all
      taglines.forEach(item => item.classList.remove('active'));
      
      // Add active to current
      taglines[currentIndex].classList.add('active');
      
      // Increment index
      currentIndex = (currentIndex + 1) % taglines.length;
    }
    
    // Initial display
    rotateTaglines();
    
    // Rotate every 4 seconds
    setInterval(rotateTaglines, 4000);
  }
  
  // ========================================
  // ACTIVE NAV STATE
  // ========================================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Industry nav
  const industryLinks = document.querySelectorAll('.nav-industries a');
  industryLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
  
  // Utility nav
  const utilityLinks = document.querySelectorAll('.nav-utility a');
  utilityLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
  
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
        target.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    });
  });
  
  // ========================================
  // FORM HANDLING (Placeholder - Connect Backend Later)
  // ========================================
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());
      
      // Log for debugging
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
          Your request has been received. We'll contact you shortly.
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
  const fileInputs = document.querySelectorAll('input[type="file"]');
  
  fileInputs.forEach(input => {
    input.addEventListener('change', function() {
      const uploadText = this.closest('.file-upload').querySelector('.file-upload-text');
      
      if (this.files && this.files.length > 0 && uploadText) {
        const fileCount = this.files.length;
        const fileNames = Array.from(this.files).map(f => f.name).join(', ');
        
        uploadText.innerHTML = `
          <span style="font-size: 2rem;">✓</span>
          <span><strong>${fileCount} file${fileCount > 1 ? 's' : ''} selected</strong></span>
          <small style="word-break: break-all; max-width: 100%;">${fileNames}</small>
        `;
        uploadText.style.borderColor = '#2E7D32';
        uploadText.style.background = '#E8F5E9';
        uploadText.style.color = '#2E7D32';
      }
    });
  });
  
  // ========================================
  // SCROLL ANIMATIONS (Cards)
  // ========================================
  const animateElements = document.querySelectorAll(
    '.service-card, .industry-service-item'
  );
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -30px 0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = entry.target.parentElement.children;
        const siblingIndex = Array.from(siblings).indexOf(entry.target);
        const delay = siblingIndex * 80;
        
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, delay);
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(el);
  });
  
  // ========================================
  // CONSOLE BRANDING
  // ========================================
  console.log('%c⚡ Badolato Electrical Services', 'color: #003366; font-size: 18px; font-weight: bold;');
  console.log('%c"The present is theirs; the future is mine." — Nikola Tesla', 'color: #7B1FA2; font-style: italic;');
  
});
