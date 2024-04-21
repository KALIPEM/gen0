$(document).ready(function(){
    // sidebar toggle
    $("#navbar-show-btn").click(() => $('.navbar-collapse').removeClass('translate-x-full'));
    $('#navbar-hide-btn').click(() => $('.navbar-collapse').addClass('translate-x-full'));

    // stop transitin on resize
    let resizeTimer;
    $(window).on('resize', () => {
        $(document.body).addClass('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            $(document.body).removeClass('resize-animation-stopper');
        }, 400);
    });

    // game slider
    $('.game-slider').slick({
        className: "center",
        arrows: true,
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 500,
        autoplay: true,
        dots: true,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    dots: false
                }
            }
        ]
    });

    // categorywise filtering
    let buttonGroup = $('.button-group button');
    let categoryItemsList = $('.category-item');
    let initialActiveCategory = $($(buttonGroup)[0]).data('filter');

    const setActiveButton = (categoryName) => {
        jQuery.each(buttonGroup, function(index, buttonItem){
            if($(buttonItem).data('filter') == categoryName){
                $(buttonItem).addClass('active-filter-button');
            } else {
                $(buttonItem).removeClass('active-filter-button');
            }
        })
    }

    const filterItems = (categoryName) => {
        jQuery.each(categoryItemsList, function(index, categoryItem){
            if($(categoryItem).hasClass(categoryName)){
                $(categoryItem).css('display', 'block');
            } else {
                $(categoryItem).css('display', 'none');
            }
        })
    }

    setActiveButton(initialActiveCategory);
    filterItems(initialActiveCategory);

    jQuery.each(buttonGroup, function(index, buttonItem){
        $(buttonItem).click(function(){
            let categoryName = $(buttonItem).data('filter');
            setActiveButton(categoryName);
            filterItems(categoryName);
        });
    })
});

let videoId;

if (window.innerWidth > 420) {
  videoId = 'hero-video';
} else {
  videoId = 'hero-video-mb';
}

const video = document.getElementById(videoId);
let loopCount = 0;
const maxLoopCount = 3; // Define the maximum number of loops

function loopVideo() {
  console.log('Starting new loop');
  const startTime = performance.now();

  video.currentTime = 0;
  video.play();

  video.addEventListener('timeupdate', function onTimeUpdate() {
    const elapsed = performance.now() - startTime;

    console.log('Elapsed time:', elapsed);

    if (elapsed >= 15000) {
      console.log('Reached 15 seconds, pausing');
      video.pause();
      video.removeEventListener('timeupdate', onTimeUpdate);

      loopCount++;
      if (loopCount < maxLoopCount) {
        console.log('Looping again...');
        loopVideo();
      } else {
        console.log('Maximum loop count reached, stopping loop');
      }
    }
  });
}

video.addEventListener('ended', () => {
  console.log('Video ended');
});

video.addEventListener('error', (err) => {
  console.error('Error!', err);
});

loopVideo();


// scroll up button js code

document.getElementById('scrollUpBtn').addEventListener('click', function() {
    scrollToTop(1000); // Adjust the duration as needed
});

function scrollToTop(duration) {
    var start = window.pageYOffset;
    var startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

    function scrollStep() {
        var now = 'now' in window.performance ? performance.now() : new Date().getTime();
        var timeElapsed = now - startTime;
        var easeInOutCubic = function (t) { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; };

        window.scrollTo(0, start - start * easeInOutCubic(timeElapsed / duration));

        if (timeElapsed < duration) {
            requestAnimationFrame(scrollStep);
        } else {
            window.scrollTo(0, 0);
        }
    }

    requestAnimationFrame(scrollStep);
}

// scroll button dissappear when the page is at the top:

window.addEventListener('scroll', function() {
    var scrollUpBtn = document.getElementById('scrollUpBtn');
    if (window.scrollY > window.innerHeight * 0.3) {
        scrollUpBtn.style.opacity = '1';
        scrollUpBtn.style.display = 'block';
        scrollUpBtn.style.pointerEvents = 'auto'; // Re-enable pointer events
    } else {
        scrollUpBtn.style.opacity = '0';
        scrollUpBtn.style.pointerEvents = 'none'; // Disable pointer events to prevent clicking while invisible
    }
});