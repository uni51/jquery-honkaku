<?php
  $fish = array('マグロ' => 'tuna', 'サケ' => 'salmon', 'マス' => 'trout');

  $answer = array('word' => $_GET['word'], 'answer' => $fish[$_GET['word']]);
  $data = '/* --- comment --- ' . json_encode($answer) . ' --- */';

  $now = gmdate( "D, d M Y H:i:s T");

  header("Last-Modified: $now");
  header('Content-Type: application/json');

  print $data;
?>
