//JavaScript for The Lion Shop Website

//This function handle the change of price of the first shoe item in shoe.html
function priceShoe1(){
	
	switch ($('.shoe1').val())	{	//In function of the shoe size
		
		case "69":						
		shoe1Price=69;					//The price is €69 for size 4 to 6
		break;
			
		case "79":						
		shoe1Price=79;					//The price is €79 for size 7 to 9
		break;
			
		case "84":
		shoe1Price=84;					//The price is €84 for size 10 to 11
		break;
			
		default:					
			break;
	}
	$('#shoe1Price').text(shoe1Price);	//This change the price of the first shoe item in shoe.html
};

//This function handle the change of price of the second shoe item in shoe.html and works on the same principle than the first shoe item
function priceShoe2(){
	
	switch ($('.shoe2').val())	{
	

		case "99":
		shoe2Price=99;
		break;
		
		case "109":
		shoe2Price=109;
		break;
		
		case "119":
		shoe2Price=119;
		break;
		
		default:
			break;
	}
	$('#shoe2Price').text("€ "+ shoe2Price);
};

//This function handle the change of price of the third shoe item in shoe.html and works on the same principle than the first shoe item
function priceShoe3(){
	
	switch ($('.shoe3').val())	{
	
		case "64":
		shoe3Price=64;
		break;
		
		case "69":
		shoe3Price=69;
		break;
		
		case "79":
		shoe3Price=79;
		break;
		
		default:
			break;
	}
	$('#shoe3Price').text("€ "+ shoe3Price);
};

//This function handle the change of price of the first tracksuit item in trackSuits.html and works on the same principle than the first shoe item
function priceTS1(){
	
	switch ($('.TS1').val())	{
	
		case "49":
		TS1Price=49;
		break;
		
		case "54":
		TS1Price=54;
		break;
			
		default:
			break;
	}
	$('#TS1Price').text("€ "+ TS1Price);
};

//This function handle the change of price of the second tracksuit item in trackSuits.html and works on the same principle than the first shoe item
function priceTS2(){
	
	switch ($('.TS2').val())	{
	
		case "109":
		TS2Price=109;
		break;
		
		case "119":
		TS2Price=119;
		break;
			
		default:
			break;
	}
	$('#TS2Price').text("€ "+ TS2Price);
};

//This function handle the change of price of the third tracksuit item in trackSuits.html and works on the same principle than the first shoe item
function priceTS3(){
	
	switch ($('.TS3').val())	{
	
		case "79":
		TS3Price=79;
		break;
		
		case "89":
		TS3Price=89;
		break;
			
		default:
			break;
	}
	$('#TS3Price').text("€ "+ TS3Price);
};

//This function handle the change of price of the first kit item in kits.html and works on the same principle than the first shoe item
function priceKit1(){
	
	switch ($('.kit1').val())	{
	
		case "39":
		kit1Price=39;
		break;
		
		case "44":
		kit1Price=44;
		break;
		
		case "49":
		kit1Price=49;
		break;
		
		default:
			break;
	}
	$('#kit1Price').text("€ "+ kit1Price);
};

//This function handle the change of price of the second kit item in kits.html and works on the same principle than the first shoe item
function priceKit2(){
	
	switch ($('.kit2').val())	{
		
		case "149":
		kit2Price=149;
		break;
		
		case "179":
		kit2Price=179;
		break;
		
		default:
			break;
	}
	$('#kit2Price').text("€ "+ kit2Price);
};

//This function handle the change of price of the second kit item in kits.html and works on the same principle than the first shoe item
function priceKit3(){
	
	switch ($('.kit3').val())	{
	
		case "74":
		kit3Price=74;
		break;
		
		case "79":
		kit3Price=79;
		break;
		
		case "89":
		kit3Price=89;
		break;
		
		default:
			break;
	}
	$('#kit3Price').text("€ "+ kit3Price);
};

