// method for add items to the cart
// $("#addCartForm").on("submit", function (event) {
//     event.preventDefault();
var userId = "First User";
function addCart(){

    console.log("Adding to Cart");
    var itemId = $(this).attr("data-itemId");
   
    var itemSelected;
    for(var i=0; i<totalSearch.length; i++){
        if(totalSearch[i].itemId === itemId){
            itemSelected = totalSearch[i];
            break;
        }
    }
    console.log(itemSelected);
    db.ref(userId).once("value", function (snapshot) {
        var userCart = snapshot.val();
        console.log(userCart);
        var itemInfo = [];
        if(userCart == null || !userCart){
            itemInfo = [{
                user: 'USER',
                name: itemSelected.name,
                quantity: 8,
                itemId: itemId
            }];
            
            
        }else{
            itemInfo=userCart;
            itemInfo.push({
                user: 'USER2',
                name: itemSelected.name,
                quantity: 9,
                itemId: itemId
            });
        }
        db.ref(userId).set(itemInfo);
    }, function (error) {
        console.log(error);
    });
};//);

//addCart();
// method for search the user cart

// method for clear cart
function clearCart(){

    db.ref(userId).remove();
};//);






// // method for update cart
db.ref(userId).on("child_added", function (childSnapshot) {

    var $shoppingCart = $('#shoppingCart');
    if(childSnapshot && childSnapshot != null){
        console.log('IN');
        console.log(childSnapshot.val());

    }else{
        
    }
});


$(document).on("click", ".addToCartBtn", addCart);