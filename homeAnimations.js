//opacity 0.8
//opacity 1
//opacity 0.1
//opacity 1 + sky bg

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Observer);

const smoother = ScrollSmoother.create({
  smooth: 1,
  effects: true,
  smoothTouch: 0.1,
});

let masterTimeline = gsap.timeline({});
let introTimeline = gsap.timeline({});
let leavesTimeline = gsap.timeline({});
let knifeTimeline = gsap.timeline({repeat: -1});
let hatTimeline = gsap.timeline({repeat: -1});

// Global "state" var: prevents section skip on weird scrolls
let isScrolling = false;

// Initial "flash"
introTimeline.fromTo("#introAnimation-wrapper__logo", {opacity: 0.6}, {opacity: 1, duration: 0.5, ease: Power3.easeIn});

// First full "flash"
introTimeline.to("#introAnimation-wrapper__logo", {opacity: 0, duration: 0.25, delay: 0.4, ease: Power3.easeIn});
introTimeline.to("#introAnimation-wrapper__logo", {opacity: 1, duration: 0.25, ease: Power3.easeIn});

// Wait a bit, then second "flash"
introTimeline.to("#introAnimation-wrapper__logo", {opacity: 0, duration: 0.4, ease: Power3.easeIn});

introTimeline.to("#introAnimation-wrapper__logo", {opacity: 0.6, duration: 2, delay: 0.1, ease: Power4.easeOut});
introTimeline.to("#introAnimation-wrapper__black-bg", {autoAlpha: 0, duration: 2, ease: Power4.easeOut}, "<");
introTimeline.to("#hero__bg-first", {opacity: 1, duration: 1, ease: Power4.easeOut}, "<");

introTimeline.to("#introAnimation-wrapper__logo", {duration: 1.75, delay: 0.3, ease: Power3.easeOut, autoAlpha: 0, scale: 10});

introTimeline.to(".introAnimation-wrapper", {duration: 0.001, autoAlpha: 0});
introTimeline.to(".introAnimation-wrapper .logo-container", {duration: 0.001, autoAlpha: 0});

introTimeline.fromTo("#hero__world__img", {yPercent: 35}, {duration: 2, ease: Power3.easeOut, opacity: 0.84, yPercent: 1});


// introTimeline.from("#hero__main-title", {duration: 2, ease: Power4.easeOut, opacity: 0, y: "25vH", scale: 0.5}, "<");

introTimeline.add(function() { 
  const worldImageWidth = $('#hero__world__img').width();

  if(worldImageWidth < window.innerWidth) {
    $('#zodiac-wrapper').css('width', worldImageWidth);
  }
  else {
    $('#zodiac-wrapper').css('width', '100%')
  }
}, "<")

introTimeline.to("#zodiac-wrapper", {duration: 1.5, delay: 0, ease: Power3.easeInOut, autoAlpha: 1, bottom: 0, scale: 1}, '<+=0.5');
introTimeline.to("#hero__luna__img", {duration: 1.5, delay: 0, ease: Power3.easeInOut, left: '5%'}, '<+=0.3');
introTimeline.to("#home-nav", {autoAlpha: 1, duration: 1, ease: Power3.easeInOut}, '<+=0.3');

masterTimeline.add(introTimeline);

