$(document).ready(function(){ 
  dragndrop.main(); 
}); 

dragndrop = Object;

dragndrop.main = function() {
  setOffsets();
  $('.draggable').live("touchstart touchmove", function(e) {
    e.preventDefault();//Disable scrolling  
    var y = e.changedTouches[0].pageY;
    $(this).addClass('drag');
    height = $(this).height();
    offset = $(this).attr('data-original-offset');
    $(this).css('-webkit-transform', 'translate3d(0,' + (y - (height / 2) - offset) + 'px, 0) scale(1)');
    
  });
 $('.draggable').live('touchend', function(e) {
   offset = $(this).offset();
   elements = $('.draggable');
   elementAfter = findElementAfter(elements, offset.top);
   html = $(this).html();
   elementAfter.before('<li class="leaf draggable">' + html + '</li>')
   $(this).remove();
   setOffsets();
 });
}

function setOffsets() {
  $('.draggable').each(function() {
    offset = $(this).offset();
    $(this).attr('data-original-offset', offset.top);
  });
}

function findElementAfter(elements, position) {
  found = null;
  elements.each(function(index) {
    myOffset = $(this).attr('data-original-offset');
    if((myOffset > position) && (found == null)) {
      found = $(this);
    }
  });
  return found;
}