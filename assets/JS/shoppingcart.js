// method for add items to the cart
// $("#addCartForm").on("submit", function (event) {
//     event.preventDefault();
var userId = "First User";
function addCart(){

    
    db.ref(userId).once("value", function (snapshot) {
        var userCart = snapshot.val();
        console.log(userCart);
        var itemInfo = [];
        if(userCart == null || !userCart){
            itemInfo = [{
                user: 'USER',
                name: 'test',
                quantity: 8,
                itemId: 252525
            }];
            
            
        }else{
            itemInfo=userCart;
            itemInfo.push({
                user: 'USER2',
                name: 'test2',
                quantity: 9,
                itemId: 2525
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
clearCart();





// // method for update cart
// database.ref(userId).on("child_added", function (childSnapshot) {

//     var newTr = $('<tr class="train">').append(
//         $('<td>').text(childSnapshot.val().name),
//         $('<td>').text(childSnapshot.val().destination),
//         $('<td>').text(childSnapshot.val().frecuency)
//     );
//     calcNextArrival(newTr, childSnapshot.val().time, childSnapshot.val().frecuency);
//     $('#trainList').append(newTr);
// });