$(document).ready(function() {
  masterTimeline.play();
  gsap.to("#leaves .leaves__img:nth-child(8)", {rotation:"7_short", duration: 6, repeat: -1, yoyo: true, ease: Elastic.easeOut});
  gsap.to("#leaves .leaves__img:nth-child(7)", {rotation:"356_short", duration: 6, repeat: -1, yoyo: true, ease: Elastic.easeOut});
  gsap.to("#leaves .leaves__img:nth-child(6)", {rotation:"355_short", duration: 6, repeat: -1, yoyo: true, ease: Elastic.easeOut});

  gsap.to("#leaves .leaves__img:nth-child(5)", {rotation:"353_short", duration: 6, repeat: -1, yoyo: true, ease: Elastic.easeOut});

  gsap.to("#leaves .leaves__img:nth-child(4)", {rotation:"6_short", duration: 6, repeat: -1, yoyo: true, ease: Elastic.easeOut});
  gsap.to("#leaves .leaves__img:nth-child(3)", {rotation:"7_short", duration: 6, repeat: -1, yoyo: true, ease: Elastic.easeOut});
  gsap.to("#leaves .leaves__img:nth-child(2)", {rotation:"357_short", duration: 6, repeat: -1, yoyo: true, ease: Elastic.easeOut});

  knifeTimeline.to('#loftRestaurant #knifeandhat .knife', {y: "-=30", rotate: `-=5`, duration: 2, ease: Sine.easeInOut})
  knifeTimeline.to('#loftRestaurant #knifeandhat .knife', {y: "+=30", rotate: `+=5`, duration: 2, ease: Sine.easeInOut})

  hatTimeline.to('#loftRestaurant #knifeandhat .hat', {y: "-=20", rotate: `-=10`, duration: 2.5, ease: Sine.easeInOut})
  hatTimeline.to('#loftRestaurant #knifeandhat .hat', {y: "+=20", rotate: `+=10`, duration: 2.5, ease: Sine.easeInOut})
})

// Scroll animations

const scrolling = {
  enabled: true,
  events: "scroll,wheel,touchmove,pointermove".split(","),
  prevent: e => e.preventDefault(),
  disable() {
    if (scrolling.enabled) {
      scrolling.enabled = false;
      window.addEventListener("scroll", gsap.ticker.tick, {passive: true});
      scrolling.events.forEach((e, i) => (i ? document : window).addEventListener(e, scrolling.prevent, {passive: false}));
      console.log('scrolling disabled')
    }
  },
  enable() {
    if (!scrolling.enabled) {
      setTimeout(function() {
        scrolling.enabled = true;
        window.removeEventListener("scroll", gsap.ticker.tick);
        scrolling.events.forEach((e, i) => (i ? document : window).removeEventListener(e, scrolling.prevent));
        console.log('scrolling enabled')
      }, 2000)
    }
  }
}

const firstElem = document.querySelector("section");
let idx = 0

function goToSection(i, direction) {
  if(scrolling.enabled) {
    isScrolling = true;

    if(direction === 'down') {
      if(idx < 10) {
        idx++
      }

      if(idx === 5) {
        idx++
      }
    }
    else {
      if(idx >= 0) {
        idx--
      }
      if(idx === 5) {
        idx--
      }
    }
    console.log(idx)

    gsap.to(window, {
      scrollTo: {y: idx*innerHeight + firstElem.offsetTop, autoKill: false},
      duration: 2,
      ease: Power4.EaseOut,
      onStart: scrolling.disable(),
      onComplete: function() {
        scrolling.enable();
        isScrolling = false; 

      },
    });
  }
}

let sections = document.querySelectorAll("section"),
  wrap = gsap.utils.wrap(0, sections.length),
  animating;

Observer.create({
  type: "wheel,touch,pointer",
  wheelSpeed: -1,
  onDown: function() {
    !animating && goToSection(idx, direction = 'up')
  },
  onUp: function() {
    !animating && goToSection(idx, direction = 'down')
  },
  tolerance: 10,
  preventDefault: true
});


function scrollToAnchor(section, event) {
  event.preventDefault()

  if(isScrolling === false) {
    isScrolling = true;
    console.log(firstElem)

    gsap.to(window, {
      scrollTo: section,
      duration: 2,
      ease: Power4.EaseOut,
      onStart: scrolling.disable(),
      onComplete: function() {
        scrolling.enable();
        isScrolling = false; 
      },
    });
  }
}

function generateRandomFromRange(max) {
  return (
    Math.floor(Math.random() * max)
  )
}

let loftRestaurantTl = gsap.timeline({
  scrollTrigger:{
    trigger:'#loftRestaurant',
    start:"top center",
    scrub: false,
    onEnter: function() {
      loftRestaurantTl.play()
    },
    onEnterBack: function() {
      loftRestaurantTl.play()
    },
    onLeave: function() {
      //loftRestaurantTl.reverse()
    }
  },
  paused: true,
})

