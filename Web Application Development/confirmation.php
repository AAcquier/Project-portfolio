<?php
if (isset($_COOKIE["CCOK"])){ //if the credit card number is valid
	
				
	if ($_SERVER['REQUEST_METHOD'] == 'POST') { //Use the post method as a request method to the server
			
		require('mysqli_connect.php');	//Give information on which database to use
			
		//Setting variables
		$ID=$_COOKIE["orderID"];
		$un=$_COOKIE["username"];
		$tot=$_COOKIE["Total"];
		$add=$_COOKIE["Address"];
		$cnt=$_COOKIE["numCookie"];
			
			
			
		for ($i=0; $i<=$cnt; $i++){
			//Getting the product name, quantities and prices of the different items
			$prod=$_COOKIE["Product$i"];
			$qty=$_COOKIE["Quantity$i"];
			$price=$_COOKIE["Price$i"];
				
			//Checking id all the data are there
			if (isset($ID) && isset($un) &&  isset($tot) &&  isset($add) &&  isset($prod) &&  isset($qty) &&  isset($price)) {
					
				//Building the query
				$q="INSERT INTO orders (orderNumber,username,address,item,quantity,pricePerUnit_€, totalPriceOrder_€)
					VALUES('$ID', '$un', '$add', '$prod', '$qty', '$price', '$tot')";
					
				$r = @mysqli_query ($dbc, $q);	//Doing the request
				
				setcookie("CCOK","" ,time() -10);//Reset the cookie CCOK to stop the database to be populated if the confirmation.php page is refreshed
			}
				
			if ($r){
			}
			else{//Give an error message if the query fails
				echo '<h1>System Error</h1>
				<p class="error">We could not record your order due to a system error. We apologize for any inconvenience.</p>'; 
				}
		}
		mysqli_close($dbc); //close the database
	}
}
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>The Sports Shop</title>
		<link rel="stylesheet" type="text/css" href="style.css">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
		<script type="text/javascript" src="js/jquery.shop.js" async></script>
		<style>
			body{
				background-color:#FFE4C4;
				}
			p3{
				font-size:1.5em;
				margin-left:3.5em;
				font-weight: bold;
				color:green;
			}
			p4{
				font-size:1.5em;
				margin-left:3.5em;
				font-weight: bold;
				color:green;
			}
			p5{
				font-size:1.5em;
				margin-left:3.5em;
				font-weight: bold;
				color:green;
			}
			p6{
				font-size:1.25em;
				margin-left:4em;
				font-weight: bold;
			}
			p7{
				font-size:1.25em;
				margin-left:4em;
				font-weight: bold;
			}
			p8{
				font-size:1.25em;
				margin-left:4em;
				font-weight: bold;
			}
		</style>
	</head>
	<body>
		<div id="site">
			<header>
				<title> The Sport Shop</title>
				<a href="index.html"><h1><img src="logo.jpg" alt="The Lion Sport Shop logo" width="120" height="80"></a><br></br> The Sports Shop</h1>
				<h2> Transaction Confirmed</h2>
			</header>
			<div>
				</br></br><p5>Your Payment Information Have Been Processed Succesfully And The Transaction Has Been Authorized.</p5>
				</br><p4><strong>Your Account Has Been Debited Of &euro;______ </strong></p4>
				</br><p3 id="ordID"><strong>Your Order Number is: <?php echo $_COOKIE["orderID"] ?> </strong></p3></br></br>
			</div>
			<center><a href="login.php" class="btn" onclick="emptyStorage()" name ="finish"><font size="5">Finish</font></a></center></br>
			<footer>
				Copyright &copy; The Sports Shop 2016
			</footer>
		</div>
    </body>
</html>
