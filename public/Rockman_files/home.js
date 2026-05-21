$(document).ready(function () {
  $(".hero-carousel").on(
    "init afterChange",
    function (event, slick, currentSlide) {
      // Reset all hero animations
      $(".hero-carousel .aos-hero").removeClass("aos-animate");

      // Get active slide index
      const index = currentSlide !== undefined ? currentSlide : 0;

      // Animate active slide only
      $(slick.$slides[index]).find(".aos-hero").addClass("aos-animate");
    },
  );

  // Hero slider
  $(".hero-carousel").slick({
    dots: true,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 3000,
    fade: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  });
  // Hero slider end

  // discover slider
  $(".discover-carousel").slick({
    dots: true,
    arrows: true,
    autoplay: false,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
  // discover slider end
  // Product slider
  $(".product-slider").slick({
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    infinite: false,
    // focusOnSelect: true,
    // variableWidth: true,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          // variableWidth: true,
        },
      },
    ],
  });

  // Brand slider
  $(".brand-slider").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    infinite: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          autoplay: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplay: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: false,
        },
      },
    ],
  });

  // Initial filter (first product)
  let firstProduct = $(".product-item.active").data("product");
  filterBrands(firstProduct);

  // On product click
  $(".product-slider").on("click", ".product-item", function () {
    let product = $(this).data("product");

    $(".product-item").removeClass("active");
    $(this).addClass("active");

    filterBrands(product);
  });

  function filterBrands(product) {
    $(".brand-slider").slick("slickUnfilter");
    $(".brand-slider").slick("slickFilter", function () {
      return $(this).data("product") === product;
    });
  }
  // Product slider end

  // Stories
  const $slider = $(".stories-slider");

  // Stop all videos (on slide change)
  function resetVideos() {
    $slider.find("video").each(function () {
      this.pause();
      this.currentTime = 0;
      $(this).closest(".video-wrap").removeClass("playing");
    });
  }

  // Slick events
  $slider.on("beforeChange", function () {
    resetVideos();
  });

  // Play button click (ONLY center slide)
  $slider.on(
    "click",
    ".slick-center .video-play-btn, .slick-active .video-play-btn",
    function () {
      const $wrap = $(this).closest(".video-wrap");
      const video = $wrap.find("video").get(0);
      const isPlaying = $wrap.hasClass("playing");

      // Stop all other videos first
      resetVideos();

      if (!isPlaying) {
        video.muted = false;
        video.play();
        $wrap.addClass("playing");
      } else {
        video.pause();
        $wrap.removeClass("playing");
      }

      // Safety: remove class when paused or ended
      video.onpause = () => $wrap.removeClass("playing");
      video.onended = () => {
        video.currentTime = 0;
        $wrap.removeClass("playing");
      };
    },
  );

  // Init slick
  $slider.slick({
    centerMode: true,
    centerPadding: "0",
    slidesToShow: 5,
    variableWidth: false,
    speed: 1000,
    cssEase: "ease",
    waitForAnimate: true,
    useTransform: true,
    arrows: true,
    dots: false,
    draggable: false,
    swipe: false,
    touchMove: false,
    infinite: true,

    autoplay: true,          // enable autoplay
    autoplaySpeed: 3000,     // time in ms (3 seconds)

    focusOnSelect: false,
    prevArrow: $(".story-prev"),
    nextArrow: $(".story-next"),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          variableWidth: false,
          // autoplay: false,
        },
      },
    ],
  });

  // Stories end

  // Blog Slider
  $(window).on("load resize", function () {
    if ($(window).width() < 992) {
      if (!$(".blog-carousel").hasClass("slick-initialized")) {
        $(".blog-carousel").slick({
          dots: true,
          arrows: false,
          autoplay: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        });
        AOS.refresh();
      }
    } else {
      if ($(".blog-carousel").hasClass("slick-initialized")) {
        $(".blog-carousel").slick("unslick");
      }
    }
  });

  // Blog Slider end

  /* ---------- AOS INIT (AFTER SLICK) ---------- */

  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
  });

  // VERY IMPORTANT
  AOS.refresh();
});

