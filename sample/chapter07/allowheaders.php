<?php
  // 別のドメインからのアクセスを認める
  header('Access-Control-Allow-Origin: *');
  // X-Requested-Withヘッダが送信されてきたら別のドメインからでもアクセス許可
  header('Access-Control-Allow-Headers: X-Requested-With');

  header('Content-Type: application/json');
  print json_encode(array('webtech' => array('HTML', 'CSS', 'JavaScript')));
?>
