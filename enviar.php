<?php
/*********************************************************
 * CONFIGURACIÓN GENERAL
 *********************************************************/
error_reporting(E_ALL);
ini_set('display_errors', 1); // en producción siempre en 0

// Cargar configuración SMTP (NO expone contraseña)
$config = require __DIR__ . '/config-mail.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Cargar PHPMailer (rutas correctas)
require __DIR__ . '/phpmailer/src/Exception.php';
require __DIR__ . '/phpmailer/src/PHPMailer.php';
require __DIR__ . '/phpmailer/src/SMTP.php';

/*********************************************************
 * VALIDAR REQUEST
 *********************************************************/
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_POST)) {
    http_response_code(400);
    exit('Solicitud inválida');
}

/*********************************************************
 * DETECTAR TIPO DE FORMULARIO
 *********************************************************/
if (isset($_POST['marca'], $_POST['modelo'])) {
    $tipo_form = 'auto';

} elseif (isset($_POST['sexo'], $_POST['fumador'])) {
    // VIDA primero porque también tiene edad + monto
    $tipo_form = 'vida';

} elseif (isset($_POST['edad'], $_POST['monto'])) {
    $tipo_form = 'ahorro';

} elseif (isset($_POST['codigo_postal'], $_POST['tipo_cliente'])) {
    $tipo_form = 'empresarial';

} elseif (isset($_POST['linea_afianzamiento'], $_POST['tipo_fianza'])) {
    $tipo_form = 'fianzas';

} elseif (isset($_POST['proteccion_para'], $_POST['whatsapp'])) {
    $tipo_form = 'proteccion';

} else {
    $tipo_form = 'desconocido';
}

/*********************************************************
 * DESTINATARIOS
 *********************************************************/
if ($tipo_form === 'auto') {
    $to = 'agentes@segurosfianzas.com';
    $cc = [
        'bettyc@segurosfianzas.com',
        'ivan.soportetec@gmail.com'
    ];
} else {
    $to = 'contacto@segurosfianzas.com';
    $cc = ['ivan.soportetec@gmail.com'];
}

/*********************************************************
 * CONSTRUIR MENSAJE
 *********************************************************/
switch ($tipo_form) {

    case 'auto':
        $subject = 'Nueva cotización Seguro de Auto - Carsa Seguros';
        $message = "
            <h2>Seguro de Auto</h2>
            <p><strong>WhatsApp:</strong> ".htmlspecialchars($_POST['whatsapp'])."</p>
            <p><strong>Marca:</strong> ".htmlspecialchars($_POST['marca'])."</p>
            <p><strong>Modelo:</strong> ".htmlspecialchars($_POST['modelo'])."</p>
            <p><strong>Año:</strong> ".htmlspecialchars($_POST['anio'])."</p>
            <p><strong>Estado:</strong> ".htmlspecialchars($_POST['estado'])."</p>
        ";
    break;

    case 'ahorro':
        $subject = 'Nueva solicitud de cotización (Ahorro) - Carsa Seguros';
        $message = "
            <h2>Plan de Ahorro</h2>
            <p><strong>Teléfono:</strong> ".htmlspecialchars($_POST['telefono'])."</p>
            <p><strong>Edad:</strong> ".htmlspecialchars($_POST['edad'])."</p>
            <p><strong>Monto:</strong> $".htmlspecialchars($_POST['monto'])."</p>
        ";
    break;

    case 'vida':
        $subject = 'Nueva solicitud de Seguro de Vida - Carsa Seguros';
        $message = "
            <h2>Seguro de Vida</h2>
            <p><strong>Teléfono:</strong> ".htmlspecialchars($_POST['telefono'])."</p>
            <p><strong>Edad:</strong> ".htmlspecialchars($_POST['edad'])."</p>
            <p><strong>Sexo:</strong> ".htmlspecialchars($_POST['sexo'])."</p>
            <p><strong>Fumador:</strong> ".htmlspecialchars($_POST['fumador'])."</p>
            <p><strong>Monto:</strong> $".htmlspecialchars($_POST['monto'])."</p>
        ";
    break;

    case 'empresarial':
        $subject = 'Nueva solicitud Empresarial - Carsa Seguros';
        $message = "
            <h2>Seguro Empresarial</h2>
            <p><strong>Teléfono:</strong> ".htmlspecialchars($_POST['telefono'])."</p>
            <p><strong>Código Postal:</strong> ".htmlspecialchars($_POST['codigo_postal'])."</p>
            <p><strong>Tipo de cliente:</strong> ".htmlspecialchars($_POST['tipo_cliente'])."</p>
        ";
    break;

    case 'fianzas':
        $subject = 'Nueva solicitud de Fianza - Carsa Seguros';
        $message = "
            <h2>Fianzas</h2>
            <p><strong>Whatsapp:</strong> ".htmlspecialchars($_POST['celular'])."</p>
            <p><strong>Línea de afianzamiento:</strong> ".htmlspecialchars($_POST['linea_afianzamiento'])."</p>
            <p><strong>Tipo de fianza:</strong> ".htmlspecialchars($_POST['tipo_fianza'])."</p>
        ";
    break;

    case 'proteccion':
        $subject = 'Solicitud Seguro de Salud - Carsa Seguros';
        $message = "
            <h2>Seguro Médico</h2>
            <p><strong>Whatsapp:</strong> ".htmlspecialchars($_POST['whatsapp'])."</p>
            <p><strong>Protección para:</strong> ".htmlspecialchars($_POST['proteccion_para'])."</p>
        ";
    break;

    default:
        $subject = 'Formulario desconocido - Carsa Seguros';
        $message = '<p>Formulario no identificado.</p>';
}

/*********************************************************
 * ENVÍO SMTP CON PHPMailer
 *********************************************************/
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = $config['smtp_host'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $config['smtp_user'];
    $mail->Password   = $config['smtp_pass'];
    $mail->Port       = $config['smtp_port'];

    $mail->SMTPSecure = ($config['smtp_secure'] === 'ssl')
        ? PHPMailer::ENCRYPTION_SMTPS
        : PHPMailer::ENCRYPTION_STARTTLS;

    $mail->CharSet = 'UTF-8';

    $mail->setFrom('no-reply@carsaseguros.mx', 'Formulario Web Carsa');
    $mail->addReplyTo('no-reply@carsaseguros.mx', 'Carsa Seguros');

    $mail->addAddress($to);
    foreach ($cc as $email) {
        $mail->addCC($email);
    }

    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body    = "<html><body>{$message}</body></html>";

    $mail->send();
    echo 'OK';

} catch (Exception $e) {
    http_response_code(500);
    echo 'ERROR';
}
