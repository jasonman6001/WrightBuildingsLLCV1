document.addEventListener('DOMContentLoaded', function() {
  var carouselContainer = document.querySelector('.carousel-container');
  var carouselItems = document.querySelectorAll('.carousel-item');
  var currentPosition = 0;
  var totalItems = carouselItems.length;
  var prevButton = document.querySelector('.prev-button');
  var nextButton = document.querySelector('.next-button');
  var indicatorsContainer = document.querySelector('.page-indicators');
  var isDragging = false;
  var startX = 0;
  var deltaX = 0;
  var slideInterval = 6000; // Time between automatic slides in milliseconds
  var slideTimer;

  // Function to slide to the next item
  function slideNext() {
    currentPosition++;
    if (currentPosition >= totalItems) {
      currentPosition = 0;
    }
    updateCarousel();
  }

  // Function to slide to the previous item
  function slidePrev() {
    currentPosition--;
    if (currentPosition < 0) {
      currentPosition = totalItems - 1;
    }
    updateCarousel();
  }

  // Function to update the carousel container position and indicators
  function updateCarousel() {
    carouselContainer.style.transform = 'translateX(' + (currentPosition * -100) + '%)';
    updateIndicators();
  }

  // Function to create indicators and add event listeners
  function createIndicators() {
    for (var i = 0; i < totalItems; i++) {
      var indicator = document.createElement('div');
      indicator.classList.add('indicator');
      indicator.dataset.index = i;
      indicatorsContainer.appendChild(indicator);
    }
    indicatorsContainer.addEventListener('click', handleIndicatorClick);
  }

  // Function to handle indicator click event
  function handleIndicatorClick(event) {
    var target = event.target;
    if (target.classList.contains('indicator')) {
      var index = parseInt(target.dataset.index);
      currentPosition = index;
      updateCarousel();
    }
  }

  // Function to update the active indicator
  function updateIndicators() {
    var indicators = indicatorsContainer.querySelectorAll('.indicator');
    indicators.forEach(function(indicator, index) {
      if (index === currentPosition) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }

  // Event listener for previous button
  prevButton.addEventListener('click', slidePrev);

  // Event listener for next button
  nextButton.addEventListener('click', slideNext);

  // Event listeners for touch events
  carouselContainer.addEventListener('touchstart', handleTouchStart);
  carouselContainer.addEventListener('touchmove', handleTouchMove);
  carouselContainer.addEventListener('touchend', handleTouchEnd);

  // Event listeners for mouse events
  carouselContainer.addEventListener('mousedown', handleMouseDown);
  carouselContainer.addEventListener('mousemove', handleMouseMove);
  carouselContainer.addEventListener('mouseup', handleMouseUp);
  carouselContainer.addEventListener('mouseleave', handleMouseUp);

  // Function to handle touch start event
  function handleTouchStart(event) {
    startX = event.touches[0].clientX;
    isDragging = true;
  }

  // Function to handle touch move event
  function handleTouchMove(event) {
    if (!isDragging) {
      return;
    }

    deltaX = event.touches[0].clientX - startX;
  }

  // Function to handle touch end event
  function handleTouchEnd() {
    if (!isDragging) {
      return;
    }

    if (deltaX < -50) {
      slideNext();
    } else if (deltaX > 50) {
      slidePrev();
    }

    startX = 0;
    deltaX = 0;
    isDragging = false;
  }

  // Function to handle mouse down event
  function handleMouseDown(event) {
    startX = event.clientX;
    isDragging = true;
    carouselContainer.style.cursor = 'grabbing';
  }

  // Function to handle mouse move event
  function handleMouseMove(event) {
    if (!isDragging) {
      return;
    }

    deltaX = event.clientX - startX;
  }

  // Function to handle mouse up event
  function handleMouseUp() {
    if (!isDragging) {
      return;
    }

    if (deltaX < -50) {
      slideNext();
    } else if (deltaX > 50) {
      slidePrev();
    }

    startX = 0;
    deltaX = 0;
    isDragging = false;
    carouselContainer.style.cursor = 'grab';
  }

  // Prevent image drag behavior
  carouselItems.forEach(function(item) {
    item.addEventListener('dragstart', function(e) {
      e.preventDefault();
    });
  });

  // Initialize carousel
  createIndicators();
  updateCarousel();

  // Start automatic sliding
  function startSlideInterval() {
    slideTimer = setInterval(slideNext, slideInterval);
  }

  // Stop automatic sliding
  function stopSlideInterval() {
    clearInterval(slideTimer);
  }

  // Start slide interval on DOM content load
  startSlideInterval();

  // Pause slide interval on mouseenter event
  carouselContainer.addEventListener('mouseenter', stopSlideInterval);

  // Resume slide interval on mouseleave event
  carouselContainer.addEventListener('mouseleave', startSlideInterval);
});