loftRestaurantTl.to('#leaves .leaves__img:nth-child(2)', {x: "-130%", duration: 2, ease: Power4.easeIn})
loftRestaurantTl.to('#leaves .leaves__img:nth-child(3)', {x: "-130%", duration: 2.2, ease: Power4.easeIn}, '<')
loftRestaurantTl.to('#leaves .leaves__img:nth-child(4)', {x: "-130%", duration: 1.9, ease: Power4.easeIn}, '<')
loftRestaurantTl.to('#leaves .leaves__img:nth-child(5)', {x: "-130%", duration: 1.6, ease: Power4.easeIn}, '<')

loftRestaurantTl.to('#leaves .leaves__img:nth-child(6)', {x: "130%", duration: 2, delay: 0.3, ease: Power4.easeIn}, '<')
loftRestaurantTl.to('#leaves .leaves__img:nth-child(7)', {x: "130%", duration: 2.2, ease: Power4.easeIn}, '<')
loftRestaurantTl.to('#leaves .leaves__img:nth-child(8)', {x: "130%", duration: 2.2, ease: Power4.easeIn}, '<')

loftRestaurantTl.to('#leaves .leaves-bg', {opacity: 0, duration: 1.7, ease: Power4.easeIn}, '<')

loftRestaurantTl.fromTo('#loftRestaurant .crystal-wrapper img', {y: "-110%"}, {y: "0", duration: 1.5, ease: Power4.easeOut})
loftRestaurantTl.to('#loftRestaurant .crystal-zodiac-wrapper__noglow-img', {opacity: 1, duration: 0.6, ease: Power4.easeIn}, '<+=0.5')
loftRestaurantTl.fromTo('#loftRestaurant .crystal-zodiac-wrapper__main-img', {opacity: 0}, {opacity: 1, duration: 1.75, ease: Elastic.easeIn.config(2, 0.3)}, "<")
loftRestaurantTl.to('#loftRestaurant .ambient-light', {opacity: 1, duration: 0.5, ease: Elastic.easeIn.config(2, 0.3)}, '<+=1')
loftRestaurantTl.to('#loftRestaurant h2', {opacity: 1, duration: 2, ease: Power4.easeOut}, '<+=1')

// Pizza + North

let stonewallBgTl = gsap.timeline({
  scrollTrigger: {
      trigger:'#loftRestaurant__stonewall-bg',
      start:"bottom bottom+=10px",
      end: '+=100%',
      scrub: 1,
      pin: true,
      pinSpacer: false,
  }   
})

stonewallBgTl.to('#loftRestaurant__stonewall-bg', {opacity: 0, ease: Power4.easeIn})

let loftRestaurant__bg_gradientTl = gsap.timeline({
  scrollTrigger: {
      trigger:'#loftRestaurant__bg-black-gradient',
      start:"bottom bottom+=10px",
      end: '+=100%',
      scrub: 1,
      pin: true,
      pinSpacer: false,
  }   
})

loftRestaurant__bg_gradientTl.to('#loftRestaurant__bg-black-gradient', {opacity: 0, ease: Power4.easeIn})

// Pizza slices

let pizzaSliceOneTimeline = gsap.timeline({repeat: -1});
let pizzaSliceTwoTimeline = gsap.timeline({repeat: -1});

pizzaSliceOneTimeline.to('#pizza-slice_7', {y: "-=30", rotate: `-=2`, duration: 2, ease: Sine.easeInOut})
pizzaSliceOneTimeline.to('#pizza-slice_7', {y: "+=30", rotate: `+=2`, duration: 2, ease: Sine.easeInOut})

pizzaSliceTwoTimeline.to('#pizza-slice_8', {y: "-=30", rotate: `-=3`, duration: 2.5, ease: Sine.easeInOut})
pizzaSliceTwoTimeline.to('#pizza-slice_8', {y: "+=30", rotate: `+=3`, duration: 2.5, ease: Sine.easeInOut})

let pizzaTl = gsap.timeline({
  scrollTrigger: {
      trigger:'#pizza',
      start:"top bottom+=1",
      onEnter: function() {
        pizzaTl.play()
        const smokeVideo = jQuery('#smoke-overlay video');
        smokeVideo.prop('preload','auto');
        smokeVideo.trigger('play');
      },
  },
  paused: true,
})

