<?php
  $callback = $_GET['callback'];
  $data = array('a' => (int)$_GET['a'], 'b' => (int)$_GET['b']);

  header('Content-Type: text/javascript');
  print "$callback(" . json_encode($data) . ')';
?>
