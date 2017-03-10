//Declaring variables
var wallResistance=0;
var lowerRoofResistance=0.170;//Due to internal and externalsurface resistance
var upperRoofResistance=0.170;//Due to internal and externalsurface resistance
var ratio=0;
var wallArray=[];	
var x=0;
var lowerRoofArray=[];
var upperRoofArray=[];
var ratioFloor=0;
var lowerFloorResistance=0.170;//Due to internal and externalsurface resistance
var upperFloorResistance=0.170;//Due to internal and externalsurface resistance
var lowerFloorArray=[];
var upperFloorArray=[];
var lowRoofResistance=0;
var uppRoofResistance=0;
var lowFloorResistance=0;
var uppFloorResistance=0;
var month=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var avTemp=[];
var January=31;
var February=28;
var March=31;
var April=30;
var May=31;
var June=30;
var July=31;
var August=31;
var September=30;
var October=31;
var November=30;
var December=31;

//Walls calculations
//This function handles the fact that the walls have a air cavity
function airCavityCheck() {
	
	var chckbox=document.checkbox.airCavity;
	
	if(chckbox.checked){
			wallArray.push(0.350);
			localStorage.setItem("wallArrayStore",JSON.stringify(wallArray));
		}
}

// This function handles the walls layering
function addWallLayers(){
	
	var chckbox=document.checkbox.airCavity;
	
	if(!chckbox.checked && x<1){
			wallArray.push(0.170);
			x++;
			localStorage.setItem("wallArrayStore",JSON.stringify(wallArray));
		}
	
	var thickness=prompt("Please enter the thickness of the layer in meters:");
	var conductivity=prompt("Please enter the conductivity of the layer in W/mK:");
	
	if(!isNaN(thickness) && !isNaN(conductivity) && thickness!== null && conductivity!== null && thickness!=="" && conductivity!==""){
		var layerResistance=thickness/conductivity;
		wallArray.push(layerResistance);
		localStorage.setItem("wallArrayStore",JSON.stringify(wallArray));
	}
	else{
		alert("Incorrect input, please try again and input proper data");
	}
}

//This function clears all the data related to the calculations of the U-Value of the walls
function wallReset(){
	wallResistance=0;
	var chckbox=document.checkbox.airCavity.checked=false;
	while(wallArray.length > 0) {
		wallArray.pop();
	}
	localStorage.clear("wallArrayStore");
	localStorage.clear("UValueWall");
}

//This function handles the U-Value calculations of the walls
function wallUValCalculation(){
	
	var wallResist= JSON.parse(localStorage.getItem("wallArrayStore"));

	for(i=0;i<wallArray.length;i++){
	wallResistance+=wallResist[i];
	}
	var wallUVal=1/wallResistance;
	localStorage.setItem("UValueWall",JSON.stringify(wallUVal.toFixed(2)));
}

//Roof calculations
// This function handles the joist dimensions
function joistsDimensions(){
	var spacing=prompt("Please enter the distance between 2 joist (center to center) in meters:");
	var width=prompt("Please enter the width of the joists in meters:");
	
	if(!isNaN(spacing) && !isNaN(width) && spacing!==null && width!==null && spacing!=="" && width!==""){
		var ratio=width/spacing;
		localStorage.setItem("roofRatio",JSON.stringify(ratio));
	}
	else{
		alert("Incorrect input, please try again and input proper data");
	}
}

//This function handles the lower resistance (under and over the joists)
function lowerResistance(){
	
	var thickness=prompt("Please enter the thickness of the layer in meters:");
	var conductivity=prompt("Please enter the conductivity of the layer in W/mK:");
	
	if(!isNaN(thickness) && !isNaN(conductivity) && thickness!== null && conductivity!== null && thickness!=="" && conductivity!==""){
		var layerResistance=thickness/conductivity;
		lowerRoofArray.push(layerResistance);
		localStorage.setItem("lowRoof",JSON.stringify(lowerRoofArray));
	}
	else{
		alert("Incorrect input, please try again and input proper data");
	}
}

//This function handles the upper resistance (between the joists)
function upperResistance(){
	var thickness=prompt("Please enter the thickness of the layer in meters:");
	var conductivity=prompt("Please enter the conductivity of the layer in W/mK:");
	
	if(!isNaN(thickness) && !isNaN(conductivity) && thickness!== null && conductivity!== null && thickness!=="" && conductivity!==""){
		var layerResistance=thickness/conductivity;
		upperRoofArray.push(layerResistance);
		localStorage.setItem("upRoof",JSON.stringify(upperRoofArray));
	}
	else{
		alert("Incorrect input, please try again and input proper data");
	}
}

