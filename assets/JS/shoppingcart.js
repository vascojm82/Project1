// method for add items to the cart
// $("#addCartForm").on("submit", function (event) {
//     event.preventDefault();

function addCart() {
    var itemId = $(this).attr("data-itemId");
    var qty = $('#' + itemId);
    var itemSelected;
    for (var i = 0; i < totalSearch.length; i++) {
        if (totalSearch[i].itemId == itemId) {
            itemSelected = totalSearch[i];
            break;
        }
    }
    console.log(totalSearch);
    db.ref(userId).once("value", function (snapshot) {
        var userCart = snapshot.val();
        var itemInfo = [];
        if (userCart == null || !userCart) {
            itemInfo = [{
                name: itemSelected.name,
                price: itemSelected.price,
                quantity: qty.val(),
                itemId: itemId
            }];
        } else {
            itemInfo = userCart;
            itemInfo.push({
                name: itemSelected.name,
                price: itemSelected.price,
                quantity: qty.val(),
                itemId: itemId
            });
        }
        db.ref(userId).set(itemInfo);
        qty.text("");
    }, function (error) {
        console.log(error);
    });
};

//addCart();
// method for search the user cart

// method for clear cart
function clearCart() {

    db.ref(userId).remove();
};//);


function shoppingCart(cart) {
    if (cart != null) {
        var $total = $('#total');
        var $tax =  $('#tax');
        var $subtotal = $('#subtotal');
        var total = parseInt($total.text().replace("$", ""));
        var tax =  parseInt($tax.text().replace("$", ""));
        var subtotal = parseInt($subtotal.text().replace("$", ""));
        var tableBody = $('#tableBody');
        var tr = $("<tr>")
        var name = $("<td class='text-left'>").text(cart.name);
        var qty = $("<td>").text(cart.quantity);
        var price = $("<td>").text("$" + cart.price);
        subtotal += (parseInt(cart.quantity) * parseFloat(cart.price));
        
        tr.append(name, qty, price);
        tableBody.append(tr);
        $(".cartImg").addClass('hiddeEmptyCart');
        var tax = (subtotal *7)/100;
        tax = parseFloat(tax).toFixed(2);
        total =(parseFloat(subtotal) + parseFloat(tax)) ;
        total = parseFloat(total).toFixed(2);
        $subtotal.text("$"+subtotal);
        $tax.text("$"+tax);
        $total.text("$"+total);
    }

}

function addChild() {
    // // method for update cart
    db.ref(userId).on("child_added", function (childSnapshot) {

        if (childSnapshot && childSnapshot != null) {
            shoppingCart(childSnapshot.val());
        } else {
            $(".cartImg").removeClass('hiddeEmptyCart');
        }
    });
}


$(document).on("click", ".addToCartBtn", addCart);