pizzaTl.to('#pizza-slice_1', {x: "+=110%", y: "+=28%", duration: 1.5, delay: 2, ease: Power4.easeOut})
pizzaTl.add(pizzaSliceOneTimeline, '<')
pizzaTl.to('#pizza-slice_2', {x: "+=120%", y: "+=0000", autoAlpha: 0, duration: 2, ease: Power4.easeOut}, '<')
pizzaTl.to('#pizza-slice_3', {x: "+=000", y: "-=100%", autoAlpha: 0, duration: 2, ease: Power4.easeOut}, '<')
pizzaTl.to('#pizza-slice_4', {x: "-=110%", y: "-=0000", duration: 2, ease: Power4.easeOut}, '<')
pizzaTl.add(pizzaSliceTwoTimeline, '<')
pizzaTl.to('#pizza-slice_5', {x: "-=130%", y: "+=100%", autoAlpha: 0, duration: 2, ease: Power4.easeOut}, '<')
pizzaTl.to('#pizza-slice_6', {x: "+=5%", y: "+=100%", autoAlpha: 0, duration: 2, ease: Power4.easeOut}, '<')
pizzaTl.to('#pizza-slice_7', {left: "-38%", top: "20%", autoAlpha: 1, duration: 2, ease: Power4.easeOut}, '<+=1')
pizzaTl.to('#pizza-slice_8', {left: "92%", top: "47%", autoAlpha: 1, duration: 2, ease: Power4.easeOut}, '<')
pizzaTl.to('#pizza #tagliere', {x: "-115%", y: "-20%", scale: "1.3", duration: 2, ease: Power4.easeOut}, '<+=0.5')
pizzaTl.fromTo('#pizza #pizza-cheft-hat__img', {x: "+=20", y: "+=5", opacity: 0}, {x: "0", y: "0", opacity: 1, duration: 2, ease: Power4.easeOut}, '<+=0.3')
//pizzaTl.fromTo('#cactus__img', {y: "+=200", opacity: 0}, {y: "0", opacity: 1, duration: 2, ease: Power4.easeOut}, '<+=0.3')
pizzaTl.to('#pizza .pizza-tagliere-wrapper h2', {opacity: 1, duration: 2, delay: 0.2, ease: Power4.easeOut})

// Pizza parallax

let secondStonewallBgTl = gsap.timeline({
  scrollTrigger: {
    trigger:'#pizza .bg-blue-stonewall',
    start:"bottom bottom",
    end: '+=100%',
    scrub: 0,
    pin: true,
    pinSpacer: false,
  }   
})

secondStonewallBgTl.to('#pizza .bg-blue-stonewall', {autoAlpha: 0, ease: Power4.easeIn})
secondStonewallBgTl.to('#ventagli', {autoAlpha: 1, ease: Power4.easeIn}, '<')

let pizza_bgBlackGradientTl = gsap.timeline({
  scrollTrigger: {
      trigger:'#pizza .bg-black-gradient',
      start:"bottom bottom",
      end: '+=100%',
      scrub: 0,
      pin: true,
      pinSpacer: false,
  }   
})

pizza_bgBlackGradientTl.to('#pizza .bg-black-gradient', {autoAlpha: 0, ease: Power4.easeIn})
pizza_bgBlackGradientTl.to('#oriental', {autoAlpha: 1, ease: Power4.easeIn}, '<')

// Ventagli

let ventaglioOneTimeline = gsap.timeline({repeat: -1});
let ventaglioTwoTimeline = gsap.timeline({repeat: -1});

gsap.to("#parasol_1", {rotation: 360, duration: 4, ease: 'none', repeat: -1});
gsap.to("#parasol_2", {rotation: -360, duration: 6, ease: 'none', repeat: -1});
gsap.to("#parasol_3", {rotation: 360, duration: 5, ease: 'none', repeat: -1});
gsap.to("#parasol_4", {rotation: 360, duration: 6, ease: 'none', repeat: -1});
gsap.to("#parasol_5", {rotation: -360, duration: 3, ease: 'none', repeat: -1});
gsap.to("#parasol_6", {rotation: 360, duration: 8, ease: 'none', repeat: -1});
gsap.to("#parasol_7", {rotation: 360, duration: 7, ease: 'none', repeat: -1});
gsap.to("#parasol_8", {rotation: -360, duration: 5, ease: 'none', repeat: -1});
gsap.to("#parasol_9", {rotation: 360, duration: 4, ease: 'none', repeat: -1});

