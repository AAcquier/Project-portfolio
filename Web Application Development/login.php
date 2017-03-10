<?php # login.php
// This is a login page

$page_title = 'Login';
include ('includes/header.html');
include ('includes/login.html');

// Check for form submission:
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

	if(isset($_POST['register'])){
	  
	  header( "Location: register.php" );
	  exit();
	}

	//connect to the database 	
	//perform validation ensuring all form fields contain values	
	require('mysqli_connect.php');

	//Build a select string with a WHERE clause on username/password and run the query on the database
	$user=$_POST['username'];
	$passw=$_POST['pass'];
	$q = "SELECT user_id FROM users WHERE (username='$user' AND password=SHA1('$passw') )";
	
	//run the query:
	$r = @mysqli_query($dbc, $q); //note: $dbc is set in the mysqli_connect.php script.
	
	//check if any rows returned:
	$num = @mysqli_num_rows($r);
		if ($num == 1) { // Match was made.
	
			mysqli_close($dbc);
			// Close the database connection.
			//Navigate to index.html
			header('Location: index.html');
			
		} else { // Invalid username/password combination.
			echo '<h1>Error!</h1>
			<p class="error">The username and password do not match those on file.</p>';
			mysqli_close($dbc);// Close the database connection.
		}
		
} // End of the main Submit conditional.


	//This cookie stores the username
	if (isset($_POST["username"])){
		//add userneme from a form. Cookie expires in 1 hour
		setcookie("username",$_POST["username"], time() +3600);
	}

include ('includes/footer.html'); 
exit(); // exit the script
?>