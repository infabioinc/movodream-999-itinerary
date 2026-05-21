$(document).ready(function () {
  /* Show sidebar on scroll */
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 100) {
      $(".sticky--sidebar").addClass("active");
    } else {
      $(".sticky--sidebar").removeClass("active");
      $(".sticky--mega--menu").removeClass("active");
      $(".sticky--menu--item").removeClass("active");
    }
  });

  // Path Active menu
  var currentPath = window.location.pathname.split("/").pop();

  if (currentPath === "") {
    currentPath = "index.html"; // fallback for homepage
  }

  // Main Navbar Active
  $(".navbar-nav .nav-link").each(function () {
    var linkPath = $(this).attr("href");

    if (linkPath === currentPath) {
      $(".navbar-nav .nav-link").removeClass("active");
      $(this).addClass("active");

      // If inside dropdown
      if ($(this).closest(".dropdown-menu").length) {
        $(this).closest(".dropdown").find(".nav-link").addClass("active");
      }
    }
  });

  // Sticky Mega Menu Active
  $(".menusticky--items a").each(function () {
    var linkPath = $(this).attr("href");

    if (linkPath === currentPath) {
      $(".menusticky--items a").removeClass("active");
      $(this).addClass("active");
    }
  });
  // Path Active menu end

  /* Open mega menu */
  $(".sticky--menu--item").on("click", function () {
    const target = $(this).data("menu");
    const $targetMenu = $('.sticky--mega--menu[data-menu="' + target + '"]');
    const $thisItem = $(this);

    // If already open → close it
    if ($targetMenu.hasClass("active")) {
      $targetMenu.removeClass("active");
      $thisItem.removeClass("active");
    } else {
      // Close all menus
      $(".sticky--mega--menu").removeClass("active");
      $(".sticky--menu--item").removeClass("active");

      // Open selected menu
      $targetMenu.addClass("active");
      $thisItem.addClass("active");
    }
  });

  /* Close mega menu */
  $(".close--menu").on("click", function () {
    $(".sticky--mega--menu").removeClass("active");
    $(".sticky--menu--item").removeClass("active");
  });

  // Advance Search Toggle
  const toggleBtn = document.getElementById('searchToggleBtn');
  const searchBox = document.getElementById('advanceSearch');

  // Toggle on button click
  toggleBtn.addEventListener('click', function (e) {
    e.stopPropagation(); // prevent triggering document click
    searchBox.classList.toggle('active');
  });

  // Prevent closing when clicking inside
  searchBox.addEventListener('click', function (e) {
    e.stopPropagation();
  });

  // Close when clicking outside
  document.addEventListener('click', function () {
    searchBox.classList.remove('active');
  });

});

document.addEventListener("click", function (event) {
    const navbar = document.getElementById("mainMenu");
    const toggleBtn = document.querySelector(".navbar-toggler");

    if (
        navbar.classList.contains("show") &&
        !navbar.contains(event.target) &&
        !toggleBtn.contains(event.target)
    ) {
        $('#mainMenu').collapse('hide'); // jQuery way
    }
});