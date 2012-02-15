$(document).ready(function(){ 
  main(); 
}); 

//GLOBALS
var tree = new Array;

templates = {
 searchResult : "<li class='leaf result {{category}}'><a href='{{url}}'>{{name}}</a></li>",
 }

function main() {
  constructNavTree();
  searchSetup();
}

function constructNavTree() {
  window.tree.push(new leaf('Admin','/admin','navigation'));//ROOT
  
  window.tree.push(new leaf('Content','/content','navigation'));//CONTENT
  window.tree.push(new leaf('Add Content','/content/add','creation'));
  window.tree.push(new leaf('List Content','/content/list','navigation'));
  window.tree.push(new leaf('Erat El Nimis Zelus','/content/list','content'));
  window.tree.push(new leaf('Augue Letalis','/content/list','content'));
  window.tree.push(new leaf('Luctus Vicis','/content/list','content'));
  window.tree.push(new leaf('Jus Praemetto Venio','/content/list','content'));
  window.tree.push(new leaf('List Comments','/content/comments','navigation'));
  
  
  window.tree.push(new leaf('Structure','/structure','navigation'));//STRUCTURE
  
  window.tree.push(new leaf('Content types','/structure/content-types','navigation'));
  window.tree.push(new leaf('Add content type','/structure/content-types/add','creation'));
  window.tree.push(new leaf('List content type','/structure/content-types/list','navigation'));
  
  window.tree.push(new leaf('Menus','/structure/menu','navigation'));
  window.tree.push(new leaf('Add Menu','/structure/menu/add','creation'));
  window.tree.push(new leaf('List Menus','/structure/menu/list','navigation'));
  window.tree.push(new leaf('Main Menu','/structure/menu/list','menu'));
  window.tree.push(new leaf('Management','/structure/menu/list','menu'));
  window.tree.push(new leaf('Navigation','/structure/menu/list','menu'));
  window.tree.push(new leaf('User menu','/structure/menu/list','menu'));

  window.tree.push(new leaf('Taxonomy','/structure/taxonomy','navigation'));
  window.tree.push(new leaf('Add Vocabulary','/structure/taxonomy/add','creation'));
  window.tree.push(new leaf('List Vocabulary','/structure/taxonomy/add','navigation'));
  

  window.tree.push(new leaf('Appearance','/appearance','navigation', 'Themes'));//THEMES
  window.tree.push(new leaf('Bartik','/appearance','theme'));
  window.tree.push(new leaf('Seven','/appearance','theme'));
  window.tree.push(new leaf('Garland','/appearance','theme'));
  window.tree.push(new leaf('Stark','/appearance','theme'));
  
  window.tree.push(new leaf('People','/people','navigation', 'Users'));//PEOPLE
  window.tree.push(new leaf('Add user','/people/add','creation'));
  window.tree.push(new leaf('List users','/people/list','navigation'));
  window.tree.push(new leaf('prtici8k','/people/list','people'));
  window.tree.push(new leaf('claudeddt','/people/list','people'));
  window.tree.push(new leaf('peggyhokk','/people/list','people'));
  window.tree.push(new leaf('amypeterm','/people/list','people'));
  window.tree.push(new leaf('Permissions','/people/permissions','configuration'));
  window.tree.push(new leaf('Roles','/people/roles','navigation'));
  
  
  window.tree.push(new leaf('Modules','/modules','navigation'));//MODULES
  window.tree.push(new leaf('Aggregator','/modules','module'));
  window.tree.push(new leaf('Block','/modules','module'));
  window.tree.push(new leaf('Book','/modules','module'));
  window.tree.push(new leaf('Color','/modules','module'));
  window.tree.push(new leaf('Comment','/modules','module'));
  
  window.tree.push(new leaf('Configuration','/configuration','navigation'));//Configuration
  window.tree.push(new leaf('People - Account Settings','/configuration','configuration'));
  window.tree.push(new leaf('People - IP address blocking','/configuration','configuration'));
  window.tree.push(new leaf('Content authoring - Text formats','/configuration','configuration'));
  window.tree.push(new leaf('Content authoring - Wysiwyg profiles','/configuration','configuration'));
  window.tree.push(new leaf('Media - File system','/configuration','configuration'));
  window.tree.push(new leaf('Media - Image styles','/configuration','configuration'));
  window.tree.push(new leaf('Media - Image toolkit','/configuration','configuration'));
  window.tree.push(new leaf('Search - Search settings','/configuration','configuration'));
  window.tree.push(new leaf('URLs - URL aliases','/configuration','configuration'));
  window.tree.push(new leaf('URLs - Clean URLs','/configuration','configuration'));
  window.tree.push(new leaf('Regional - Regional settings','/configuration','configuration'));
  window.tree.push(new leaf('Regional - Date and time','/configuration','configuration'));
  window.tree.push(new leaf('System - Site information','/configuration','configuration'));
  window.tree.push(new leaf('System - Statistics','/configuration','configuration'));
  window.tree.push(new leaf('System - Actions','/configuration','configuration'));
  window.tree.push(new leaf('System - Cron','/configuration','configuration'));
  window.tree.push(new leaf('UI - Shortcuts','/configuration','configuration'));
  window.tree.push(new leaf('Development - Performance','/configuration','configuration'));
  window.tree.push(new leaf('Development - Logging and errors','/configuration','configuration'));
  window.tree.push(new leaf('Development - Maintenance mode','/configuration','configuration'));
  window.tree.push(new leaf('Development - Devel settings','/configuration','configuration'));
  window.tree.push(new leaf('Web services - RSS publishing','/configuration','configuration'));
}

function leaf(name, url, category, altnames) {  
  this.name = name;  
  this.url = url;  
  this.category = category;  
  this.altnames = altnames;
}  

function searchSetup() {//Add mark up and stuff
  var html = "<div class='search-form'><input placeholder='Search' type='search' /><ul class='action-links'><li><a id='cancel'>Cancel</a></li></ul></div>";
  $('.slider .current #toolbar .toolbar-menu .action-links #search').click(function() {
    var pageheight = $('.slider .current .page').height();
    window.scroll(0, 0);
    $('.slider .current #toolbar').addClass('search-active');
    $('.slider .current .search-results').html('').addClass('active').css('min-height', pageheight);
    $('.slider .current .search-form input[type="search"]').val('').focus().keyup(function() {
      getSearchResults($(this));
    });
  });
$('.slider .current #toolbar .search-form .action-links #cancel').click(function() {
  window.scroll(0, 0);
  $('.slider .current  #toolbar').removeClass('search-active');
  $('.slider .current .search-results').removeClass('active');
});
}

function getSearchResults(input) {
  var term = input.val();
  var matches;
  if (term.length > 0) {
    matches = getIndexes(window.tree,term);
  }
  var results = $('.slider .current .search-results');
  if (matches.length) {
    var output = "<ul class='admin-list'>";
    $(matches).each(function(i) {
      matchid = matches[i];
      el = window.tree[matchid];
      output += Mustache.render(templates.searchResult, el);
    });
    output += "</ul>";
  }
  else {
    output = 'No Results';
  }
  results.html(output);
};

function getIndexes(array,what) {
    var indexes = [], what = ' ' + what.toLowerCase();
    if (!what.length)
      return indexes;
    $(array).each(function(index) {
      var branch = array[index];
      var name = ' ' + branch.name.toLowerCase();
      if (name.indexOf(what) !== -1) {
          indexes.push(index);
      }
    });
    return indexes;
}