//This function clears all the data related to the calculations of the U-Value of the roof 
function roofReset(){
	spacing=0;
	width=0;
	ratio=0;
	lowerRoofResistance=0.170;
	upperRoofResistance=0.170;
	
	while(lowerRoofArray.length > 0) {
		lowerRoofArray.pop();
	}
	
	while(upperRoofArray.length > 0) {
		upperRoofArray.pop();
	}
	localStorage.clear("UValueRoof");
	localStorage.clear("roofRatio");
	localStorage.clear("upRoof");
	localStorage.clear("lowRoof");
}

//This function handles the U-Value calculations of the roof
function roofUValCalculation(){
	
	var low=JSON.parse(localStorage.getItem("lowRoof"));
	for(i=0;i<low.length;i++){
	lowRoofResistance+=parseFloat(low[i]);
	}
	
	var up=JSON.parse(localStorage.getItem("upRoof"));
	for(i=0;i<up.length;i++){
	uppRoofResistance+=parseFloat(up[i]);
	}
	
	var ratio=JSON.parse(localStorage.getItem("roofRatio"));
	var totalRoofResistance= ratio*lowRoofResistance + (1-ratio)*uppRoofResistance;
	var roofUVal=1/totalRoofResistance;
	localStorage.setItem("UValueRoof",JSON.stringify(roofUVal.toFixed(2)));
}

//floor calculations
// This function handles the joist dimensions
function joistsDimensionsFloor(){
	var spacing=prompt("Please enter the distance between 2 joist (center to center) in meters:");
	var width=prompt("Please enter the width of the joists in meters:");
	
	if(!isNaN(spacing) && !isNaN(width) && spacing!==null && width!==null && spacing!=="" && width!==""){
		var ratio=width/spacing;
		localStorage.setItem("ratioFloor",JSON.stringify(ratio));
	}
	else{
		alert("Incorrect input, please try again and input proper data");
	}
}

//This function handles the lower resistance (under and over the joists)
function lowerResistanceFloor(){
	var thickness=prompt("Please enter the thickness of the layer in meters:");
	var conductivity=prompt("Please enter the conductivity of the layer in W/mK:");
	
	if(!isNaN(thickness) && !isNaN(conductivity) && thickness!== null && conductivity!== null && thickness!=="" && conductivity!==""){
		var layerResistance=thickness/conductivity;
		lowerFloorArray.push(layerResistance);
		localStorage.setItem("lowFloor",JSON.stringify(lowerFloorArray));
	}
	else{
		alert("Incorrect input, please try again and input proper data");
	}
}

//This function handles the upper resistance (between the joists)
function upperResistanceFloor(){
	var thickness=prompt("Please enter the thickness of the layer in meters:");
	var conductivity=prompt("Please enter the conductivity of the layer in W/mK:");
	
	if(!isNaN(thickness) && !isNaN(conductivity) && thickness!== null && conductivity!== null && thickness!=="" && conductivity!==""){
		var layerResistance=thickness/conductivity;
		upperFloorArray.push(layerResistance);
		localStorage.setItem("upFloor",JSON.stringify(upperFloorArray));
	}
	else{
		alert("Incorrect input, please try again and input proper data");
	}
}

//This function clears all the data related to the calculations of the U-Value of the floor
function floorReset(){
	spacing=0;
	width=0;
	ratioFloor=0;
	lowerFloorResistance=0.170;
	upperFloorResistance=0.170;
	
	while(lowerFloorArray.length > 0) {
		lowerFloorArray.pop();
	}
	
	while(upperFloorArray.length > 0) {
		upperFloorArray.pop();
	}
	
	localStorage.clear("lowFloor");
	localStorage.clear("upFloor");
	localStorage.clear("ratioFloor");
	localStorage.clear("UValueFloor");
}

//This function handles the U-Value calculations of the floor
function floorUValCalculation(){
	
	var low=JSON.parse(localStorage.getItem("lowFloor"));
	for(i=0;i<low.length;i++){
	lowFloorResistance+=parseFloat(low[i]);
	}
	
	var up=JSON.parse(localStorage.getItem("upFloor"));
	for(i=0;i<up.length;i++){
	uppFloorResistance+=parseFloat(up[i]);
	}
	
	var ratio=JSON.parse(localStorage.getItem("ratioFloor"));
	var totalFloorResistance= ratio*lowFloorResistance + (1-ratio)*uppFloorResistance;
	var floorUVal=1/totalFloorResistance;
	localStorage.setItem("UValueFloor",JSON.stringify(floorUVal.toFixed(2)));
}

