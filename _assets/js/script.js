$(document).ready(function(){ ready(); }); // call function after DOM is ready to use (before load event fires)

function ready() {
var adminlinks = $('.admin-list .leaf a, .current .toolbar #add');
var deletelink = $('.current .toolbar #delete');
var tabs = $('.tabs li a');
if ( Modernizr.csstransforms ) {
window.slider = new Swipe(
  document.getElementById('wrapper'), {
  callback: function(e, pos) {
    setCurrentSlide();
  },
  }
);

$('.current .toolbar #bulk').live('click', function(event) {
  if(!isTouch()) {
    bulkEditPage();
  }
  event.preventDefault();
}).live('tap', function(){ 
     bulkEditPage();  
});

$('.current .toolbar ul.action-links.bulk #cancel').live('click', function(event) {
  if(!isTouch()) {
     disableBulkEdit();
  }
  event.preventDefault();
}).live('tap', function(){ 
      disableBulkEdit(); 
});


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

deletelink
  .live('click', function(event) {
    if(!isTouch()) {
      if (confirm("Delete Item?")) {
        slider.prev();
      }
    }
    event.preventDefault();
  })
  .live('tap', function(){ 
      if (confirm("Delete Item?")) {
        slider.prev();
      }
  });
  
  adminlinks
    .live('click', function(event) {
      if(!isTouch()) {
        $(this).loadNextPage();
      }
      event.preventDefault();
    })
    .live('tap', function(){ 
      $(this).loadNextPage();
    });
  
    $(window).bind('popstate', function() {
      slider.prev();
      return false;
    })
}
else {
  alert("Hi. So I've been told your browser does not support CSS transforms. The fancy navigation with one to one gestures have been disabled. You can still browse the prototype but it will be missing some good features. I recommend downloading a more capable browser if possible or grabbing the iPhone/Opera emulator.");
}

tabs
.live('click', function(event) {
  if(!isTouch()) {
    $(this).loadInPage();
  }
  event.preventDefault();
})
.live('tap', function(){ 
    $(this).loadInPage();
});
}

Zepto.fn.loadInPage = function() {
  var o = $(this[0]) // It's your element
  var href = o.attr('href');
  var url = href + '/ #wrapper';
  var currentPage = $('.slider > li.current'); 
  $('body').addClass('ui-loading');
  currentPage.load(url, function() {
    $('body').removeClass('ui-loading'); 
    removeFutureSteps();
  });
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
 else {
   nextpage.attr('data-url', href);
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

function bulkEditPage() {
 //window.slider.onTouchStart = function(){ console.log('swiping disabled');};//Disable scrolling
 $('.current .toolbar ul.action-links').hide();//Hide all toolbar button but the bulk flow ones.
 $('.current .toolbar ul.action-links.bulk').show();
 checkbox = "<div class='animated bulk-select'><input type='checkbox' /></div>";
 $('.current .admin-list .leaf').addClass('draggable');
  setOffsets();
 $('.current .admin-list .leaf a').each(function(index) {
     $(this).prepend(checkbox);
 });
}

function disableBulkEdit() {
  $('.current .toolbar ul.action-links').show();
  $('.current .toolbar ul.action-links.bulk').hide();
  $('.current .admin-list .leaf a .bulk-select').remove();
   $('.current .admin-list .leaf').removeClass('draggable');
}


function isTouch() {
  return (Modernizr.touch)
}