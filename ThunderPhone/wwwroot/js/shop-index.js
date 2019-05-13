var shopApp = new Vue({
    el: '#shopApp',
    data: {
        products: []
    },
    created: function () {
        $.get('/api/products/', (response) => {
            /*
            for (let i = 0; i < response.length; i++) {
                $.get('/api/images/' + response[i].id, (image) => {
                    //response[i].imagePath = image[0].imagePath;

                    Object.assign(response[i], { imagePath: image[0].imagePath });
                });
            }
            */

            var data = [];

            //Arrange array into arrays with 3 objects in each
            for (let i = 0; i < response.length; i += 3) {
                data.push(response.slice(i, i + 3));
            }

            this.products = data;
        });
    },
    methods: {
        getImagePath: function (id) {
            result = null;

            $.ajax({
                url: '/api/images/' + id,
                type: 'get',
                async: false,
                success: function (image) {
                    result = image[0].imagePath;
                }
            });

            return result;
        }
    }
});