// $(document).ready(function () {
//   const video = document.getElementById("innovationVideo");
//   const btn = document.getElementById("playPauseBtn");

//   btn.addEventListener("click", () => {
//     if (video.paused) {
//       video.play();
//       btn.classList.add("hidden");
//     } else {
//       video.pause();
//     }
//   });

//   video.addEventListener("pause", () => {
//     btn.classList.remove("hidden");
//   });
// });


// <!-- news infinte slide -->

$(document).ready(function () {
  const BREAKPOINT = 991;

  const track = document.querySelector(".news-track");
  const list = document.querySelector(".news--list");

  let marqueeTween = null;
  let clone = null;
  let desktopInitialized = false;
  let resizeTimer = null;

  /* --- DESKTOP: GSAP MARQUEE --- */
  function initDesktopMarquee() {
    if (desktopInitialized) return;

    // Clone list for seamless loop
    clone = list.cloneNode(true);
    track.appendChild(clone);

    const images = track.querySelectorAll("img");
    const total = images.length;
    let loaded = 0;

    // ✅ Fix 1: If no images exist, start immediately
    if (total === 0) {
      startMarquee();
      return;
    }

    // ✅ Fix 5: Count both loaded and errored images
    const onLoad = () => {
      loaded++;
      if (loaded === total) startMarquee();
    };

    images.forEach((img) => {
      if (img.complete) {
        onLoad();
      } else {
        img.onload = onLoad;
        img.onerror = onLoad;
      }
    });

    function startMarquee() {
      const listWidth = list.offsetWidth;

      if (!listWidth) {
        console.warn("news-track: listWidth is 0, marquee aborted");
        return;
      }

      const speed = 120; // px per second — increase to go faster

      marqueeTween = gsap.to(track, {
        x: `-=${listWidth}`,
        duration: listWidth / speed,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % listWidth),
        },
      });

      track.addEventListener("mouseenter", pauseMarquee);
      track.addEventListener("mouseleave", playMarquee);
    }

    desktopInitialized = true;
  }

  function destroyDesktopMarquee() {
    if (!desktopInitialized) return;

    if (marqueeTween) {
      marqueeTween.kill();
      marqueeTween = null;
    }

    // ✅ Fix 3: Use gsap.set() instead of style.transform to avoid GSAP desync
    gsap.set(track, { x: 0 });

    if (clone) {
      clone.remove();
      clone = null;
    }

    track.removeEventListener("mouseenter", pauseMarquee);
    track.removeEventListener("mouseleave", playMarquee);

    desktopInitialized = false;
  }

  function pauseMarquee() {
    if (marqueeTween) marqueeTween.pause();
  }

  function playMarquee() {
    if (marqueeTween) marqueeTween.resume();
  }

  /* --- MOBILE: SLICK SLIDER --- */
  function initMobileSlick() {
    if (!$(".news--list").hasClass("slick-initialized")) {
      $(".news--list").slick({
        arrows: true,
        dots: false,
        autoplay: false,
        autoplaySpeed: 3000,
        adaptiveHeight: true,
        draggable: false,
        swipe: true,
        touchMove: true,
        prevArrow: $(".news-prev"),
        nextArrow: $(".news-next"),
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });
    }
  }

  function destroyMobileSlick() {
    if ($(".news--list").hasClass("slick-initialized")) {
      $(".news--list").slick("unslick");
    }
  }

  /* --- RESPONSIVE SWITCH --- */
  // ✅ Fix 4: Debounced resize to prevent rapid init/destroy conflicts
  function checkMode() {
    if (window.innerWidth > BREAKPOINT) {
      destroyMobileSlick();
      initDesktopMarquee();
    } else {
      destroyDesktopMarquee();
      initMobileSlick();
    }
  }

  checkMode();

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(checkMode, 200);
  });
});
