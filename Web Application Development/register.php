<?php # register.php
// This script performs an INSERT query to add a record to the users table.

//include the header
$page_title='Register';
include ('includes/header.html');

// Check for form submission:
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		
	require('mysqli_connect.php');	//perform validation ensuring all form fields contain values
	
	
	//build your insert query and run it to add the details captured on the form to the users table.	
	$fn=$_POST['first_name'];
	$ln=$_POST['last_name'];
	$un=$_POST['username'];
	$pass1=$_POST['pass1'];
	$pass2 = $_POST['pass2'];
	
	if(!empty($fn) && !empty($ln) && !empty($un)  && !empty($pass1) && !empty($pass2) && ($pass1 === $pass2)) {

	$q = "INSERT INTO users(firstname,lastname, username, password) 
		  VALUES ('$fn', '$ln', '$un', SHA1('$pass1'))";
	$r = @mysqli_query ($dbc, $q);
	}
	
	//check the query ran ok
	if ($r) {
		header('Location: index.html');
		
	} else { // If it did not run OK.
		echo '<h1>System Error</h1>
		<p class="error">You could not be registered due to a system error. We apologize for any inconvenience.</p>'; 
			
		// Debugging message:
		echo '<p>' . mysqli_error($dbc) . '<br /><br />Query: ' . $q . '</p>';
						
	} 
	
	mysqli_close($dbc);// Close the database connection 
} 

	//This cookie stores the username
	if (isset($_POST['username'])){
		//add username from a form. Cookie expires in 1 hour
		setcookie("username",$_POST['username'], time() +3600);
	}
	
?>

<h1>Register</h1>
<form action="register.php" method="post" >
	<br><p>First Name: <input type="text" name="first_name" size="15" maxlength="20" value="<?php if (isset($_POST['first_name'])) echo $_POST['first_name']; ?>" /></p>
	<p>Last Name: <input type="text" name="last_name" size="15" maxlength="40" value="<?php if (isset($_POST['last_name'])) echo $_POST['last_name']; ?>" /></p>
	<p>Username: <input type="text" name="username" size="20" maxlength="60" value="<?php if (isset($_POST['username'])) echo $_POST['username']; ?>"  /> </p>
	<p>Password: <input type="password" name="pass1" size="10" maxlength="20" value="<?php if (isset($_POST['pass1'])) echo $_POST['pass1']; ?>"  /></p><br>
	<p>Confirm Password: <input type="password" name="pass2" size="10" maxlength="20" value="<?php if (isset($_POST['pass2'])) echo $_POST['pass2']; ?>"/></p>
	<p><input type="submit" name="submit" value="Register" onclick="emptyStorage()"/></p>
</form>

<?php 
//include the footer
include ('includes/footer.html');
exit(); // exit the script
?>