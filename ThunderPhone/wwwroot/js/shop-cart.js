var CartApp = new Vue({
    el: '#CartApp',
    data: {
        items: [],
        itemAmounts: []
    },
    created: function () {
        let cart = localStorage.getItem('cart');

        //leave this.items empty if the cart item is empty or uncreated
        if (cart === null || cart === '') {
            return;
        }

        JSON.parse(cart).forEach((item) => {
            $.get('/api/products/' + item.product, (response) => {
                this.items.push(response);
                this.itemAmounts.push(item.amount);
            });
        });
    },
    methods: {
        editItemAmount: function (productId, newAmount) {
            let cart = JSON.parse(localStorage.getItem('cart'));

            //Find correct item and update amount property
            cart.forEach((item, index) => {
                if (item.product === productId) {
                    let amount = $('#CartItems').html() - cart[index].amount;
                    amount += parseInt(newAmount);

                    //Adjust product amount in navbar 
                    $('#CartItems').html(parseInt(amount));

                    cart[index].amount = parseInt(newAmount);
                }
            });

            localStorage.setItem('cart', JSON.stringify(cart));
        },
        removeItem: function (productId) {
            let cart = JSON.parse(localStorage.getItem('cart'));

            //Remove the amount of the product from the overall amount displayed in the navbar
            $('#CartItems').html(parseInt($('#CartItems').html()) - cart.filter(item => item.product === productId)[0].amount);

            //Filter product out of localstorage item
            localStorage.setItem('cart',
                JSON.stringify(
                    cart.filter(item =>
                        item.product !== productId)
                )
            );

            //Remove product from items array
            this.items = this.items.filter(item => item.productId !== productId);
        }
    }
});