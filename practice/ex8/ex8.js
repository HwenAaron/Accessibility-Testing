document.getElementById("testing").innerHTML = "js works to here 1";


$('[role="navigation"] ul ul').prev('a')
  .attr('aria-haspopup', 'true')
  .append('<span aria-hidden="true"> &#x25be;</span>');

var showSubmenu = function(dropdown) {
  dropdown.attr('aria-hidden', 'false');
};

var hideSubmenu = function(dropdown) {
  dropdown.attr('aria-hidden', 'true');
};

$('.with-dropdowns > li > a').on('focus', function(e) {
  hideSubmenu($('[aria-label="submenu"]'));
});

$('[aria-haspopup]').on('click', function(e) {
  var submenu = $(this).next();
  showSubmenu(submenu);
  //$(submenu).find('li:first-child a').focus();
  return false;
});

$('[aria-haspopup]').hover(function() {
  showSubmenu($(this).next());
  $(this).off('click');
});

$('[aria-haspopup]').parents('li').mouseleave(function() {
  hideSubmenu($(this).find('[aria-label="submenu"]'));
});

document.getElementById("p1").innerHTML = "js works to here 2";
