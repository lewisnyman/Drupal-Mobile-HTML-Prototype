$(document).ready(function(){ ready(); }); // call function after DOM is ready to use (before load event fires)

function ready() {
var adminlinks = $('.admin-list .leaf a');

if ( Modernizr.csstransforms ) {

window.slider = new Swipe(
  document.getElementById('wrapper'), {
  callback: function(e, pos) {
    setCurrentSlide();
  },
  }
); 

$('.current .toolbar #close').live('click', function(event) {
  if(!isTouch()) {
    var href = $(this).attr('href');
    window.location = href;  
  }
  event.preventDefault();
}).live('tap', function(){ 
 var href = $(this).attr('href');
 window.location = href;  
 
});
  
  adminlinks
    .live('click', function(event) {
      if(!isTouch()) {
        //history.pushState({ path: this.path }, '', this.href);
        $(this).loadNextPage();
      }
      event.preventDefault();
    })
    .live('tap', function(){ 
      $(this).loadNextPage();
    })
    .live('swipeRight', function(){
        //console.log("Swipe");
    });
  
    $(window).bind('popstate', function() {
      slider.prev();
    })
}
else {
  alert("Hi. So I've been told your browser does not support CSS transforms. The fancy navigation with one to one gestures have been disabled. You can still browse the prototype but it will be missing some good features. I recommend downloading a more capable browser if possible or grabbing the iPhone/Opera emulator.");
}



}

Zepto.fn.loadNextPage = function() {
  var o = $(this[0]) // It's your element
  var href = o.attr('href');
  var url = href + '/ #wrapper';
  var nextpage = $('.slider > li.current + li');
 if (nextpage.length == 0) {//Create a new li if we need one
    addNewStep(href, function() {
    nextpage = $('.slider > li.current + li');  
  });
 } 
 $('body').addClass('ui-loading');
  nextpage.load(url, function() {
     $('body').removeClass('ui-loading');
    slider.next();
    window.scroll(0, 0); 
    removeFutureSteps();
  })

};

function addNewStep(url,callback) {
  $(".slider").append('<li data-url="' + url + '"></li>');
  slider.setup();
  callback();
}

function removeFutureSteps() {
   var pos = slider.getPos();
   $('.slider > li').each(function(index) {
       if(index > pos) {
         $(this).remove();
       }
   });
   slider.setup();
}

function setCurrentSlide() {
  var pos = slider.getPos();
  pos++;
  var currentslide = $('.slider > li:nth-child(' + pos + ')');
  $('.slider > li').removeClass('current');
  currentslide.addClass('current');
  var url = currentslide.attr('data-url');
  history.pushState({ path: url }, '', url);
}


function isTouch() {
  return (Modernizr.touch)
}