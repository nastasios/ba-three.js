 // get card total from session storage
 getCardTotal();
// On Click run emptyCheckout()
 document.getElementById("emptyCard").addEventListener("click", emptyCheckout);
 const btn = document.getElementsByClassName('add-button');
 for (var i = 0; i < btn.length; i++) {
   btn[i].addEventListener('click', function() {
     addToCard(this);
   });
 }

 function addToCard(elem) {
   var siblings = [];
   var getPrice;
   var getProductName;
   var card = [];
   var stringCard;

   while(elem = elem.previousSibling) {
     if (elem.nodeType === 3) continue;
     if(elem.className == "product-price") {
       getPrice = elem.innerText;
     }
     if (elem.className == "product-title") {
       getProductName = elem.innerText
     }
     siblings.push(elem)
   }
   // Product Object
   const product = {
     productName : getProductName,
     price : getPrice
   };
   // Product to JSON
   const stringProduct = JSON.stringify(product);

   // Send to Session Storage
   if(!sessionStorage.getItem('card')) {
     card.push(stringProduct);
     stringCard = JSON.stringify(card);

     sessionStorage.setItem('card', stringCard);
     //addedToCard(getProductName);
     getCardTotal();
   } else {
     // Update Session Storage
     card = JSON.parse(sessionStorage.getItem('card'));
     // Append new product
     card.push(stringProduct);

     stringCard = JSON.stringify(card);
     // Overwrite Card Data in Session Storage
     sessionStorage.setItem('card', stringCard);
     //addedToCard(getProductName);
     getCardTotal();
   }
 }

 // Σ for total
 function getCardTotal() { 
   var total = 0;
   var price = 0;
   var items = 0;
   var productName = "";
   var checkoutList = "";
   if (sessionStorage.getItem('card')) {
     // Get Card Data
     const card = JSON.parse(sessionStorage.getItem('card'));
     // Get Number of Items
     items = card.length;

     for (var i = 0; i < items; i++) {
       // Convert each JSON into Obejct
       const x = JSON.parse(card[i]);

       price = parseFloat(x.price);
       productName = x.productName;
       checkoutList += "<div>" + "<p>" + productName + "</p>" + "<p>" + price.toFixed(2) + " €" + "</p>" + "</div>";
       total += price;
     }
   }
   // Update total price
   document.getElementById("total").innerHTML = total.toFixed(2) + " €";
   // Add products
   document.getElementById("checkoutList").innerHTML = checkoutList;
   // Update amount
   document.getElementById("items").innerHTML = items + "x";
 }

 // Empty Checkout
 function emptyCheckout() {
   if(sessionStorage.getItem('card')) {
     sessionStorage.removeItem('card');
     getCardTotal();
   }
 }

 // Checkout-Button On Click
 document.getElementById('checkout').addEventListener("click", function() {
   alert("Thank you for going through the process, please visit now the Metaverse")
 })

 // SLIDER
 var currentSliderIndex = 1;
 displaySlides(currentSliderIndex);
 displaySlidesTwo(currentSliderIndex);
 displaySlidesThree(currentSliderIndex);
 // First Slider
 function displaySlides(num) {
   var y;
   var slides = document.getElementsByClassName("imgSlides");
   if (num > slides.length) { 
     currentSliderIndex = 1 
   }
   if (num < 1) {
     currentSliderIndex = slides.length
   }
   for ( y = 0; y < slides.length; y++) {
     slides[y].style.display = "none";
   }
   slides[currentSliderIndex - 1].style.display = "block";
 };

 function setSlides(num) {
   displaySlides(currentSliderIndex += num);
 }
 // Second Slider
 function displaySlidesTwo(num) {
   var y;
   const slides = document.getElementsByClassName("imgSlidesTwo");
   if (num > slides.length) { 
     currentSliderIndex = 1 
   }
   if (num < 1) {
     currentSliderIndex = slides.length
   }
   for ( y = 0; y < slides.length; y++) {
     slides[y].style.display = "none";
   }
   slides[currentSliderIndex - 1].style.display = "block";
 };

 function setSlidesTwo(num) {
   displaySlidesTwo(currentSliderIndex += num);
 }
 // Third Slider
 function displaySlidesThree(num) {
   var y;
   const slides = document.getElementsByClassName("imgSlidesThree");
   if (num > slides.length) { 
     currentSliderIndex = 1 
   }
   if (num < 1) {
     currentSliderIndex = slides.length
   }
   for ( y = 0; y < slides.length; y++) {
     slides[y].style.display = "none";
   }
   slides[currentSliderIndex - 1].style.display = "block";
 };

 function setSlidesThree(num) {
   displaySlidesThree(currentSliderIndex += num);
 }
 