//This function determines the U-Value of the windows
function UValWindows(){
	switch($('.windows').val())	{
		case "sg":
		var winUVal=4.8;
		break;
		
		case "dg":
		winUVal=2.9;
		break;
		
		case "tg":
		winUVal=2.4;
		break;
		
		default:
		break;
	}
	localStorage.setItem("UValueWindows",JSON.stringify(parseFloat(winUVal.toFixed(2))));
}

//This function clears windows input
function winReset(){
	winUVal=0;
	localStorage.clear("UValueWindows");
}

//This function clears all the data
function eraseAll(){
	
	localStorage.clear();
	winUVal=0;
	spacing=0;
	width=0;
	ratioFloor=0;
	lowerFloorResistance=0.170;
	upperFloorResistance=0.170;
	spacing=0;
	width=0;
	ratio=0;
	lowerRoofResistance=0.170;
	upperRoofResistance=0.170;
	wallResistance=0;
	WHL=0;
	RHL=0;
	FHL=0;
	WiHL=0;
	DHL=0;
	doorsAr=0;
	wallAr=0;
	roofAr=0;
	floorAr=0;
	windowsAr=0;
	setPoint=20;
	ePrice=0.24;
	price=0.24;
	SP=20;
	wallTherm=0;
	roofTherm=0;
	floorTherm=0;
	windowsTherm=0;
	doorsTherm=0;
	lat=null;
	lgt=null;
	
	var chckbox=document.checkbox.airCavity.checked=false;
	while(wallArray.length > 0) {
		wallArray.pop();
	}
	
	while(lowerRoofArray.length > 0) {
		lowerRoofArray.pop();
	}
	
	while(upperRoofArray.length > 0) {
		upperRoofArray.pop();
	}
	
	while(lowerFloorArray.length > 0) {
		lowerFloorArray.pop();
	}
	
	while(upperFloorArray.length > 0) {
		upperFloorArray.pop();
	}
	while(avTemp.length > 0) {
		avTemp.pop();
	}
}

//This part handle the second tab
//This function handles the walls area
function wallArea(){
	var wallAr=prompt("Please enter the area of the walls in meters squared: ");
	
	if(!isNaN(wallAr) && wallAr!==null && wallAr!==""){
		var UVWall=JSON.parse(localStorage.getItem("UValueWall"));

		var WHeatLoss=UVWall*wallAr;
		localStorage.setItem("wallHL",JSON.stringify(WHeatLoss));
	}
	else{
		alert("Incorrect input, please try again and input proper data");
	}
}

//This function clears the walls area
function wallArReset(){
	wallAr=0;
	localStorage.clear("wallHL");
}

//This function handles the roof area
function roofArea(){
	var roofAr=prompt("Please enter the area of the roof in meters squared: ");
	
	if(!isNaN(roofAr) && roofAr!==null && roofAr!==""){
		var UVRoof=JSON.parse(localStorage.getItem("UValueRoof"));

		var RHeatLoss=UVRoof*roofAr;
		localStorage.setItem("roofHL",JSON.stringify(RHeatLoss));
	}
	else{
		alert("Incorrect input, please try again and input proper data");
	}
}

//This function clears the roof area
function roofArReset(){
	roofAr=0;
	localStorage.clear("roofHL");
}

//This function handles the floor area
function floorArea(){
	var floorAr=prompt("Please enter the area of the floor in meters squared: ");
	
	if(!isNaN(floorAr) && floorAr!==null && floorAr!==""){
		var UVFloor=JSON.parse(localStorage.getItem("UValueFloor"));
		var FHeatLoss=UVFloor*floorAr;
		localStorage.setItem("floorHL",JSON.stringify(FHeatLoss));
	}
	else{
		alert("Incorrect input, please try again and input proper data");
	}
}

//This function clears the floor area
function floorArReset(){
	floorAr=0;
	localStorage.clear("floorHL");
}

