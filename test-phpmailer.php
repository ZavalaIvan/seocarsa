<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "Inicio<br>";

require __DIR__ . '/phpmailer/src/Exception.php';
echo "Exception OK<br>";

require __DIR__ . '/phpmailer/src/PHPMailer.php';
echo "PHPMailer OK<br>";

require __DIR__ . '/phpmailer/src/SMTP.php';
echo "SMTP OK<br>";

use PHPMailer\PHPMailer\PHPMailer;

$mail = new PHPMailer(true);

echo "PHPMailer instanciado correctamente";
