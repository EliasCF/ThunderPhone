var CartApp = new Vue({
    el: 'CartApp',
    data: {
        items: []
    },
    created: function () {
        let cart = localStorage.getItem('cart');

        //leave this.items empty if the cart item is empty or uncreated
        if (cart === null || cart === '') {
            return;
        }

        cart.split(',').forEach((item) => {
            console.log(item);
        });
    }
});