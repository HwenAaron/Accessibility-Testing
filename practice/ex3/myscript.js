document.getElementById("testing").innerHTML = "js script begins";

/* 3. Progressive collapsibles
-----------------------------------------------------------------------------------------
*/

$('.collapsible h3').each(function() {

  var $this = $(this);

  // create unique id for a11y relationship

  var id = 'collapsible-' + $this.index();

  // wrap the content and make it focusable

  $this.nextUntil('h3').wrapAll('<div id="'+ id +'" aria-hidden="true">');
  var panel = $this.next();

  // Add the button inside the <h2> so both the heading and button semanics are read

  $this.wrapInner('<button aria-expanded="false" aria-controls="'+ id +'">');
  var button = $this.children('button');

  // Toggle the state properties

  button.on('click', function() {
    var state = $(this).attr('aria-expanded') === 'false' ? true : false;
    $(this).attr('aria-expanded', state);
    panel.attr('aria-hidden', !state);
  });

});

document.getElementById("p1").innerHTML = "js script end";

