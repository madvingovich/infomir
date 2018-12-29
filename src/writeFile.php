<?php

$str  = '';

foreach ($_POST as $field => $value) {
    $str .= $field . ' - ' . $value . PHP_EOL;
}

$str .= PHP_EOL;

file_put_contents('result.txt', $str, FILE_APPEND);
