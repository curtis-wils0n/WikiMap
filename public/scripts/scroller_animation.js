$(document).ready(function() {
  //Show or hide button that scrolls to top of page based on web position
  let scrollToTop = $('#scrollToTop');
  //Initially hide the scroll button
  scrollToTop.hide();
  // Show scroll button and hide nav panel when not on top of page
  // Else, hide scroll button and show nav panel when on top of page
  $(window).scroll(() => {
    if (window.scrollY > 0) {
      scrollToTop.fadeIn();
    } else {
      scrollToTop.fadeOut();
    }
  });
  // Clicking on the scroll button brings you back to top of web page
  scrollToTop.click(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  });
});