gsap.fromTo('#samurai-mask', {y: "+=30", rotate: `+=1`}, {y: "-=30", rotate: `-=1`, duration: 2, yoyo: true, repeat: -1, ease: Sine.easeInOut})
gsap.fromTo('#umbrella', {y: "+=20", rotate: `+=1`}, {y: "-=20", rotate: `-=1`, duration: 2, yoyo: true, repeat: -1, ease: Sine.easeInOut})
gsap.fromTo('#north-bottom-right-fan', {y: "+=30", rotate: `+=1`}, {y: "-=30", rotate: `-=1`, yoyo: true, duration: 2, repeat: -1, ease: Sine.easeInOut})

let ventagliSlideOutTimeline = gsap.timeline({
  scrollTrigger:{
      trigger:'#oriental',
      start:"bottom bottom+=10px",
  },
  delay: 0.3,
})

ventagliSlideOutTimeline.to('#ventagli-oriental__wrapper #cactus__img', {left: "-140%", duration: 1.36, ease: Power4.easeOut})
ventagliSlideOutTimeline.to('#parasol_1', {left: "-100%", duration: 3.36, ease: Power4.easeOut}, '<')
ventagliSlideOutTimeline.to('#parasol_2', {left: "-100%", duration: 3.7, ease: Power4.easeOut}, '<')
ventagliSlideOutTimeline.to('#parasol_3', {left: "-100%", duration: 3.8, ease: Power4.easeOut}, '<')
ventagliSlideOutTimeline.to('#parasol_4', {left: "+100%", duration: 3.4, ease: Power4.easeOut}, '<')
ventagliSlideOutTimeline.to('#parasol_5', {left: "+100%", duration: 3.6, ease: Power4.easeOut}, '<')
ventagliSlideOutTimeline.to('#parasol_6', {left: "-100%", duration: 3.7, ease: Power4.easeOut}, '<')
ventagliSlideOutTimeline.to('#parasol_7', {left: "+100%", duration: 3.8, ease: Power4.easeOut}, '<')
ventagliSlideOutTimeline.to('#parasol_8', {right: "+100%", duration: 3.4, ease: Power4.easeOut}, '<')
ventagliSlideOutTimeline.to('#parasol_9', {left: "+100%", duration: 3.5, ease: Power4.easeOut}, '<')
ventagliSlideOutTimeline.to('#samurai-mask', {left: "-16%", duration: 1, ease: Power4.easeOut}, '<+=2')
ventagliSlideOutTimeline.to('#north-bottom-right-fan', {right: "-19%", duration: 1, ease: Power4.easeOut}, '<')
ventagliSlideOutTimeline.to('#oriental h2', {opacity: 1, duration: 3, ease: Power4.easeOut}, '<+=0.5')

// Seconda classe

let guitarTimeline = gsap.timeline({repeat: -1});
let bisteccaBottomRightTimeline = gsap.timeline({repeat: -1});
let bisteccaTopRightTimeline = gsap.timeline({repeat: -1});

guitarTimeline.to('#guitar', {y: "-=30", rotate: `-=2`, duration: 2, ease: Sine.easeInOut})
guitarTimeline.to('#guitar', {y: "+=30", rotate: `+=2`, duration: 2, ease: Sine.easeInOut})

bisteccaBottomRightTimeline.to('#bistecca-bottomright', {y: "-=30", rotate: `-=3`, duration: 2.5, ease: Sine.easeInOut})
bisteccaBottomRightTimeline.to('#bistecca-bottomright', {y: "+=30", rotate: `+=3`, duration: 2.5, ease: Sine.easeInOut})

bisteccaTopRightTimeline.to('#bistecca-topright', {y: "-=30", rotate: `-=3`, duration: 3, ease: Sine.easeInOut})
bisteccaTopRightTimeline.to('#bistecca-topright', {y: "+=30", rotate: `+=3`, duration: 3, ease: Sine.easeInOut})

