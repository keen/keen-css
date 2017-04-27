function setupColorPicker($) {
  function showColor($colorEle) {
    var name = $colorEle.text();
    var color = tinycolor($colorEle.css('background-color'));
    var $bgTargets = $('[data-color-bg]');
    var $nameTargets = $('[data-color-name]');
    var $colorTargets = $('[data-color]');

    $pane.css('background-color', color.getOriginalInput());
    $bgTargets.css('background-color', color.getOriginalInput());
    if($colorEle.hasClass('white')) {
      $pane.addClass('white');
      $bgTargets.addClass('white');
    } else {
      $pane.removeClass('white'); 
      $bgTargets.removeClass('white');
    }

    $pane.children().remove();
    $nameTargets.text(name);
    $pane.append('<p>var(--'+name+')</p>')
    if(name !== 'transparent' && name !== '') {
      $pane
        .append('<p>'+color.toRgbString()+'</p>')
        .append('<p>'+color.toHslString()+'</p>')
        .append('<p>'+color.toHexString()+'</p>')
    }

    $colorTargets.css('color', color.getOriginalInput());
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

  $picker.find('p.bg-blue').mouseenter();
}

function setupPositioningPlayground($) {
  var $playground = $('[data-component=pos-play]')
  var $character = $('[data-component=pos-char]');
  var baseClass = $character.get(0).className;
  var currentVertical = 'top-0';
  var currentHorizontal = 'left-0';
  updateCharacter();

  function updateCharacter() {
    $character.get(0).className = baseClass + ' ' + currentVertical + ' ' + currentHorizontal;
    $character.text('.'+currentVertical + ' .'+currentHorizontal);
  }

  $(document).on('click', '[data-vertical-pos]', function () {
    currentVertical = $(this).data('vertical-pos');
    $('[data-vertical-pos').removeClass('k--button-blue').addClass('k--button-light-gray');
    $(this).removeClass('k--button-light-gray').addClass('k--button-blue');
    updateCharacter();
  })

  $(document).on('click', '[data-horizontal-pos]', function () {
    currentHorizontal = $(this).data('horizontal-pos');
    $('[data-horizontal-pos').removeClass('k--button-blue').addClass('k--button-light-gray');
    $(this).removeClass('k--button-light-gray').addClass('k--button-blue');
    updateCharacter();
  })
}

jQuery(document).ready(function () {
  setupColorPicker(jQuery);
  setupPositioningPlayground(jQuery);
});
