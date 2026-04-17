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

$email = isset($_POST['email']) ? trim((string) $_POST['email']) : '';
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    exit('Correo electrónico inválido');
}

/*********************************************************
 * DETECTAR TIPO DE FORMULARIO
 *********************************************************/
if (isset($_POST['modelo'], $_POST['anio'], $_POST['estado'])) {
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

$autoReplySubject = '';
$autoReplyMessage = '';

/*********************************************************
 * CONSTRUIR MENSAJE
 *********************************************************/
switch ($tipo_form) {

    case 'auto':
        $subject = 'Nueva cotización Seguro de Auto - Carsa Seguros';
        $message = "
            <h2>Seguro de Auto</h2>
            <p><strong>Correo:</strong> ".htmlspecialchars($email)."</p>
            <p><strong>WhatsApp:</strong> ".htmlspecialchars($_POST['whatsapp'])."</p>
            <p><strong>Modelo:</strong> ".htmlspecialchars($_POST['modelo'])."</p>
            <p><strong>Año:</strong> ".htmlspecialchars($_POST['anio'])."</p>
            <p><strong>Estado:</strong> ".htmlspecialchars($_POST['estado'])."</p>
        ";
        $autoReplySubject = 'Recibimos tu solicitud de seguro de auto - CARSA Seguros';
        $autoReplyMessage = "
            <p>Hola,</p>
            <p>¡Gracias por contactarnos a través de nuestro sitio web!</p>
            <p>Recibimos tu solicitud y será un gusto ayudarte a encontrar la mejor opción de seguro para tu auto. Para poder enviarte una cotización precisa y adaptada a lo que necesitas, te pedimos completar un breve formulario con algunos datos básicos.</p>
            <p><strong>Completa tu información aquí:</strong><br><a href=\"https://forms.gle/tBqziEFDvLJwoZNM6\">https://forms.gle/tBqziEFDvLJwoZNM6</a></p>
            <p>Este proceso te tomará menos de 2 minutos y nos permitirá ofrecerte opciones claras, comparativas y con las mejores coberturas disponibles.</p>
            <p>En cuanto recibamos tu información, uno de nuestros asesores revisará tu caso y se pondrá en contacto contigo a la brevedad posible.</p>
            <p>Si tienes alguna duda adicional, puedes responder a este correo y con gusto te apoyaremos.</p>
            <p>Quedamos atentos para ayudarte a proteger lo que más importa.</p>
            <p>Saludos,<br>Equipo CARSA Seguros<br><a href=\"https://www.carsaseguros.mx\">www.carsaseguros.mx</a></p>
        ";
    break;

    case 'ahorro':
        $subject = 'Nueva solicitud de cotización (Ahorro) - Carsa Seguros';
        $message = "
            <h2>Plan de Ahorro</h2>
            <p><strong>Correo:</strong> ".htmlspecialchars($email)."</p>
            <p><strong>Teléfono:</strong> ".htmlspecialchars($_POST['telefono'])."</p>
            <p><strong>Edad:</strong> ".htmlspecialchars($_POST['edad'])."</p>
            <p><strong>Monto:</strong> $".htmlspecialchars($_POST['monto'])."</p>
        ";
    break;

    case 'vida':
        $subject = 'Nueva solicitud de Seguro de Vida - Carsa Seguros';
        $message = "
            <h2>Seguro de Vida</h2>
            <p><strong>Correo:</strong> ".htmlspecialchars($email)."</p>
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
            <p><strong>Correo:</strong> ".htmlspecialchars($email)."</p>
            <p><strong>Teléfono:</strong> ".htmlspecialchars($_POST['telefono'])."</p>
            <p><strong>Código Postal:</strong> ".htmlspecialchars($_POST['codigo_postal'])."</p>
            <p><strong>Tipo de cliente:</strong> ".htmlspecialchars($_POST['tipo_cliente'])."</p>
        ";
    break;

    case 'fianzas':
        $subject = 'Nueva solicitud de Fianza - Carsa Seguros';
        $message = "
            <h2>Fianzas</h2>
            <p><strong>Correo:</strong> ".htmlspecialchars($email)."</p>
            <p><strong>Whatsapp:</strong> ".htmlspecialchars($_POST['celular'])."</p>
            <p><strong>Línea de afianzamiento:</strong> ".htmlspecialchars($_POST['linea_afianzamiento'])."</p>
            <p><strong>Tipo de fianza:</strong> ".htmlspecialchars($_POST['tipo_fianza'])."</p>
        ";
    break;

    case 'proteccion':
        $subject = 'Solicitud Seguro de Salud - Carsa Seguros';
        $message = "
            <h2>Seguro Médico</h2>
            <p><strong>Correo:</strong> ".htmlspecialchars($email)."</p>
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
    $mail->addReplyTo($email, 'Contacto del formulario');

    $mail->addAddress($to);
    foreach ($cc as $ccEmail) {
        $mail->addCC($ccEmail);
    }

    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body    = "<html><body>{$message}</body></html>";

    $mail->send();

    if ($tipo_form === 'auto' && $autoReplySubject !== '' && $autoReplyMessage !== '') {
        try {
            $autoReplyMail = new PHPMailer(true);
            $autoReplyMail->isSMTP();
            $autoReplyMail->Host       = $config['smtp_host'];
            $autoReplyMail->SMTPAuth   = true;
            $autoReplyMail->Username   = $config['smtp_user'];
            $autoReplyMail->Password   = $config['smtp_pass'];
            $autoReplyMail->Port       = $config['smtp_port'];
            $autoReplyMail->SMTPSecure = ($config['smtp_secure'] === 'ssl')
                ? PHPMailer::ENCRYPTION_SMTPS
                : PHPMailer::ENCRYPTION_STARTTLS;
            $autoReplyMail->CharSet = 'UTF-8';
            $autoReplyMail->setFrom('no-reply@carsaseguros.mx', 'CARSA Seguros');
            $autoReplyMail->addReplyTo('contacto@segurosfianzas.com', 'CARSA Seguros');
            $autoReplyMail->addAddress($email);
            $autoReplyMail->isHTML(true);
            $autoReplyMail->Subject = $autoReplySubject;
            $autoReplyMail->Body    = "<html><body>{$autoReplyMessage}</body></html>";
            $autoReplyMail->AltBody = "Hola,\n\n¡Gracias por contactarnos a través de nuestro sitio web!\n\nRecibimos tu solicitud y será un gusto ayudarte a encontrar la mejor opción de seguro para tu auto. Para poder enviarte una cotización precisa y adaptada a lo que necesitas, te pedimos completar un breve formulario con algunos datos básicos.\n\nCompleta tu información aquí:\nhttps://forms.gle/tBqziEFDvLJwoZNM6\n\nEste proceso te tomará menos de 2 minutos y nos permitirá ofrecerte opciones claras, comparativas y con las mejores coberturas disponibles.\n\nEn cuanto recibamos tu información, uno de nuestros asesores revisará tu caso y se pondrá en contacto contigo a la brevedad posible.\n\nSi tienes alguna duda adicional, puedes responder a este correo y con gusto te apoyaremos.\n\nQuedamos atentos para ayudarte a proteger lo que más importa.\n\nSaludos,\nEquipo CARSA Seguros\nwww.carsaseguros.mx";
            $autoReplyMail->send();
        } catch (Exception $autoReplyException) {
            // No interrumpimos el envío principal si la autorrespuesta falla.
        }
    }

    echo 'OK';

} catch (Exception $e) {
    http_response_code(500);
    echo 'ERROR';
}
