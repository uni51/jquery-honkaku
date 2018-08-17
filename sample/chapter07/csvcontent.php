<?php
  // クライアント(Webブラウザ)がCSV形式のデータを受け取れるかを確認
  $headers = apache_request_headers();
  if (!preg_match('/csv|comma-separated-values/', $headers['Accept'])) {
    // CSV形式のデータに対応できなければ送信を拒否
    header("$_SERVER[SERVER_PROTOCOL] 400 Bad Request");
    exit;
  }

  $data = <<<EOD
"名称","バージョン","備考"
"HTML",5,"HTML文書の構造"
"CSS",3,"画面の装飾"
"jQuery",1.6,"JavaScriptライブラリ"
EOD;

  header('Content-Type: text/comma-separated-values;charset=UTF-8');
  print $data;
?>
