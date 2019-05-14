var shopApp = new Vue({
    el: '#shopApp',
    data: {
        products: [],
        categories: [],
        colors: [],
        brands: [],
        selected: {
            category: 'Alle',
            color: 'Alle',
            brand: 'Alle'
        }
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

        //Get categories
        $.get('/api/categories', (response) => {
            this.categories = response;
        });

        //Get colors
        $.get('/api/colors', (response) => {
            this.colors = response;
        });

        //Get brands
        $.get('/api/brands', (response) => {
            this.brands = response;
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
