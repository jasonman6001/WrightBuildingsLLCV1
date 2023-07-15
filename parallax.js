document.addEventListener('DOMContentLoaded', function() {
  var rellax = new Rellax('.parallax-layer', {
    center: true,
    wrapper: null, // Set the wrapper option to the parallax container
    round: true, // Enable rounding to prevent subpixel rendering
    vertical: true, // Enable vertical parallax scrolling
    horizontal: false, // Disable horizontal parallax scrolling
  });

  // Adjust the content container position on window resize
  window.addEventListener('resize', function() {
    rellax.refresh();
  });
});
