document.addEventListener("DOMContentLoaded", () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    
    if (themeToggleButton) {
      themeToggleButton.style.display = 'inline-block'; // Show button when JS is enabled
    }
  
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.setAttribute('data-theme', savedTheme);
      themeToggleButton.textContent = savedTheme === 'dark' ? '🌞' : '🌙';
    }
  
    // Add event listener to toggle themes
    themeToggleButton.addEventListener('click', () => {
      let currentTheme = document.body.getAttribute('data-theme');
      let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      // Apply new theme and save to localStorage
      document.body.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
  
      // Update button icon
      themeToggleButton.textContent = newTheme === 'dark' ? '🌞' : '🌙';
    });
  });
  