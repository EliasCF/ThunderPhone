//Fetch the images of the product
$.get('/api/images/' + $('#Id').val(), (response) => {
    $('#productImage').attr('src', response[0].imagePath);
});

$('#AddToCart').on('click', () => {
    if (typeof Storage !== 'undefined') {
        let cart = localStorage.getItem('cart');

        if (cart === null) {
            localStorage.setItem('cart', JSON.stringify(
                [{
                    product: $('#ProductId').val(),
                    amount: 1
                }]));

            //Add one to the cart menu-link in the navigation bar
            $('#CartItems').html(parseInt($('#CartItems').html()) + 1);
            return;
        }

        let cartArray = JSON.parse(cart);
        let itemIsDuplicate = false;

        //If the current item being added matches an items in the cart,
        //then increment the amount property of that cart item
        cartArray.forEach((item, index) => {
            if (item.product === $('#ProductId').val()) {
                cartArray[index].amount += 1;
                itemIsDuplicate = true;
            }
        });

        //Check if the current item was not found in the cart
        if (!itemIsDuplicate) {
            cartArray.push({
                product: $('#ProductId').val(),
                amount: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cartArray));

        //Add one to the cart menu-link in the navigation bar
        $('#CartItems').html(parseInt($('#CartItems').html()) + 1);
    }
});