let secondaclasseMainTl = gsap.timeline({
  scrollTrigger: {
      trigger:'#secondaclasse__main',
      start:"top center",
  },
  onComplete: function() {
    jQuery('#smoke-video').remove()
  }
})


secondaclasseMainTl.to("#smoke-overlay", {autoAlpha: 1, duration: 2, ease: Power4.easeInOut});
secondaclasseMainTl.to("#secondaclasse__main", {autoAlpha: 1, duration: 0.3, ease: Power4.easeInOut});
secondaclasseMainTl.to("#smoke-overlay", {autoAlpha: 0, duration: 2.5, ease: Power4.easeInOut});
secondaclasseMainTl.to("#train", {left: "-3000px", duration: 5, ease: 'none'}, '<+1');
secondaclasseMainTl.to('#secondaclasse-text', {opacity: 1, duration: 3, delay: 0.8, ease: Power4.easeOut}, '<+2')

// Roses
let isRosesTlReversing = false;
let horseLeftTl = gsap.timeline({repeat: -1});
let horseRightTl = gsap.timeline({repeat: -1});
let paperellaLeftTl = gsap.timeline({repeat: -1});
let paperellaRightTl = gsap.timeline({repeat: -1});

let rosesTl = gsap.timeline({
  scrollTrigger: {
      trigger:'#rosesAndHorses',
      start:"bottom bottom-=10px",
      // end: '+=100%',
      scrub: false,
      pin: false,
      onEnter: function() {
        rosesTl.play()
      },
      onLeaveBack: function() {
        //rosesTl.reverse()
      },
  },
  onStart: function() {
    isRosesTlReversing = false;
  },
  onComplete: function() {

  },
  paused: true
})

rosesTl.to('#rosa-left', {top: "40%", duration: 2})
rosesTl.to('#rosa-left', {rotate: "-=90", duration: 2}, '<')
rosesTl.to('#rosa-right', {top: "40%", duration: 2}, '<')
rosesTl.to('#rosa-right', {rotate: "+=90", duration: 2}, '<')
rosesTl.to('#rosa-left', {top: "7%", duration: 1, ease: Power4.easeInOut})
rosesTl.to('#rosa-right', {top: "7%", duration: 1, ease: Power4.easeInOut}, '<')
rosesTl.to('#horse_1', {top: "-70%", duration: 1, ease: Power4.easeInOut}, '<')
rosesTl.to('#horse_2', {top: "-70%", duration: 1, ease: Power4.easeInOut}, '<')

rosesTl.to('#paperella_sx', {bottom: "10%", duration: 1, ease: Power4.easeInOut}, '<')
rosesTl.to('#paperella_dx', {bottom: "13%", duration: 1, ease: Power4.easeInOut}, '<')

gsap.to('#horse_1', {y: "+=3%", duration: 2, ease: Sine.easeInOut, yoyo: true, repeat: -1})
gsap.to('#horse_2', {y: "+=3%", duration: 2, ease: Sine.easeInOut, yoyo: true, repeat: -1})

gsap.to('#paperella_dx', {y: "+=3%", duration: 2, ease: Sine.easeInOut, yoyo: true, repeat: -1})
gsap.to('#paperella_sx', {y: "+=3%", duration: 2, ease: Sine.easeInOut, yoyo: true, repeat: -1})

rosesTl.to('#hotel_acceso', {opacity: 1, duration: 1, ease: Elastic.easeIn.config(2, 0.3)})
rosesTl.to('#boutique-hotel h2', {opacity: 1, duration: 3, ease: Power4.easeOut}, '<')

let boutiqueHotelTl = gsap.timeline({
  scrollTrigger: {
      trigger:'#pasticceria-gelateria',
      start:"top bottom",
      scrub: false,
      pin: false,
      // pinSpacer: false,
      onEnter: function() {
        boutiqueHotelTl.play()
      },
      onLeaveBack: function() {
        //boutiqueHotelTl.reverse()
      }
  },
  onStart: function() {

  },
  onComplete: function() {

  },
  paused: true,
})

