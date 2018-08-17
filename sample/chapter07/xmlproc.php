<?php
  if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // GETメソッドで受信したときは
    // パラメータxmlからXML形式の文字列を読み込む
    $xml = simplexml_load_string($_GET['xml']);
  } elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // POSTメソッドで受信したときは
    // 読み込み専用ストリーム(php://input)からXML形式の文字列を読み込む
    $xml = simplexml_load_file('php://input');
  } else {
    $xml = array();
    $xml['title'] = 'データがありません';
  }

  header('Content-type: application/json');
  print json_encode($xml);
  /* Webブラウザに送信されるデータ
     {"title":"Web\u95a2\u9023\u6280\u8853","names":{"name":["HTML","CSS","JavaScript"]}} */
?>
