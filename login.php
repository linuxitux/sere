<?php

include "config.php";

session_start();

if (isset($_SESSION['login']) && ($_SESSION['login'] === true)) {
  header("Location: index.php");
  die();
}

$msg = "";
$valid = false;

if (isset($_POST['user'])) {
  $valid = $_POST['user'] == $user && $_POST['pass'] == $pass;
  if (!$valid) $msg = "Invalid username or password.";
  else $_SESSION['login'] = true;
}

if ($valid) {
  header("Location: index.php");
  die();
}

?>
<html>
<head>
<title>Please login - sere</title>
<link rel="stylesheet" type="text/css" href="template.css">
</head>
<body>
<form name="input" action="" method="post">
<div class="container">
<div class="metrics">
<h4>Welcome to sere</h4>
<p>Enter username and password:</p>
<input class="login" type="text" value="<?php echo $_POST['user']; ?>" id="user" name="user" /><br />
<input class="login" type="password" value="" id="pass" name="pass" /><br />
<!--
<div class="login_error">
<?php echo $msg; ?>
</div>
-->
<input class="login" type="submit" value="Login" name="login" />
</div>
</div>
</form>
</body>
</html>
