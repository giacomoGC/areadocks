//opacity 0.8
//opacity 1
//opacity 0.1
//opacity 1 + sky bg

var masterTimeline = gsap.timeline({});
var introTimeline = gsap.timeline({});
var leavesTimeline = gsap.timeline({});

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
  $('#zodiac-wrapper').width(worldImageWidth);
  // $('.scrollSectionsAfterHero').css('display', 'block');
  // $('#hero').css('padding-right', '0');
  // $('#hero').css('width', '100%');
})

introTimeline.to("#zodiac-wrapper", {duration: 1.5, delay: 0, ease: Power3.easeInOut, autoAlpha: 1, bottom: 0, scale: 1});

masterTimeline.add(introTimeline);

$(document).ready(function() {
  masterTimeline.play();
  gsap.to("#leaves .leaves__img:nth-child(8)", {rotation:"7_short", duration: 10, repeat: -1, yoyo: true, delay: 0.1, ease: Elastic.easeOut});
  gsap.to("#leaves .leaves__img:nth-child(7)", {rotation:"356_short", duration: 10, repeat: -1, yoyo: true, delay: 0.1, ease: Elastic.easeOut});
  gsap.to("#leaves .leaves__img:nth-child(6)", {rotation:"355_short", duration: 10, repeat: -1, yoyo: true, delay: 0.1, ease: Elastic.easeOut});

  gsap.to("#leaves .leaves__img:nth-child(5)", {rotation:"353_short", duration: 10, repeat: -1, yoyo: true, delay: 0.1, ease: Elastic.easeOut});

  gsap.to("#leaves .leaves__img:nth-child(4)", {rotation:"6_short", duration: 10, repeat: -1, yoyo: true, delay: 0.1, ease: Elastic.easeOut});
  gsap.to("#leaves .leaves__img:nth-child(3)", {rotation:"7_short", duration: 10, repeat: -1, yoyo: true, delay: 0.1, ease: Elastic.easeOut});
  gsap.to("#leaves .leaves__img:nth-child(2)", {rotation:"357_short", duration: 10, repeat: -1, yoyo: true, delay: 0.1, ease: Elastic.easeOut});
})

// Scroll animations

// var leavesScrollTimeline = gsap.timeline({
//   scrollTrigger: "scrollSectionsAfterHero",
// });

// leavesScrollTimeline.to(window, {
//   scrollTo:"#leaves", 
//   duration: 4,
//   ease: Power3.easeOut
// });

// leavesScrollTimeline.to(window, {
//   scrollTo:"#loftRestaurant", 
//   duration: 4,
//   delay: 4,
//   ease: Power3.easeInOut
// });

//

ScrollTrigger.create({
  trigger: '#leaves',
  start: 'top bottom',
  endTrigger: '#leaves',
  end: 'bottom bottom',
  
  snap: {
    snapTo: 1,
    duration: {min: 1, max: 3}, // the snap animation should be at least 0.25 seconds, but no more than 0.75 seconds (determined by velocity)
    delay: 0.1, // wait 0.125 seconds from the last scroll event before doing the snapping
    ease: "power3.inOut" // the ease of the snap animation ("power3" by default)
  }
})

ScrollTrigger.create({
  trigger: '#loftRestaurant',
  start: 'top bottom',
  endTrigger: '#loftRestaurant',
  end: 'bottom bottom',
  
  snap: {
    snapTo: 1,
    duration: {min: 1, max: 3}, // the snap animation should be at least 0.25 seconds, but no more than 0.75 seconds (determined by velocity)
    delay: 0.1, // wait 0.125 seconds from the last scroll event before doing the snapping
    ease: "power3.inOut" // the ease of the snap animation ("power3" by default)
  }
})

ScrollTrigger.create({
  trigger: '#pizza',
  start: 'top bottom',
  endTrigger: '#pizza',
  end: 'bottom bottom',
  
  snap: {
    snapTo: 1,
    duration: {min: 1, max: 3}, // the snap animation should be at least 0.25 seconds, but no more than 0.75 seconds (determined by velocity)
    delay: 0.1, // wait 0.125 seconds from the last scroll event before doing the snapping
    ease: "power3.inOut" // the ease of the snap animation ("power3" by default)
  }
})