// This function handle the creation of the cart in cart.html by fetching the names of the items, their prices as well as the quantities involved and calculate
//the subtotal. It also creates the tables for the cart, check the validity of inputs and allows to empty the cart.
(function( $ ) {
	$.Shop = function( element ) {
		this.$element = $( element );
		this.init();
	};
	
	$.Shop.prototype = {
		init: function() {
		
		    // Properties
		
			this.cartPrefix = "shop-"; // Prefix string to be prepended to the cart's name in the session storage
			this.cartName = this.cartPrefix + "cart"; // Cart name in the session storage
			this.shippingRates = this.cartPrefix + "shipping-rates"; // Shipping rates key in the session storage
			this.total = this.cartPrefix + "total"; // Total key in the session storage
			this.storage = sessionStorage; // shortcut to the sessionStorage object
			
			
			this.$formAddToCart = this.$element.find( "form.add-to-cart" ); // Forms for adding items to the cart
			this.$formCart = this.$element.find( "#shopping-cart" ); // Shopping cart form
			this.$checkoutCart = this.$element.find( "#checkout-cart" ); // Checkout form cart
			this.$checkoutOrderForm = this.$element.find( "#checkout-order-form" ); // Checkout user details form
			this.$shipping = this.$element.find( "#sshipping" ); // Element that displays the shipping rates
			this.$subTotal = this.$element.find( "#stotal" ); // Element that displays the subtotal charges
			this.$shoppingCartActions = this.$element.find( "#shopping-cart-actions" ); // Cart actions links
			this.$updateCartBtn = this.$shoppingCartActions.find( "#update-cart" ); // Update cart button
			this.$emptyCartBtn = this.$shoppingCartActions.find( "#empty-cart" ); // Empty cart button

			
			
			this.currency = "&euro;"; // HTML entity of the currency to be displayed in the layout
			this.currencyString = "€"; // Currency symbol as textual string

			// Object containing patterns for form validation
			this.requiredFields = {
				expression: {
					value: /^([\w-\.]+)@((?:[\w]+\.)+)([a-z]){2,4}$/
				},
				
				str: {
					value: ""
				}
				
			};
			
			// Method invocation
			
			this.createCart();
			this.handleAddToCartForm();
			this.emptyCart();
			this.displayCart();
			
			
		},
		
		// Public methods
		
		// Creates the cart keys in the session storage
		
		createCart: function() {
			if( this.storage.getItem( this.cartName ) == null ) {
			
				var cart = {};
				cart.items = [];
			
				this.storage.setItem( this.cartName, this._toJSONString( cart ) );
				this.storage.setItem( this.shippingRates, "0" );
				this.storage.setItem( this.total, "0" );
			}
		},
		

		

		// Displays the shopping cart
		
		displayCart: function() {
			if( this.$formCart.length ) {
				var cart = this._toJSONObject( this.storage.getItem( this.cartName ) );
				var items = cart.items;
				var $tableCart = this.$formCart.find( ".shopping-cart" );
				var $tableCartBody = $tableCart.find( "tbody" );
				
				
				for( var i = 0; i < items.length; ++i ) {
					var item = items[i];
					var product = item.product;
					var price = this.currency + " " + item.price;
					var qty = item.qty;
					var html = "<tr><td class='pname'>" + product + "</td>" + "<td class='pqty'><input type='text' value='" + qty + "' class='qty'/></td>" + "<td class='pprice'>" + price + "</td></tr>";
					
					$tableCartBody.html( $tableCartBody.html() + html );
				}
				
				var total = this.storage.getItem( this.total );
				this.$subTotal[0].innerHTML = this.currency + " " + total;
			} else if( this.$checkoutCart.length ) {
				var checkoutCart = this._toJSONObject( this.storage.getItem( this.cartName ) );
				var cartItems = checkoutCart.items;
				var $cartBody = this.$checkoutCart.find( "tbody" );
				
				for( var j = 0; j < cartItems.length; ++j ) {
					var cartItem = cartItems[j];
					var cartProduct = cartItem.product;
					var cartPrice = this.currency + " " + cartItem.price;
					var cartQty = cartItem.qty;
					var cartHTML = "<tr><td class='pname'>" + cartProduct + "</td>" + "<td class='pqty'>" + cartQty + "</td>" + "<td class='pprice'>" + cartPrice + "</td></tr>";
					
					$cartBody.html( $cartBody.html() + cartHTML );
				}
				
				var cartTotal = this.storage.getItem( this.total );
				var cartShipping = this.storage.getItem( this.shippingRates );
				var subTot = this._convertString( cartTotal ) + this._convertString( cartShipping );
				
				this.$subTotal[0].innerHTML = this.currency + " " + this._convertNumber( subTot );
				this.$shipping[0].innerHTML = this.currency + " " + cartShipping;
			
			}
		},
		
		// Empties the cart by calling the _emptyCart() method
		// @see $.Shop._emptyCart()
		
		emptyCart: function() {
			var self = this;
			if( self.$emptyCartBtn.length ) {
				self.$emptyCartBtn.on( "click", function() {
					self._emptyCart();
				});
			}
		},
		
		
		
		// Adds items to the shopping cart
		
		handleAddToCartForm: function() {
			var self = this;
			self.$formAddToCart.each(function() {
				var $form = $( this );
				var $product = $form.parent();
				var name =  $product.data( "name" );
				
				$form.on( "submit", function() {
					var qty = self._convertString( $form.find( ".qty" ).val() );
					var price = self._convertString( $form.find( "#testshoe" ).val() );
					var subTotal = qty * price;
					var total = self._convertString( self.storage.getItem( self.total ) );
					var sTotal = total + subTotal;
					self.storage.setItem( self.total, sTotal );
					self._addToCart({
						product: name,
						price: price,
						qty: qty
					});
					var shipping = self._convertString( self.storage.getItem( self.shippingRates ) );
					var shippingRates = self._calculateShipping( qty );
					var totalShipping = shipping + shippingRates;
					
					self.storage.setItem( self.shippingRates, totalShipping );
				});
			});
			var tot=self._convertString( self.storage.getItem( self.total ) );
			$('#total2BPaid').text("The Total To Be Paid Is: €"+ tot);
			$("p4").text("The Amount Debited From Your Account Is: €" + tot);
			
			
		},
		
		// Private methods
		
		
		// Empties the session storage
		
		_emptyCart: function() {
			this.storage.clear();
		},
		
		/* Format a number by decimal places
		 * @param num Number the number to be formatted
		 * @param places Number the decimal places
		 * @returns n Number the formatted number
		 */
		 
		 
		
		_formatNumber: function( num, places ) {
			var n = num.toFixed( places );
			return n;
		},
		
		/* Extract the numeric portion from a string
		 * @param element Object the jQuery element that contains the relevant string
		 * @returns price String the numeric string
		 */
		
		
		_extractPrice: function( element ) {
			var self = this;
			var text = element.text();
			var price = text.replace( self.currencyString, "" ).replace( " ", "" );
			return price;
		},
		
		/* Converts a numeric string into a number
		 * @param numStr String the numeric string to be converted
		 * @returns num Number the number
		 */
		
		_convertString: function( numStr ) {
			var num;
			if( /^[-+]?[0-9]+\.[0-9]+$/.test( numStr ) ) {
				num = parseFloat( numStr );
			} else if( /^\d+$/.test( numStr ) ) {
				num = parseInt( numStr, 10 );
			} else {
				num = Number( numStr );
			}
			
			if( !isNaN( num ) ) {
				return num;
			} else {
				console.warn( numStr + " cannot be converted into a number" );
				return false;
			}
		},
		
		/* Converts a number to a string
		 * @param n Number the number to be converted
		 * @returns str String the string returned
		 */
		
		_convertNumber: function( n ) {
			var str = n.toString();
			return str;
		},
		
		/* Converts a JSON string to a JavaScript object
		 * @param str String the JSON string
		 * @returns obj Object the JavaScript object
		 */
		
		_toJSONObject: function( str ) {
			var obj = JSON.parse( str );
			return obj;
		},
		
		/* Converts a JavaScript object to a JSON string
		 * @param obj Object the JavaScript object
		 * @returns str String the JSON string
		 */
		
		
		_toJSONString: function( obj ) {
			var str = JSON.stringify( obj );
			return str;
		},
		
		
		/* Add an object to the cart as a JSON string
		 * @param values Object the object to be added to the cart
		 * @returns void
		 */
		
		
		_addToCart: function( values ) {
			var cart = this.storage.getItem( this.cartName );
			
			var cartObject = this._toJSONObject( cart );
			var cartCopy = cartObject;
			var items = cartCopy.items;
			items.push( values );
			
			this.storage.setItem( this.cartName, this._toJSONString( cartCopy ) );
		},
		
		
		/* Custom shipping rates calculation based on the total quantity of items in the cart
		 * @param qty Number the total quantity of items
		 * @returns shipping Number the shipping rates
		 */
		
		_calculateShipping: function( qty ) {
			var shipping = 0;
			if( qty >= 6 ) {
				shipping = 10;
			}
			if( qty >= 12 && qty <= 30 ) {
				shipping = 20;	
			}
			
			if( qty >= 30 && qty <= 60 ) {
				shipping = 30;	
			}
			
			if( qty > 60 ) {
				shipping = 0;
			}
			
			return shipping;
		
		},
		
		
		/* Validates the checkout form
		 * @param form Object the jQuery element of the checkout form
		 * @returns valid Boolean true for success, false for failure
		 */
		 
		 
		
		_validateForm: function( form ) {
			var self = this;
			var fields = self.requiredFields;
			var $visibleSet = form.find( "fieldset:visible" );
			var valid = true;
			
			form.find( ".message" ).remove();
			
		  $visibleSet.each(function() {
			
			$( this ).find( ":input" ).each(function() {
				var $input = $( this );
				var type = $input.data( "type" );
				var msg = $input.data( "message" );
				
				if( type == "string" ) {
					if( $input.val() == fields.str.value ) {
						$( "<span class='message'/>" ).text( msg ).
						insertBefore( $input );
						
						valid = false;
					}
				} else {
					if( !fields.expression.value.test( $input.val() ) ) {
						$( "<span class='message'/>" ).text( msg ).
						insertBefore( $input );
						
						valid = false;
					}
				}
				
			});
		  });
			
			return valid;
		
		},
		

	};
	
	$(function() {
		var shop = new $.Shop( "#site" );
	});

})( jQuery );
