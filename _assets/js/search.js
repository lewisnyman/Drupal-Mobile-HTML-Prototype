$(document).ready(function(){ 
  search.main(); 
}); 

//GLOBALS
var tree = new Array;

templates = {
 searchResult : "<li class='leaf result {{category}}'><a href='{{url}}'>{{name}}</a></li>",
 }

search.main= function() {
  constructNavTree();
  searchSetup();
}

function constructNavTree() {
var nothing = "javascript:alert('Currently this does nothing. It's a cool idea though right?')";
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
  window.tree.push(new leaf('Content Translation','/modules','module'));
  window.tree.push(new leaf('Contact','/modules','module'));
  window.tree.push(new leaf('Contextual Links','/modules','module'));
  window.tree.push(new leaf('Dashboard','/modules','module'));
  window.tree.push(new leaf('Database logging','/modules','module'));
  window.tree.push(new leaf('Field','/modules','module'));
  window.tree.push(new leaf('Field SQL storage','/modules','module'));
  window.tree.push(new leaf('Field UI','/modules','module'));
  window.tree.push(new leaf('File','/modules','module'));
  window.tree.push(new leaf('Filter','/modules','module'));
  window.tree.push(new leaf('Forum','/modules','module'));
  window.tree.push(new leaf('Help','/modules','module'));
  window.tree.push(new leaf('Image','/modules','module'));
  window.tree.push(new leaf('List','/modules','module'));
  window.tree.push(new leaf('Locale','/modules','module'));
  window.tree.push(new leaf('Menu','/modules','module'));
  window.tree.push(new leaf('Node','/modules','module'));
  window.tree.push(new leaf('Number','/modules','module'));
  window.tree.push(new leaf('OpenID','/modules','module'));
  window.tree.push(new leaf('Options','/modules','module'));
  window.tree.push(new leaf('Overlay','/modules','module'));
  window.tree.push(new leaf('Path','/modules','module'));
  window.tree.push(new leaf('PHP filter','/modules','module'));
  window.tree.push(new leaf('Poll','/modules','module'));
  window.tree.push(new leaf('RDF','/modules','module'));
  window.tree.push(new leaf('Search','/modules','module'));
  window.tree.push(new leaf('Shortcut','/modules','module'));
  window.tree.push(new leaf('Statistics','/modules','module'));
  window.tree.push(new leaf('Syslog','/modules','module'));
  window.tree.push(new leaf('System','/modules','module'));
  window.tree.push(new leaf('Taxonomy','/modules','module'));
  window.tree.push(new leaf('Testing','/modules','module'));
  window.tree.push(new leaf('Text','/modules','module'));
  window.tree.push(new leaf('Toolbar','/modules','module'));
  window.tree.push(new leaf('Tracker','/modules','module'));
  window.tree.push(new leaf('Trigger','/modules','module'));
  window.tree.push(new leaf('Update Manager','/modules','module'));
  window.tree.push(new leaf('User','/modules','module'));
  
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
  
  window.tree.push(new leaf('Clear cache',nothing,'drush'));//DRUSH LITE :D
  window.tree.push(new leaf('Image flush',nothing,'drush'));
  window.tree.push(new leaf('Update database',nothing,'drush'));
  window.tree.push(new leaf('Project disable ...',nothing,'drush'));
  window.tree.push(new leaf('Project download ...',nothing,'drush'));  
  window.tree.push(new leaf('Project enable ...',nothing,'drush'));
  window.tree.push(new leaf('Project uninstall ...',nothing,'drush'));
  window.tree.push(new leaf('Project update ...',nothing,'drush'));
  window.tree.push(new leaf('Run cron',nothing,'drush'));  
}

function leaf(name, url, category, altnames) {  
  this.name = name;  
  this.url = url;  
  this.category = category;  
  this.altnames = altnames;
}  

function searchSetup() {
  $('.slider .current .toolbar .toolbar-menu .action-links #search').live("tap",function() {
  activateSearch();
 }).live('click', function(event) {
   if(!isTouch()) {
     activateSearch();
   }
 });
  
$('.slider .current .toolbar .search-form .action-links #cancel').live("tap",function(event) {
  toggleSearch();
  event.preventDefault();
}).live('click', function(event) {
  if(!isTouch()) {
    toggleSearch();
  }
  event.preventDefault();
});

}

function activateSearch() {
  var pageheight = $('.slider .current .page').height();
  $('.slider .current .search-results').css('min-height', pageheight);  
   $('.slider .current .search-form input[type="search"]').val('').focus().keyup(function() {
     getSearchResults($(this));
   });
   toggleSearch(); 
}

function toggleSearch() {
  window.scroll(0, 0);
  $('.slider .current  .toolbar').toggleClass('search-active');
$('.slider .current .search-results').html('').toggleClass('active')
}

function getSearchResults(input) {
  var term = input.val();
  var matches;
  if (term.length > 0) {
    matches = getIndexes(window.tree,term);
    var results = $('.slider .current .search-results');
    var output = buildSearchResults(matches, term);
    results.html(output);
  }
};

function buildSearchResults(matches, term) {
  if (matches.length) {
    var onpage = "";
    var output = "<ul class='admin-list'>";
    var path = window.location.pathname;
    
    $(matches).each(function(i) {
      matchid = matches[i];
      el = window.tree[matchid];
      //var urlArray = el.url.split('/');
      //var url = constructParentUrl(urlArray);
      if(el.url == path) {
        onpage += Mustache.render(templates.searchResult, el);//If it on the same page add it to another string
      } else {
        output += Mustache.render(templates.searchResult, el);
      }
    });
    output += "</ul>";
    if(onpage != "") {
      onpage = "<h2>Current page</h2><ul class='admin-list'>" + onpage + "</ul>";
      output = onpage + "<h2>Elsewhere</h2>" + output;
    }
  }
  else {
    output = '<p>No Results &#8212; <a target="_blank" href="http://drupal.org/search/apachesolr_multisitesearch/'+ term + '">Search Drupal.org for ' + term + '?</a></p>';
  }
  return output;
}

function constructParentUrl(array){
  var url = "";
  for ( i = 0; pathArray.length -1; i++ ) {
    newPathname += "/";
    newPathname += pathArray[i];
  }
  return url;
}

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