boutiqueHotelTl.to('#horse_2', {top: "-64%", duration: 2.6, ease: Power4.easeOut})
boutiqueHotelTl.to('#horse_1', {top: "-61%", duration: 2.6, ease: Power4.easeOut}, '<')
boutiqueHotelTl.to('#paperella_sx', {bottom: "-5%", duration: 2.6, ease: Power4.easeOut}, '<')
boutiqueHotelTl.to('#paperella_dx', {bottom: "-10%", duration: 2.6, ease: Power4.easeOut}, '<')

let pasticceriaGelateriaTl = gsap.timeline({
  scrollTrigger: {
      trigger:'#pasticceria-gelateria',
      start:"top bottom",
      scrub: false,
      pin: false,
      // pinSpacer: false,
      onEnter: function() {
        pasticceriaGelateriaTl.play()
      },
      onLeaveBack: function() {
        //pasticceriaGelateriaTl.reverse()
      }
  },
  onStart: function() {

  },
  onComplete: function() {
    pasticceriaGelateriaLampsTl.play()
    pasticceriaGelateriaFloatingTl.play()
  },
  paused: true,
})

let pasticceriaGelateriaLampsTl = gsap.timeline({
  paused: true,
})

pasticceriaGelateriaTl.to('#palla-ice-rosa__container', {top: "13%", right: "0", duration: 2.6, ease: Power4.easeOut})
pasticceriaGelateriaTl.to('#macaron-rosa__container', {top: "15%", right: "16%", duration: 2.6, ease: Power4.easeOut}, '<')
pasticceriaGelateriaTl.to('#icecream__container', {bottom: "7%", right: "3%", duration: 2.6, ease: Power4.easeOut}, '<')
pasticceriaGelateriaTl.to('#macaron-green__container', {bottom: "-8%", right: "19%", duration: 2.6, ease: Power4.easeOut}, '<')
pasticceriaGelateriaTl.to('#torta__container', {bottom: "-4%", left: "6%", duration: 2.6, ease: Power4.easeOut}, '<')

pasticceriaGelateriaLampsTl.to('#lamp-four__container', {top: "-2%", duration: 0.3, ease: Power4.easeOut})
pasticceriaGelateriaLampsTl.to('#lamp-three__container', {top: "0", duration: 0.3, ease: Power4.easeOut})
pasticceriaGelateriaLampsTl.to('#lamp-two__container', {top: "-2%", duration: 0.3, ease: Power4.easeOut})
pasticceriaGelateriaLampsTl.to('#lamp-one__container', {top: "0", duration: 0.3, ease: Power4.easeOut})
pasticceriaGelateriaLampsTl.to('#pasticceria-gelateria h2', {opacity: 1, duration: 3, delay: 0.8, ease: Power4.easeOut})

let pasticceriaGelateriaFloatingTl = gsap.timeline({
  paused: true,
  onComplete: function() {
    gsap.to('#palla-ice-rosa__container', {y: "+=12", rotate: `-=1`, duration: 2, ease: Sine.easeInOut, repeat: -1, yoyo: true})
    gsap.to('#macaron-rosa', {y: "+=11", rotate: `-=2`, duration: 2, ease: Sine.easeInOut, repeat: -1, yoyo: true})
    gsap.to('#icecream', {y: "+=8", rotate: `-=2`, duration: 2, ease: Sine.easeInOut, repeat: -1, yoyo: true})
    gsap.to('#macaron-green', {y: "+=13", rotate: `-=1`, duration: 2, ease: Sine.easeInOut, repeat: -1, yoyo: true})
    gsap.to('#torta', {y: "+=12", rotate: `-=1`, duration: 2, ease: Sine.easeInOut, repeat: -1, yoyo: true})
  }
})

pasticceriaGelateriaFloatingTl.to('#macaron-rosa', {x: "-=20vW", top: "+=5vH", duration: 5, ease: Sine.easeOut})
pasticceriaGelateriaFloatingTl.to('#palla-ice-rosa__container', {x: "-=2vW", top: "-=12vH", duration: 5, ease: Sine.easeOut}, "<")
pasticceriaGelateriaFloatingTl.to('#icecream', {x: "-=2vW", top: "-=12vH", rotate: "-=15", duration: 4, ease: Sine.easeOut}, "<")
pasticceriaGelateriaFloatingTl.to('#macaron-green', {x: "-=2vW", rotate: "+=15", duration: 5, ease: Sine.easeOut}, "<")
pasticceriaGelateriaFloatingTl.to('#torta', {x: "-=2vW", rotate: "-=18", duration: 6, ease: Sine.easeOut}, "<")

