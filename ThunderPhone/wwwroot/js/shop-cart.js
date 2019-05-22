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
                let setItems = async () => {
                    return {
                        brand: await new Promise((resolve) => {
                            $.get('/api/brands/' + response.brandId, (result) => {
                                resolve(result);
                            });
                        }),
                        color: await new Promise((resolve) => {
                            $.get('/api/colors/' + response.colorId, (result) => {
                                resolve(result);
                            });
                        }),
                        category: await new Promise((resolve) => {
                            $.get('/api/categories/' + response.categoryId, (result) => {
                                resolve(result);
                            });
                        }),
                        image: await new Promise((resolve) => {
                            $.get('/api/images/' + response.id, (result) => {
                                resolve(result[0].imagePath);
                            });
                        })
                    };
                };

                setItems().then((result) => {
                    resultObject = response;

                    //Replace the empty property values with the newly fetched objects
                    resultObject.brand = result.brand;
                    resultObject.color = result.color;
                    resultObject.category = result.category;
                    resultObject.imagePath = result.image;
                    resultObject.amount = item.amount;

                    this.itemAmounts.push(item.amount);

                    this.items.push(resultObject);
                });
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