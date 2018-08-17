<?php
  // Twitter検索

  /*
    curl必須
    XAMPP/Windowsではphp.iniの以下を変更
    変更前  ;extension=php_curl.dll
    変更後  extension=php_curl.dll
  */

  require_once('twitteroauth.php');

  $url = 'https://api.twitter.com/1.1/search/tweets.json';

  $consumer_key    = '57l1aeM0wE8SnT46gP9VnewDO';
  $consumer_secret = 'D7QbyqufAo516eB3uLEVfqL6rHJBbMMECQAgdEvuWasg8sXdtq';
  $access_token    = '299375708-lDLjGEKBvFDv7iAjcjlPcQkGKk1wET9zvHYNNsu5';
  $token_secret    = 'qI3cBiUt9lSWdglMVQ2RrkoIF3p9Bf5rwmbns9uG8Be9b';

  $conn = new TwitterOAuth($consumer_key, $consumer_secret,
                           $access_token, $token_secret);

  // $conn->host = "https://api.twitter.com/1.1/";
  // $res = $conn->get('search/tweets', array('q' => 'JavaScript'));
  // var_dump($res);

  $res = $conn->OAuthRequest($url, 'GET', $_GET);

  // header('Content-Type', (array_key_exists('callback', $_GET) ? 'text/javascript' : 'application/json') + ';charset=UTF-8');

  header('Content-Type', 'application/json;charset=UTF-8');

  echo $res;
