function setupColorPicker($) {
  function showColor($colorEle) {
    var name = $colorEle.text();
    var color = tinycolor($colorEle.css('background-color'));

    $pane.css('background-color', color.getOriginalInput());
    if($colorEle.hasClass('white')) {
      $pane.addClass('white');
    } else {
      $pane.removeClass('white'); 
    }

    $pane.children().remove();
    $pane
      .append('<p>var(--'+name+')</p>')
    if(name !== 'transparent' && name !== '') {
      $pane
        .append('<p>'+color.toRgbString()+'</p>')
        .append('<p>'+color.toHslString()+'</p>')
        .append('<p>'+color.toHexString()+'</p>')
    }
  }

  var $picker = $("[data-component=color-picker]");
  var $pane = $("[data-component=color-pane]");
  var selectedColor = null;

  $picker.on('mouseenter', 'p', function () {
    if(selectedColor !== null) {
      return false;
    }
    showColor($(this));
  });

  $picker.on('click', 'p', function () {
    showColor($(this));
    if(selectedColor) {
      $(selectedColor).css('box-shadow', 'none');
    }
    if(selectedColor === this) {
      selectedColor = null;
    } else {
      selectedColor = this;
      $(selectedColor).css('box-shadow', 'inset 0px 0px 0px 2px #000');
    }
  });
}

jQuery(document).ready(function () {
  setupColorPicker(jQuery);
});
