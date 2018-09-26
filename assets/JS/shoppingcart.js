// method for add items to the cart
// $("#addCartForm").on("submit", function (event) {
//     event.preventDefault();
var userId = "First User";
function addCart(){

    console.log("Adding to Cart");
    var itemId = $(this).attr("data-itemId");
    var qty =$('#'+itemId);
    var itemSelected;
    for(var i=0; i<totalSearch.length; i++){
        if(totalSearch[i].itemId == itemId){
            itemSelected = totalSearch[i];
            break;
        }
    }
    console.log(totalSearch);
    db.ref(userId).once("value", function (snapshot) {
        var userCart = snapshot.val();
        console.log(userCart);
        var itemInfo = [];
        if(userCart == null || !userCart){
            itemInfo = [{
                name: itemSelected.name,
                price : itemSelected.price,
                quantity: qty,
                itemId: itemId
            }];
        }else{
            itemInfo=userCart;
            itemInfo.push({
                name: itemSelected.name,
                price : itemSelected.price,
                quantity: qty,
                itemId: itemId
            });
        }
        db.ref(userId).set(itemInfo);
    }, function (error) {
        console.log(error);
    });
};

//addCart();
// method for search the user cart

// method for clear cart
function clearCart(){

    db.ref(userId).remove();
};//);


// // method for update cart
db.ref(userId).on("child_added", function (childSnapshot) {

    var $shoppingCart = $('#shoppingCart');
    var tableBody = $('#tableBody');
    if(childSnapshot && childSnapshot != null){
        var cart = childSnapshot.val();
        console.log(cart);
        console.log('IN');
        var tr = $("<tr>")
        var name = $("<td class='text-left'>").text(cart.name);
        var qty = $("<td>").text(cart.quantity);
        var price = $("<td>").text("$"+cart.price);
        tr.append(name, qty, price);
        console.log(tr);
        tableBody
            .append(tr);
        $(".cartImg").addClass('hiddeEmptyCart');
            
    }else{
        tableBody
            .addClass(shopTable)
            .append(tr);
        $(".cartImg").removeClass('hiddeEmptyCart');
    }
});

$(document).on("click", ".addToCartBtn", addCart);