//This function handles the windows area
function windowsArea(){
	var windowsAr=prompt("Please enter the area of the windows in meters squared: ");

	if(!isNaN(windowsAr) && windowsAr!==null && windowsAr!==""){
		var UVWindows=JSON.parse(localStorage.getItem("UValueWindows"));
		var WHeatLoss=UVWindows*windowsAr;
		localStorage.setItem("windowsHL",JSON.stringify(WHeatLoss));
	}
	else{
		alert("Incorrect input, please try again and input proper data");
	}
}

//This function clears the windows area
function windowArReset(){
	windowsAr=0;
	localStorage.clear("windowsHL");
}

//This function handles the doors area
function doorsArea(){
	var doorsAr=prompt("Please enter the area of the doorss in meters squared: ");

	if(!isNaN(doorsAr) && doorsAr!==null && doorsAr!==""){
		var DHeatLoss=3*doorsAr;
		localStorage.setItem("doorsHL",JSON.stringify(DHeatLoss));
	}
	else{
		alert("Incorrect input, please try again and input proper data");
	}
}

//This function clears the doors area
function doorsArReset(){
	doorsAr=0;
	localStorage.clear("doorsHL");
}

//This function handles the set point temperature
function setPoint(){
	var setPoint=$("#tempSetUp").val();
	localStorage.setItem("tempSetUp",JSON.stringify(setPoint));
}

//This function clears the set point temperature
function tempSetUpArReset(){
	setPoint=20;
	localStorage.clear("tempSetUp");
}

//This function handles the price of electrity
function electricityPrice(){
	var ePrice=$("#priceElec").val();
	localStorage.setItem("elecPrice",JSON.stringify(ePrice));	
}

//This function clears the price of electrity
function ePriceArReset(){
	ePrice=20;
	localStorage.clear("elecPrice");
}

//This part handles the monthly average temperatures
function averageTemp(){
	
	for (i=0;i<month.length;i++){
		var TempInput=prompt("Enter the average temperature for "+month[i]+": ");
		avTemp.push(TempInput);
		localStorage.setItem("tempInput",JSON.stringify(avTemp));
	}
	
	var price=JSON.parse(localStorage.getItem("elecPrice"));
	var SP=JSON.parse(localStorage.getItem("tempSetUp"));
	var wallTherm=JSON.parse(localStorage.getItem("wallHL"));
	
	for (i=0;i<avTemp.length;i++){
		var WHL=((((SP-avTemp[0])*24*January*wallTherm) +((SP-avTemp[1])*24*February*wallTherm)+((SP-avTemp[2])*24*March*wallTherm)+((SP-avTemp[3])*24*April*wallTherm)+((SP-avTemp[4])*24*May*wallTherm)+((SP-avTemp[5])*24*June*wallTherm)+((SP-avTemp[6])*24*July*wallTherm)+((SP-avTemp[7])*24*August*wallTherm)+((SP-avTemp[8])*24*September*wallTherm)+((SP-avTemp[9])*24*October*wallTherm)+((SP-avTemp[10])*24*November*wallTherm)+((SP-avTemp[11])*24*December*wallTherm))/1000);
	}
	localStorage.setItem("wallHeatLoss", JSON.stringify(WHL));
	

	var roofTherm=JSON.parse(localStorage.getItem("roofHL"));
	for (i=0;i<avTemp.length;i++){
		var RHL=((((SP-avTemp[0])*24*January*roofTherm) +((SP-avTemp[1])*24*February*roofTherm)+((SP-avTemp[2])*24*March*roofTherm)+((SP-avTemp[3])*24*April*roofTherm)+((SP-avTemp[4])*24*May*roofTherm)+((SP-avTemp[5])*24*June*roofTherm)+((SP-avTemp[6])*24*July*roofTherm)+((SP-avTemp[7])*24*August*roofTherm)+((SP-avTemp[8])*24*September*roofTherm)+((SP-avTemp[9])*24*October*roofTherm)+((SP-avTemp[10])*24*November*roofTherm)+((SP-avTemp[11])*24*December*roofTherm))/1000);
	}
	localStorage.setItem("roofHeatLoss", JSON.stringify(RHL));
	
	
	var floorTherm=JSON.parse(localStorage.getItem("floorHL"));
	for (i=0;i<avTemp.length;i++){
		var FHL=((((SP-avTemp[0])*24*January*floorTherm) +((SP-avTemp[1])*24*February*floorTherm)+((SP-avTemp[2])*24*March*floorTherm)+((SP-avTemp[3])*24*April*floorTherm)+((SP-avTemp[4])*24*May*floorTherm)+((SP-avTemp[5])*24*June*floorTherm)+((SP-avTemp[6])*24*July*floorTherm)+((SP-avTemp[7])*24*August*floorTherm)+((SP-avTemp[8])*24*September*floorTherm)+((SP-avTemp[9])*24*October*floorTherm)+((SP-avTemp[10])*24*November*floorTherm)+((SP-avTemp[11])*24*December*floorTherm))/1000);
	}
	localStorage.setItem("floorHeatLoss", JSON.stringify(FHL));
	
	
	var windowsTherm=JSON.parse(localStorage.getItem("windowsHL"));
	for (i=0;i<avTemp.length;i++){
		var WiHL=((((SP-avTemp[0])*24*January*windowsTherm) +((SP-avTemp[1])*24*February*windowsTherm)+((SP-avTemp[2])*24*March*windowsTherm)+((SP-avTemp[3])*24*April*windowsTherm)+((SP-avTemp[4])*24*May*windowsTherm)+((SP-avTemp[5])*24*June*windowsTherm)+((SP-avTemp[6])*24*July*windowsTherm)+((SP-avTemp[7])*24*August*windowsTherm)+((SP-avTemp[8])*24*September*windowsTherm)+((SP-avTemp[9])*24*October*windowsTherm)+((SP-avTemp[10])*24*November*windowsTherm)+((SP-avTemp[11])*24*December*windowsTherm))/1000);
	}
	localStorage.setItem("windowsHeatLoss", JSON.stringify(WiHL));
	
	
	var doorsTherm=JSON.parse(localStorage.getItem("doorsHL"));
	for (i=0;i<avTemp.length;i++){
		var DHL=((((SP-avTemp[0])*24*January*doorsTherm) +((SP-avTemp[1])*24*February*doorsTherm)+((SP-avTemp[2])*24*March*doorsTherm)+((SP-avTemp[3])*24*April*doorsTherm)+((SP-avTemp[4])*24*May*doorsTherm)+((SP-avTemp[5])*24*June*doorsTherm)+((SP-avTemp[6])*24*July*doorsTherm)+((SP-avTemp[7])*24*August*doorsTherm)+((SP-avTemp[8])*24*September*doorsTherm)+((SP-avTemp[9])*24*October*doorsTherm)+((SP-avTemp[10])*24*November*doorsTherm)+((SP-avTemp[11])*24*December*doorsTherm))/1000);
	localStorage.setItem("doorsHeatLoss", JSON.stringify(DHL));
	
	}
};

