$(document).ready(function(){ ready(); }); // call function after DOM is ready to use (before load event fires)

function ready() {
var adminlinks = $('.admin-list .leaf a');
adminlinks
  .live('click', function(event) {
    if(!isTouch()) {
      console.log("Not touch");
      history.pushState({ path: this.path }, '', this.href);
      $(this).loadNextPage();
    }
    event.preventDefault();
  })
  .live('tap', function(){ 
    console.log("Tap");
    adminlinks.die('tap');
    history.pushState({ path: this.path }, '', this.href);
    $(this).loadNextPage();
  })
  .live('swipeRight', function(){
      //console.log("Swipe");
  });

$(window).bind('popstate', function() {
 loadPrevPage(location.pathname);
})

}



function loadPrevPage(url){
    var page = url + '/ #page';
    var prevpage = createDiv('prevpage','page empty slide');
       console.log("Loading " + page);
   window.scroll(0, 0);
   $('body').addClass('ui-loading');
 $('#prevpage').load(page, function() { 
     console.log("Loaded " + page); 
      $('#prevpage').addClass('out reverse');
      $('#page').addClass('in reverse');
      $('body').removeClass('ui-loading'); 
      $('#prevpage').cleanupclasses();//Tidy up time
      $('#nextpage').remove();
      $('#page').attr('id', 'nextpage');
      $('#prevpage').attr('id', 'page');
      ready();
  });

}  

Zepto.fn.loadNextPage = function() {
    var o = $(this[0]) // It's your element
    var url = o.attr('href');
    var page = url + '/ #page';
   var nextpage = createDiv('nextpage','page empty slide');
   $('#nextpage').remove();
   $('#page').after(nextpage);
   var $nextpage = $('#nextpage');
    console.log("Loading " + page);
    window.scroll(0, 0); 
    $('body').addClass('ui-loading');
    
    $nextpage.load(page, function() {
      console.log("Loaded " + page);
      $('#page').addClass('out');
      $nextpage.addClass('in');
      $('body').removeClass('ui-loading'); 
       $nextpage.cleanupclasses();//Tidy up time
       $('#prevpage').remove();
       $nextpage.attr('id', 'page');
       $('#page').attr('id', 'prevpage');
       ready();
     }); 
};

function createDiv(id,cssclass) {
  var div = document.createElement('div');
  div.setAttribute('id', id); 
  div.setAttribute('class', cssclass); 
  return div;
}

Zepto.fn.cleanupclasses = function() {
   var o = $(this[0]);
   o.removeClass('empty');
}

function isTouch() {
  return ('ontouchstart' in window)
}