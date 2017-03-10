//add an onload event listener to the body of nameList.html
var el = document.getElementById("namesListBody");
el.addEventListener('load', populate_page, true);

//Setting up namesList div with a a table
function populate_page() {
	//Initializing divContent
	divContent = "<br><br><table class='table' id='t1'><thead><tr><th>Item</th><th>Qty</th><th>Price</th></tr></thead><tbody>";
	
	var sessObj = JSON.parse(sessionStorage.getItem("shop-cart")); //Targetting the array
	
	//Looping over the array
	if (sessionStorage.length >0){
		for( var cnt=0; cnt < sessObj.items.length; cnt++){
			//Creating the table
			divContent +="<tr id='";
			divContent += [cnt];
			divContent+= "'><td>";
			divContent += sessObj.items[cnt].product;
			divContent += "</td><td>";
			divContent += sessObj.items[cnt].qty;
			divContent += "</td><td> &euro;";
			divContent += sessObj.items[cnt].price;
			divContent +="</td></tr>";
			
			document.cookie="Product"+cnt+"="+sessObj.items[cnt].product+"; time()+3600";//Generating cookies for the different items
			document.cookie="Quantity"+cnt+"="+sessObj.items[cnt].qty+"; time()+3600";
			document.cookie="Price"+cnt+"="+sessObj.items[cnt].price+"; time()+3600";
			document.cookie="numCookie="+cnt+"; time()+3600";

		
		}
		divContent += "</tbody></table>";
	}
	else{
		divContent = "<br><br><table class='table' id='t1'><thead><tr><th>Item</th><th>Qty</th><th>Price</th></tr></thead><tbody></tbody></table>"; //Default values of the table if session storage is empty
	}
	var divEl = document.getElementById("nameList");//targetting namesList div
	divEl.innerHTML = divContent;		//Populating

	var totEl=document.getElementById("stotal");
	
	var total=JSON.parse(sessionStorage.getItem("shop-total"))
	
	//Displays the total
	if (total ===null){
		document.cookie="Total=0; time()+3600";
		totEl.innerHTML="0";
	}
	else{
		document.cookie="Total="+total+"; time()+3600";
		totEl.innerHTML=total;
	}
	
	//Event listener to erase the rows
	document.getElementById('t1').addEventListener('click', function(){eraseRow(event);});
}


function eraseRow(event){
	
	var tagName=event.target.nodeName.toLowerCase();
	if (tagName=="td"){
		var tdEl = event.target.parentNode; // get the row
		var tableEl = tdEl.parentNode; //get the tbody
		tableEl.removeChild(tdEl); //remove the row	
		var ID=tdEl.id;//Get the ID number of the element
		//Resets the corresponding cookies
		document.cookie = "Product"+ID+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
		document.cookie = "Quantity"+ID+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
		document.cookie = "Price"+ID+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
	}
	event.stopPropagation(); //Stop propagation of the event

}

function clearStorage(){
	sessionStorage.clear();//Clear the session stoarage
	
	populate_page();	//Reload the table
}