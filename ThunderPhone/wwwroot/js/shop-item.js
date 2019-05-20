//Fetch the images of the product
$.get('/api/images/' + $('#Id').val(), (response) => {
    $('#productImage').attr('src', response[0].imagePath)
});

$('#AddToCart').on('click', () => {
    if (typeof Storage !== 'undefined') {
        let cart = localStorage.getItem('cart');

        if (cart === null) {
            localStorage.setItem('cart', [$('#ProductId').val()]);

            //Add one to the cart menu-link in the navigation bar
            $('#CartItems').html(parseInt($('#CartItems').html()) + 1);
            return;
        }

        let cartArray = cart.split(' ');
        cartArray.push($('#ProductId').val());

        localStorage.setItem('cart', cartArray);

        //Add one to the cart menu-link in the navigation bar
        $('#CartItems').html(parseInt($('#CartItems').html()) + 1);
    }
});