var CartApp = new Vue({
    el: '#CartApp',
    data: {
        items: []
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
                        })
                    };
                };

                setItems().then((result) => {
                    resultObject = response;

                    //Replace the empty property values with the newly fetched objects
                    resultObject.brand = result.brand;
                    resultObject.color = result.color;
                    resultObject.category = result.category;

                    this.items.push(resultObject);
                });
            });
        });
    }
});