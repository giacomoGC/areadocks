//opacity 0.8
//opacity 1
//opacity 0.1
//opacity 1 + sky bg

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const smoother = ScrollSmoother.create({
  smooth: 1,               // how long (in seconds) it takes to "catch up" to the native scroll position
  effects: true,           // looks for data-speed and data-lag attributes on elements
  smoothTouch: 0.1,        // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
});

let masterTimeline = gsap.timeline({});
let introTimeline = gsap.timeline({});
let leavesTimeline = gsap.timeline({});
let knifeTimeline = gsap.timeline({repeat: -1});
let hatTimeline = gsap.timeline({repeat: -1});

// Global "state" var: prevents section skip on weird scrolls
let isScrolling = false;

// Initial "flash"
introTimeline.fromTo("#introAnimation-wrapper__logo", {opacity: 0.7}, {opacity: 1, duration: 0.7, ease: Power3.easeIn});

// First full "flash"
introTimeline.to("#introAnimation-wrapper__logo", {opacity: 0, duration: 0.3, delay: 0.4, ease: Power3.easeIn});
introTimeline.to("#introAnimation-wrapper__logo", {opacity: 1, duration: 0.3, ease: Power3.easeIn});

// Wait a bit, then second "flash"
introTimeline.to("#introAnimation-wrapper__logo", {opacity: 0, duration: 0.4, delay: 0.2, ease: Power3.easeIn});

introTimeline.to("#introAnimation-wrapper__logo", {opacity: 0.6, duration: 3, delay: 0.4, ease: Power4.easeOut});
introTimeline.to("#introAnimation-wrapper__black-bg", {autoAlpha: 0, duration: 3, ease: Power4.easeOut}, "<");
introTimeline.to("#hero__bg-first", {opacity: 1, duration: 3, ease: Power4.easeOut}, "<");

introTimeline.to("#introAnimation-wrapper__logo", {duration: 2.25, delay: 1, ease: Power3.easeOut, autoAlpha: 0, scale: 10});

introTimeline.to(".introAnimation-wrapper", {duration: 0.001, autoAlpha: 0});
introTimeline.to(".introAnimation-wrapper .logo-container", {duration: 0.001, autoAlpha: 0});

introTimeline.fromTo("#hero__world__img", {yPercent: 35}, {duration: 2.5, delay: -2.25, ease: Power3.easeOut, opacity: 0.84, yPercent: 1});
introTimeline.from("#hero__main-title", {duration: 2, delay: 0.1 ,ease: Power4.easeOut, opacity: 0, y: "25vH", scale: 0.5}, "<");

introTimeline.add(function() { 
  const worldImageWidth = $('#hero__world__img').width();

  if(worldImageWidth < window.innerWidth) {
    $('#zodiac-wrapper').css('width', worldImageWidth);
  }
  else {
    $('#zodiac-wrapper').css('width', '100%')
  }

  // $('.scrollSectionsAfterHero').css('display', 'block');
  // $('#hero').css('padding-right', '0');
  // $('#hero').css('width', '100%');
})

introTimeline.to("#zodiac-wrapper", {duration: 1.5, delay: 0, ease: Power3.easeInOut, autoAlpha: 1, bottom: 0, scale: 1});
introTimeline.to("#hero__luna__img", {duration: 1.5, delay: 0, ease: Power3.easeInOut, left: '5%'}, '<+=0.3');

masterTimeline.add(introTimeline);

