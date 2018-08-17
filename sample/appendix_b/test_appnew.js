// アプリケーションのテスト用プログラム(new)
jQuery(function($) {
  // モジュール設定
  module('#boxの色を確認', {
    handler: function() {   // テスト関数(背景色の確認)
      var col = '';
      $.each($('#box').css('backgroundColor').match(/\d+/g), function(i, n) {
        if (i > 2) return;
        var hex = '0' + Number(n).toString(16);
        col += hex.substr(hex.length - 2);
      });
      this.col = col;  // テスト結果参照用
      // テスト実行
      start();
    },
    setup: function() {     // テストの開始処理(初期設定)
      this.handler = $.proxy(this, 'handler');
      $('#box').click(this.handler);
    },
    teardown: function() {  // テストの終了処理
      // テスト中に利用したイベント処理と変数を削除
      $('#box').off('click', this.handler);
      if (this.col) delete this.col;
      // 画面のリセット
      $('form input[type="checkbox"]').prop('checked', false).change();
      $('#box').click();
    }
  });
  // テスト開始(checkboxの変更と<div id="box">のクリック)
  asyncTest('redチェック時の色 赤', function() {
    $('form input[type="checkbox"]').first().prop('checked', true).change();
    $('#box').click();
    deepEqual(this.col, 'ff0000', '#boxの色は赤');
  });
  asyncTest('greenチェック時の色 緑', function() {
    $('form input[type="checkbox"]').eq(1).prop('checked', true).change();
    $('#box').click();
    deepEqual(this.col, '00ff00', '#boxの色は緑');
  });
  asyncTest('blueチェック時の色 青', function() {
    $('form input[type="checkbox"]').last().prop('checked', true).change();
    $('#box').click();
    deepEqual(this.col, '0000ff', '#boxの色は青');
  });
});