//This function clears the monthly average temperatures
function clearAvTemp(){
	
	while(avTemp.length > 0) {
		avTemp.pop();
	}
	
	localStorage.clear("tempInput");
	localStorage.clear("wallHeatLoss");
	localStorage.clear("roofHeatLoss");
	localStorage.clear("floorHeatLoss");
	localStorage.clear("windowsHeatLoss");
	localStorage.clear("doorsHeatLoss");
	WHL=0;
	RHL=0;
	FHL=0;
	WiHL=0;
	DHL=0;
	price=0.24;
	SP=20;
	wallTherm=0;
	roofTherm=0;
	floorTherm=0;
	windowsTherm=0;
	doorsTherm=0;
}

//This function handles the GPS coordinates
function geolocation(){
	
	var options={enableHighAccuraccy: true};
		getID=navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
		
		function onSuccess(position){
			
			var lat=position.coords.latitude;
			var lgt=position.coords.longitude*(0-1);
			localStorage.setItem("latitude",JSON.stringify(lat));
			localStorage.setItem("longitude",JSON.stringify(lgt));
		}
	function onError(error){
		alert("Message: "+error.message);
	};
};

//This function handles the camera
var takePicture = function () {

	
  navigator.camera.getPicture(function(imageURI) {

    // imageURI is the URL of the image that we can use for
    // an <img> element or backgroundImage.
	$("#picture").attr("src", imageURI);
  
  

  }, function(err) {

    alert("Error");
  }, { 
  quality: 100,
  destinationType: Camera.DestinationType.FILE_URI,
  sourceType: Camera.PictureSourceType.CAMERA,
  encodingType: Camera.EncodingType.JPEG,
  targetWidth: 300,
  targetHeight: 300,
  cameraDirection: 0,
  saveToPhotoAlbum: true,
  correctOrientation: true
})

function openFilePicker(selection) {

    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = setOptions(srcType);
    var func = createNewFileEntry;

    navigator.camera.getPicture(function cameraSuccess(imageUri) {


    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
}
}

