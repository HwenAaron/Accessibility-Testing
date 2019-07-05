document.getElementById("testing").innerHTML = "js works to here 1";
document.getElementById("p1").innerHTML = "js works to here 2";

/*
function changeBackground(color) {
   document.body.style.background = color;
}

window.addEventListener("load",function() { changeBackground('green'); });
*/

// 2. Incrementer & decrementer
-----------------------------------------------------------------------------------------


$('[aria-controls="number"]').on('click', function() {
  var button = $(this);
  $('#number').val(function(i, oldval) {
    return button.is('[title*="add"]') ?
      parseInt(oldval, 10) + 10 :
      parseInt(oldval, 10) - 10;
  });
});



// 3
$('.collapsible h3').each(function() {

  var $this = $(this);

  var id = 'collapsible-' + $this.index();

  $this.nextUntil('h3').wrapAll('<div id="'+ id +'" aria-hidden="true">');
  var panel = $this.next();
  $this.wrapInner('<button aria-expanded="false" aria-controls="'+ id +'">');
  var button = $this.children('button');

  button.on('click', function() {
    var state = $(this).attr('aria-expanded') === 'false' ? true : false;
    $(this).attr('aria-expanded', state);
    panel.attr('aria-hidden', !state);
  });

});


// 4
var $container = '.tab-interface';

$($container +' ul').attr('role','tablist');
$($container +' [role="tablist"] li').attr('role','presentation');
$('[role="tablist"] a').attr({
    'role' : 'tab',
    'tabindex' : '-1'
});

$('[role="tablist"] a').each(function() {
  $(this).attr(
    'aria-controls', $(this).attr('href').substring(1)
  );
});


$('[role="tablist"] li:first-child a').attr({
    'aria-selected' : 'true',
    'tabindex' : '0'
});

$($container +' section').attr({
  'role' : 'tabpanel'
});

$($container +' section > *:first-child').attr({
    'tabindex' : '0'
});

$('[role="tabpanel"]:not(:first-of-type)').attr({
  'aria-hidden' : 'true'
});


$('[role="tab"]').on('keydown', function(e) {

  var $original = $(this);
  var $prev = $(this).parents('li').prev().children('[role="tab"]');
  var $next = $(this).parents('li').next().children('[role="tab"]');
  var $target;


  switch (e.keyCode) {
    case 37:
      $target = $prev;
      break;
    case 39:
      $target = $next;
      break;
    default:
      $target = false
      break;
  }

  if ($target.length) {
      $original.attr({
        'tabindex' : '-1',
        'aria-selected' : null
      });
      $target.attr({
        'tabindex' : '0',
        'aria-selected' : true
      }).focus();
  }

  $($container +' [role="tabpanel"]')
    .attr('aria-hidden', 'true');

  $('#' + $(document.activeElement).attr('href').substring(1))
    .attr('aria-hidden', null);

});

$('[role="tab"]').on('click', function(e) {

  e.preventDefault();

  $('[role="tab"]').attr({
    'tabindex': '-1',
    'aria-selected' : null
    });

  $(this).attr({
    'aria-selected' : true,
    'tabindex' : '0'
  });

  $($container +' [role="tabpanel"]').attr('aria-hidden', 'true');

  $('#' + $(this).attr('href').substring(1))
    .attr('aria-hidden', null);

});

// 5
var offline = function() {
  if (!$('#status').hasClass('offline')) {
    $('#status')
      .attr('class', 'offline')
      .text('There\'s no internets. Go to the pub!');
  }
}


var online = function() {
  if (!$('#status').hasClass('online')) {
    $('#status')
      .attr('class', 'online')
      .text('You are online.');
  }
}


function testConnection(url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
      online();
    }
    xmlhttp.onerror = function() {
      offline();
    }
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}


function start() {
  rand = Math.floor(Math.random()*90000) + 20000;
  testConnection('http://heydonworks.com/practical_aria_examples/test_resource.html?fresh=' + rand);
  setTimeout(start, 20000);
}

start();


// 6
$('[data-dialog-call]').on('click', function () {

  var dialog = $('body > dialog');

  var trigger = $(this).attr('id') ? $(this).attr('id') : 'trigger';

  dialog
    .attr({
      'tabindex' : '0',
      'open' : 'true',
      'role' : 'alertdialog',
      'aria-labelledby' : 'd-message'
    });

  var closeText =  $(this).attr('data-dialog-response') ? $(this).attr('data-dialog-response') : 'close';

  dialog.wrapInner('<div><div role="document" tabindex="0"><button role="button">'+ closeText +'</button></div></div>');

  $('<p id="d-message">' + $(this).attr('data-dialog-call') + '</p>')
  .insertBefore(dialog.find('button:first-of-type'));

  $('body > *:not(dialog)').addClass('mod-hidden');

  var close = dialog.find('button:last-of-type');
  $(close).focus();

  var content = dialog.find('[role="document"]');

  var closeDialog = function() {

    dialog.find('p').remove();

    $('body > *:not(dialog)').removeClass('mod-hidden');

  
    $('#' + trigger).focus();

    if ($('#' + trigger).attr('id') === 'trigger') {
      $('#' + trigger).attr('id', null);
    }

    dialog.removeAttr('open role aria-describedby tabindex');

    dialog.empty();

    $(dialog).off('keypress.escape');

  }

  $(close).on('click', function() {
    closeDialog();
  });


  $(dialog).on('keypress.escape', function(e) {
    if (e.keyCode == 27) {
      closeDialog();
    }
  });

  $(close).on('keydown', function(e) {
    if ((e.keyCode || e.which) === 9) {
        content.focus();
        e.preventDefault();
    }
  });

});

//7

$('[role="toolbar"] [data-sort]').on('click', function() {

  if ($(this).attr('aria-pressed', 'false')) {

    var listToSort = $('#' + $(this).parent().attr('aria-controls'));
    var listItems = listToSort.children();
    var array = [];

    for (var i = 0, l = $(listItems).length; i < l; i++) {
      array.push($(listItems[i]).text());
    }

    if ($(this).attr('data-sort') === 'ascending') {
      array.sort();
      console.log(array);
    }

    if ($(this).attr('data-sort') === 'descending') {
      array.sort();
      array.reverse();
      console.log(array);
    }

    for(var i = 0, l = $(listItems).length; i < l; i++) {
      listItems[i].innerHTML = array[i];
    }

    $(this).siblings().attr('aria-pressed', 'false');
    $(this).attr('aria-pressed', 'true');

  }

});

$('[role="toolbar"] [data-sort]').on('keydown', function(e) {

  var $newButton;
  var $nextButton = $(this).next();
  var $prevButton = $(this).prev();
  var $listToSort = $('#' + $(this).parent().attr('aria-controls'));

  switch (e.keyCode) {
    case 37:
      $newButton = $prevButton;
      break;
    case 39:
      $newButton = $nextButton;
      break;
    default:
      $newButton = false;
      break;
  }

  if ($newButton.length) {
    $newButton.focus();
  }

  if (e.keyCode === 9) {
    if (!e.shiftKey) {
      e.preventDefault();
      $listToSort.focus();
    }
  }

});

