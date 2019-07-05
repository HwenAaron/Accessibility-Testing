document.getElementById("testing").innerHTML = "js works to here 1";

/* 6. Warning dialog
-----------------------------------------------------------------------------------------
*/

$('[data-dialog-call]').on('click', function () {

  // define the dialog element
  var dialog = $('body > dialog');

  // record the trigger element
  var trigger = $(this).attr('id') ? $(this).attr('id') : 'trigger';

  // open dialog and add roles
  dialog
    .attr({
      'tabindex' : '0',
      'open' : 'true',
      'role' : 'alertdialog',
      'aria-labelledby' : 'd-message'
    });

  // retrieve custom close button wording, if any
  var closeText =  $(this).attr('data-dialog-response') ? $(this).attr('data-dialog-response') : 'close';

  // build the dialog markup
  dialog.wrapInner('<div><div role="document" tabindex="0"><button role="button">'+ closeText +'</button></div></div>');

  // Insert the message held in the trigger's [data-dialog-msg] attribute
  $('<p id="d-message">' + $(this).attr('data-dialog-call') + '</p>')
  .insertBefore(dialog.find('button:first-of-type'));

  // hide and make unfocusable all other elements
  $('body > *:not(dialog)').addClass('mod-hidden');

  // make last button in dialog the close button
  var close = dialog.find('button:last-of-type');
  $(close).focus();

  var content = dialog.find('[role="document"]');

  var closeDialog = function() {

    dialog.find('p').remove();

    $('body > *:not(dialog)').removeClass('mod-hidden');

    //set focus back to element that triggered dialog

    $('#' + trigger).focus();

    // If we manufactured the ID, remove it
    if ($('#' + trigger).attr('id') === 'trigger') {
      $('#' + trigger).attr('id', null);
    }

    // remove dialog attributes and empty dialog
    dialog.removeAttr('open role aria-describedby tabindex');

    dialog.empty();

    $(dialog).off('keypress.escape');

  }

  // run closeDialog() on click of close button
  $(close).on('click', function() {
    closeDialog();
  });

  // also run closeDialog() on ESC

  $(dialog).on('keypress.escape', function(e) {
    if (e.keyCode == 27) {
      closeDialog();
    }
  });

  // Refocus dialog if user tries to leave it

  $(close).on('keydown', function(e) {
    if ((e.keyCode || e.which) === 9) {
        content.focus();
        e.preventDefault();
    }
  });

});

document.getElementById("p1").innerHTML = "js works to here 2";