let shopTl = gsap.timeline({
  scrollTrigger: {
      trigger:'#shop',
      start:"top bottom",
      scrub: false,
      pin: false,
      // pinSpacer: false,
      onEnter: function() {
        
      },
      onLeaveBack: function() {
        //pasticceriaGelateriaTl.reverse()
      },
      onEnterBack: function() {

      }
  },
  delay: 0.3,
  onStart: function() {
  },
  onComplete: function() {
    shopTl.play()
  },
  paused: true,
})

shopTl.fromTo('#scarpa-two__container', {top: "-36%", left: "-44%", scale: 1.2, filter: "blur(3px)"}, {top: "27%", left: "4%", scale: 1, filter: "blur(0px)", duration: 2.6, ease: Power4.easeOut})
shopTl.fromTo('#scarpa-one__container', {top: "3%", left: "4%", scale: 1.3, filter: "blur(4px)"}, {top: "3%", left: "4%", scale: 1, filter: "blur(0px)", duration: 2.6, ease: Power4.easeOut}, "<")
shopTl.fromTo('#coniglio__container', {right: "4%", scale: 1.3, filter: "blur(4px)"}, {right: "0%", scale: 1, filter: "blur(0px)", duration: 2.6, ease: Power4.easeOut}, "<")
shopTl.to('#moto__container', {right: "0%", duration: 2.6, ease: Power4.easeOut}, "<")
shopTl.to('#shop h2', {opacity: 1, duration: 3, delay: 0.8, ease: Power4.easeOut})

let areaArredoTl = gsap.timeline({
  scrollTrigger: {
      trigger:'#arearredo',
      start:"top bottom",
      scrub: false,
      pin: false,
      // pinSpacer: false,
      onEnter: function() {

      },
      onEnterBack: function() {
  
      }
  },
  onStart: function() {
    areaArredoScrollTl.play()
  },
  onComplete: function() {
    //shopTl.play()
  },
})

let areaArredoScrollTl = gsap.timeline({paused: true})

areaArredoScrollTl.to('#scarpa-one', {y: "+=95%", duration: 2, ease: Power4.easeOut})
areaArredoScrollTl.to('#scarpa-two', {y: "+=85%", duration: 2, ease: Power4.easeOut}, '<')
areaArredoScrollTl.to('#coniglio', {y: "+=65%", duration: 2, ease: Power4.easeOut}, '<')
areaArredoScrollTl.to('#scarpa-one', {y: "-=95%", duration: 1, delay: 2, ease: Power4.easeOut})
areaArredoScrollTl.to('#scarpa-two', {y: "-=85%", duration: 1, ease: Power4.easeOut}, '<')
areaArredoScrollTl.to('#coniglio', {y: "-=65%", duration: 1, ease: Power4.easeOut}, '<')

areaArredoTl.to('#coniglio-arearredo__container', {top: "0", left: "2%", duration: 3, ease: Power4.easeOut}, '<')
areaArredoTl.fromTo('#divano', {y: '-=130', autoAlpha: 0}, {y: '0', autoAlpha: 1, duration: 1, ease: Elastic.easeInOut}, '<+=0.5')
areaArredoTl.to('#cassaforte__container', {right: '-3%', duration: 1.5, ease: Elastic.easeInOut}, '<+=0.5')
areaArredoTl.to('#frame__container', {top: "0", right: "2%", duration: 0.6, ease: Power4.easeOut}, '<+=0.5')
areaArredoTl.to('#lamp-conluce__container', {opacity: 1, duration: 2, ease: Elastic.easeInOut}, '<+=0.2')
areaArredoTl.to('#arearredo h2', {opacity: 1, duration: 3, delay: 0.8, ease: Power4.easeOut})

$('#zodiac-wrapper a').click(function(event) {
  event.preventDefault()

  idx = parseInt(jQuery(this).attr('data-anchor')) - 1
  goToSection(idx, direction = 'down')
})