$(document).ready(function(){ ready(); }); // call function after DOM is ready to use (before load event fires)

function ready() {
var adminlinks = $('.admin-list .leaf a');

window.slider = new Swipe(
  document.getElementById('wrapper')
);

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
    history.pushState({ path: this.path }, '', this.href);
    $(this).loadNextPage();
  })
  .live('swipeRight', function(){
      //console.log("Swipe");
  });

  $(window).bind('popstate', function() {
  slider.prev();
  })

}

Zepto.fn.loadNextPage = function() {
  var o = $(this[0]) // It's your element
  var url = o.attr('href');
      console.log('Loading ' + url);
  var nextpage = $('.slider li.current + li');
  nextpage.load(url, function() {
    console.log('Loaded ' + url);
      slider.next();
      var pos = slider.getPost();
      $('.slider li').removeClass('current');
      $('.slider li:eq(' + pos + ')').addClass('current');
  })

};


function isTouch() {
  return ('ontouchstart' in window)
}