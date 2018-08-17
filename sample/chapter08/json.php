<?php
  // 検索用のデータ
  $obj = array(
    'webtech' => array('HTML', 'CSS', 'JavaScript'),
    'jQuery'  => array('jQuery', 'jQuery UI')
  );

  // レスポンスの生成
  $response = array('response' => array(
    'name' => $_GET['name'],
    'tech' => isset($obj[$_GET['name']]) ? $obj[$_GET['name']] : array()
  ));

  // レスポンスの送信
  header('Content-Type: application/json');
  print json_encode($response);

  // レスポンスの例(name=webtechのとき)
  // {"response":{"name":"webtech","tech":["HTML","CSS","JavaScript"]}
?>
