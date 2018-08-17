// テスト対象のアプリケーション(new)
jQuery(function($) {
  // <div id="box">の背景色
  var bgc = 0x000;
  // 背景色の設定用
  var colors = {
    red:   {on: 0xf00, off: 0x0ff},
    green: {on: 0x0f0, off: 0xf0f},
    blue:  {on: 0x00f, off: 0xff0}
  };
  // checkboxの状態が変更されたら背景色の設定を変更
  $(document).prop('checked', true)
             .on('change', 'form input[type="checkbox"]', function() {
    var cb = $(this);
    if (cb.prop('checked')) {
      bgc = bgc | colors[cb.val()].on;
    } else {
      bgc = bgc & colors[cb.val()].off;
    }
  });
  // <form>を画面に追加(submitしない)
  var form = $('<form>', {submit: false}).appendTo(document.body);
  // <div id="box">を画面に追加(背景色は黒)
  var box  = $('<div>', {
               id: 'box', width: 150, height: 50,
               css: {border: '1px solid', backgroundColor: 'black'}
             }).appendTo(document.body);
  // <form>内にcheckboxを追加
  $.each(colors, function(clr) {
    $('<label>', {for: clr, text: clr}).appendTo(form);
    $('<input>', {id: clr, type: 'checkbox', name: 'colors', val: clr})
      .appendTo(form);
  });
  // <div id="box">はクリックにより背景色を変更
  // 1回目: checkboxによって設定された色 / 2回目: 初期設定(黒)
  box.click(function() {
    $(this).toggleClass('colored');
    if ($(this).hasClass('colored')) {
      $(this).css('backgroundColor', 
        '#' + ('00' + bgc.toString(16)).replace(/(.*?)(.{3})$/, "$2"));
    } else {
      $(this).css('backgroundColor', 'black');
    }
  });
});
