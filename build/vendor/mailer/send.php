<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';

$name = $_POST['form_name'];
$email = $_POST['form_mail'];
$mess = $_POST['form_text'];


$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
try {
    //Server settings
    $mail->SMTPDebug = 2;                                 // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.yandex.ru';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'xiagn17@yandex.ru';                 // SMTP username
    $mail->Password = '18102000nikita';                           // SMTP password
    $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 465;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom('xiagn17@yandex.ru', 'My first website contact form!');
    $mail->addAddress('nishtyak2000@gmail.com');     // Add a recipient
    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'CONTACT FORM';
    $mail->Body    = '<strong>Name</strong>: ' . $name . '<br>
    <strong>E-mail</strong>: ' . $email . '<br>
    <strong>Text</strong>: ' . $mess . '';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    return true;
} catch (Exception $e) {
    return false;
}