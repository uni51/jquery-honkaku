<?php
  $headers = apache_request_headers();
  header('X-Custom-Response-Header: ' . $headers['X-Custom-Request-Header']);
?>