$(document).ready(function() {
  masterTimeline.play();
  gsap.to("#leaves .leaves__img:nth-child(8)", {rotation:"7_short", duration: 6, repeat: -1, yoyo: true, delay: 0.1, ease: Elastic.easeOut});
  gsap.to("#leaves .leaves__img:nth-child(7)", {rotation:"356_short", duration: 6, repeat: -1, yoyo: true, delay: 0.1, ease: Elastic.easeOut});
  gsap.to("#leaves .leaves__img:nth-child(6)", {rotation:"355_short", duration: 6, repeat: -1, yoyo: true, delay: 0.1, ease: Elastic.easeOut});

  gsap.to("#leaves .leaves__img:nth-child(5)", {rotation:"353_short", duration: 6, repeat: -1, yoyo: true, delay: 0.1, ease: Elastic.easeOut});

  gsap.to("#leaves .leaves__img:nth-child(4)", {rotation:"6_short", duration: 6, repeat: -1, yoyo: true, delay: 0.1, ease: Elastic.easeOut});
  gsap.to("#leaves .leaves__img:nth-child(3)", {rotation:"7_short", duration: 6, repeat: -1, yoyo: true, delay: 0.1, ease: Elastic.easeOut});
  gsap.to("#leaves .leaves__img:nth-child(2)", {rotation:"357_short", duration: 6, repeat: -1, yoyo: true, delay: 0.1, ease: Elastic.easeOut});

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

function goToSection(i, anim) {
  if(isScrolling === false) {
    isScrolling = true;

    gsap.to(window, {
      scrollTo: {y: i*innerHeight + firstElem.offsetTop, autoKill: false},
      duration: 2,
      ease: Power4.EaseOut,
      onStart: scrolling.disable(),
      onComplete: function() {
        scrolling.enable();
        isScrolling = false; 
      },
    });
  }

  // if(anim) {
  //   anim.restart();
  // }
}

gsap.utils.toArray("section").forEach((panel, i) => {
  ScrollTrigger.create({
    trigger: panel,
    onEnter: function() {
      if(isScrolling === false) {
        goToSection(i)
      }
    },
  });
  
  // ScrollTrigger.create({
  //   trigger: panel,
  //   start: "bottom bottom",
  //   onEnterBack: () => goToSection(i),
  // });
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
        // setTimeout(function() {
        //   ScrollTrigger.refresh()
        // }, 1000)
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
      start:"top top+=10px",
  },
})

loftRestaurantTl.to('#leaves .leaves__img:nth-child(2)', {x: "-130%", duration: 2, delay: 0.3, ease: Power4.easeIn})
loftRestaurantTl.to('#leaves .leaves__img:nth-child(3)', {x: "-130%", duration: 2.2, ease: Power4.easeIn}, '<')
loftRestaurantTl.to('#leaves .leaves__img:nth-child(4)', {x: "-130%", duration: 1.9, ease: Power4.easeIn}, '<')
loftRestaurantTl.to('#leaves .leaves__img:nth-child(5)', {x: "-130%", duration: 1.6, ease: Power4.easeIn}, '<')

loftRestaurantTl.to('#leaves .leaves__img:nth-child(6)', {x: "130%", duration: 2, delay: 0.3, ease: Power4.easeIn}, '<')
loftRestaurantTl.to('#leaves .leaves__img:nth-child(7)', {x: "130%", duration: 2.2, ease: Power4.easeIn}, '<')
loftRestaurantTl.to('#leaves .leaves__img:nth-child(8)', {x: "130%", duration: 2.2, ease: Power4.easeIn}, '<')

loftRestaurantTl.to('#leaves .leaves-bg', {opacity: 0, duration: 1.7, ease: Power4.easeIn}, '<')

loftRestaurantTl.fromTo('#loftRestaurant .crystal-wrapper img',{y: "-110%"}, {y: "0", duration: 2.25, delay: 0.3, ease: Power4.easeOut})
loftRestaurantTl.to('#loftRestaurant .crystal-zodiac-wrapper__noglow-img', {opacity: 1, duration: 0.3, ease: Power4.easeIn})
loftRestaurantTl.fromTo('#loftRestaurant .crystal-zodiac-wrapper__main-img',{opacity: 0}, {opacity: 1, duration: 2, ease: Elastic.easeIn.config(2, 0.3)}, "<")

let leavesRevealTl = gsap.timeline({
  scrollTrigger:{
      trigger:'#loftRestaurant',
      start:"top top+=10px",
  },
})

let loftRestaurantParallaxTl = gsap.timeline({
  scrollTrigger: {
      trigger:'#pizza',
      start:"top bottom",
      scrub: false,
      pin: false,
      // pinSpacer: false,
      onEnter: function() {
        loftRestaurantParallaxTl.play()
      },
      onLeaveBack: function() {
        loftRestaurantParallaxTl.reverse()
      }
  },
  // onStart: function() {

  // },
  // onComplete: function() {

  // },
  paused: true,
})

loftRestaurantParallaxTl.to('#knifeandhat', {top: "+=15%", duration: 2.6, ease: Power4.easeOut})
loftRestaurantParallaxTl.to('#loftRestaurant h2', {top: "+=11%", duration: 2.6, ease: Power4.easeOut}, '<')
loftRestaurantParallaxTl.to('.crystal-zodiac-wrapper', {top: "+=11%", duration: 2.6, ease: Power4.easeOut}, '<')

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

pizzaSliceOneTimeline.to('#pizza-slice_1', {y: "-=30", rotate: `-=2`, duration: 2, ease: Sine.easeInOut})
pizzaSliceOneTimeline.to('#pizza-slice_1', {y: "+=30", rotate: `+=2`, duration: 2, ease: Sine.easeInOut})

pizzaSliceTwoTimeline.to('#pizza-slice_4', {y: "-=30", rotate: `-=3`, duration: 2.5, ease: Sine.easeInOut})
pizzaSliceTwoTimeline.to('#pizza-slice_4', {y: "+=30", rotate: `+=3`, duration: 2.5, ease: Sine.easeInOut})

let pizzaTl = gsap.timeline({
  scrollTrigger: {
      trigger:'#pizza',
      start:"top bottom-=10px",
  },
})

pizzaTl.to('#pizza-slice_1', {x: "+=45%", y: "+=28%", duration: 2, delay: 3, ease: Power4.easeOut})
pizzaTl.add(pizzaSliceOneTimeline, '<')
pizzaTl.to('#pizza-slice_2', {x: "+=120%", y: "+=0000", autoAlpha: 0, duration: 2, ease: Power4.easeOut}, '<')
pizzaTl.to('#pizza-slice_3', {x: "+=0000", y: "-=100%", autoAlpha: 0, duration: 2, ease: Power4.easeOut}, '<')
pizzaTl.to('#pizza-slice_4', {x: "-=48%", y: "-=0000", duration: 2, ease: Power4.easeOut}, '<')
pizzaTl.add(pizzaSliceTwoTimeline, '<')
pizzaTl.to('#pizza-slice_5', {x: "-=70%", y: "+=100%", autoAlpha: 0, duration: 2, ease: Power4.easeOut}, '<')
pizzaTl.to('#pizza-slice_6', {x: "+=5%", y: "+=100%", autoAlpha: 0, duration: 2, ease: Power4.easeOut}, '<')
pizzaTl.to('#pizza #tagliere', {x: "-115%", y: "-20%", scale: "1.3", duration: 2, ease: Power4.easeOut})

pizzaTl.fromTo('#pizza #pizza-cheft-hat__img', {x: "+=20", y: "+=5", opacity: 0}, {x: "0", y: "0", opacity: 1, duration: 2, ease: Power4.easeOut}, '<+=0.3')
pizzaTl.fromTo('#cactus__img', {y: "+=200", opacity: 0}, {y: "0", opacity: 1, duration: 2, ease: Power4.easeOut}, '<+=0.3')

// Pizza parallax

let pizzaParallaxTl = gsap.timeline({
  scrollTrigger: {
      trigger:'#ventagli-oriental__wrapper',
      start:"top bottom",
      scrub: false,
      pin: false,
      // pinSpacer: false,
      onEnter: function() {
        pizzaParallaxTl.play()
      },
      onLeaveBack: function() {
        pizzaParallaxTl.reverse()
      }
  },
  // onStart: function() {

  // },
  // onComplete: function() {

  // },
  paused: true,
})

pizzaParallaxTl.to('.pizza-chef-hat', {top: "+=15%", duration: 2.6, ease: Power4.easeOut})
pizzaParallaxTl.to('.pizza-slices', {top: "+=11%", duration: 2.6, ease: Power4.easeOut}, '<')

// Ventagli

let ventaglioOneTimeline = gsap.timeline({repeat: -1});
let ventaglioTwoTimeline = gsap.timeline({repeat: -1});

//ventaglioOneTimeline.to('#parasol_1', {rotate: `+=360`, duration: 2, ease: null})
// gsap.to("#parasol_1", {rotation: 360, duration: 4, ease: 'none', repeat: -1});
// gsap.to("#parasol_2", {rotation: -360, duration: 6, ease: 'none', repeat: -1});
// gsap.to("#parasol_3", {rotation: 360, duration: 8, ease: 'none', repeat: -1});

let ventagliSlideOutTimeline = gsap.timeline({
  scrollTrigger:{
      trigger:'#oriental',
      start:"top top+=10px",
  },
})

// ventagliSlideOutTimeline.to('#parasol_1', {x: "-160%", duration: 2.2, delay: 3, ease: Power4.easeIn})
// ventagliSlideOutTimeline.to('#parasol_2', {x: "-140%", duration: 1.9, ease: Power4.easeIn}, '<+=0.3')
// ventagliSlideOutTimeline.to('#parasol_3', {x: "-130%", duration: 1.6, ease: Power4.easeIn}, '<+=0.3')
ventagliSlideOutTimeline.to('#ventagli-oriental__wrapper #cactus__img', {x: "-140%", duration: 1.36, ease: Power4.easeIn}, '<')

// ventagliSlideOutTimeline.to('#ventaglio_1', {x: "130%", duration: 2, delay: 0.3, ease: Power4.easeIn}, '<')
// ventagliSlideOutTimeline.to('#ventaglio_2', {x: "130%", duration: 2.2, ease: Power4.easeIn}, '<')

let samuraiMaskTimeline = gsap.timeline({repeat: -1});
let umbrellaTimeline = gsap.timeline({repeat: -1});

samuraiMaskTimeline.to('#samurai-mask', {y: "-=30", rotate: `-=1`, duration: 2, ease: Sine.easeInOut})
samuraiMaskTimeline.to('#samurai-mask', {y: "+=30", rotate: `+=1`, duration: 2, ease: Sine.easeInOut})

umbrellaTimeline.to('#umbrella', {y: "-=20", rotate: `-=3`, duration: 2.7, ease: Sine.easeInOut})
umbrellaTimeline.to('#umbrella', {y: "+=20", rotate: `+=3`, duration: 2.7, ease: Sine.easeInOut})

// Seconda classe

let guitarTimeline = gsap.timeline({repeat: -1});
let bisteccaBottomRightTimeline = gsap.timeline({repeat: -1});

guitarTimeline.to('#guitar', {y: "-=30", rotate: `-=2`, duration: 2, ease: Sine.easeInOut})
guitarTimeline.to('#guitar', {y: "+=30", rotate: `+=2`, duration: 2, ease: Sine.easeInOut})

bisteccaBottomRightTimeline.to('#bistecca-bottomright', {y: "-=30", rotate: `-=3`, duration: 2.5, ease: Sine.easeInOut})
bisteccaBottomRightTimeline.to('#bistecca-bottomright', {y: "+=30", rotate: `+=3`, duration: 2.5, ease: Sine.easeInOut})

let trainTl = gsap.timeline({
  scrollTrigger: {
      trigger:'#secondaclasse__main',
      start:"top bottom-=10px",
  },
  delay: 2,
  repeat: -1,
  repeatDelay: 1,   
})

trainTl.to("#train", {left: "-400%", duration: 9, ease: 'none'});

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
      onEnterBack: function() {
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
rosesTl.to('#horse_2', {top: "-70%", duration: 1, ease: Power4.easeInOut}, '<')
rosesTl.to('#horse_1', {top: "-70%", duration: 1, ease: Power4.easeInOut}, '<')

rosesTl.to('#paperella_sx', {bottom: "10%", duration: 1, ease: Power4.easeInOut}, '<')
rosesTl.to('#paperella_dx', {bottom: "13%", duration: 1, ease: Power4.easeInOut}, '<')

rosesTl.add(function() {
  horseLeftTl.to('#horse_2', {top: "+=3%", duration: 2, ease: Sine.easeInOut})
  horseLeftTl.to('#horse_2', {top: "-=3%", duration: 2, ease: Sine.easeInOut})
  
  horseRightTl.to('#horse_1', {top: "+=4%", duration: 2, ease: Sine.easeInOut})
  horseRightTl.to('#horse_1', {top: "-=4%", duration: 2, ease: Sine.easeInOut})
})

rosesTl.add(function() {
  paperellaLeftTl.to('#paperella_sx', {bottom: "-=3%", rotate: `-=0.2`, duration: 2, ease: Sine.easeInOut})
  paperellaLeftTl.to('#paperella_sx', {bottom: "+=3%", rotate: `+=0.2`, duration: 2, ease: Sine.easeInOut})
  
  paperellaRightTl.to('#paperella_dx', {bottom: "-=2%", rotate: `-=0.4`, duration: 2, ease: Sine.easeInOut})
  paperellaRightTl.to('#paperella_dx', {bottom: "+=2%", rotate: `+=0.4`, duration: 2, ease: Sine.easeInOut})
})

rosesTl.to('#hotel_acceso', {opacity: 1, duration: 2.2, ease: Elastic.easeIn.config(2, 0.3)})

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
        boutiqueHotelTl.reverse()
      }
  },
  onStart: function() {
    horseLeftTl.pause()
    horseRightTl.pause()
    paperellaLeftTl.pause()
    paperellaRightTl.pause()
    console.log('tesss')
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

let pasticceriaGelateriaFloatingTl = gsap.timeline({
  paused: true,
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
  onStart: function() {
  },
  onComplete: function() {
    shopTl.play()
  },
  paused: true,
})

shopTl.to('#scarpa-one__container', {top: "27%", left: "4%", duration: 2.6, ease: Power4.easeOut})
shopTl.to('#scarpa-two__container', {top: "3%", left: "4%", duration: 2.6, ease: Power4.easeOut}, "<")
shopTl.to('#coniglio__container', {top: "0%", right: "0%", duration: 2.6, ease: Power4.easeOut}, "<")
shopTl.to('#moto__container', {right: "0%", duration: 2.6, ease: Power4.easeOut}, "<")

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
areaArredoTl.to('#frame__container', {top: "0", right: "2%", duration: 0.6, ease: Power4.easeOut})
areaArredoTl.to('#lamp-conluce__container', {opacity: 1, duration: 2, ease: Elastic.easeInOut})

$('#zodiac-wrapper a').click(function(event) {
  console.log('clickj')
  scrollToAnchor('#boutique__wrapper', event)
})