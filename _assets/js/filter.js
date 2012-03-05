$(document).ready(function(){ 
  //filter.main(); 
}); 


filter.main = function() {
  filterlink = $('.current .toolbar #delete');
  
  filterlink
  .live('click', function(event) {
    if(!isTouch()) {
     $this = $(this);
     filter.getAttributes($this);
    }
    event.preventDefault();
  })
  .live('tap', function(){ 
     $this = $(this);
     filter.getAttributes($this);
   });
  
}


filter.getAttributes = function($this) {
  var dataAttributes = $this.attr('data-attributes');
  var attributes = dataAttributes.split(',')
  filter.list(attributes); 
}

filter.list = function(attributes) {
  var output = '<select id="filter-options">';
  for ( i = 0; attributes.length -1; i++ ) {
    output += '<option value="'+ attributes[i] + '">' +
attributes[i] + '</select>';
  }

}