var shopApp = new Vue({
    el: '#shopApp',
    data: {
        products: [],
        categories: [],
        colors: []
    },
    created: function () {
        //Get products and arrange them in arrays containing three products each
        $.get('/api/products/', (response) => {
            var sliceList = [];

            //Arrange array into arrays with 3 objects in each
            for (let i = 0; i < response.length; i += 3) {
                sliceList.push(response.slice(i, i + 3));
            }

            this.products = sliceList;
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
