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
            this.products = this.sliceProducts(response);
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
        sliceProducts: function (products) {
            var sliceList = [];

            //Arrange array into arrays with 3 objects in each
            for (let i = 0; i < products.length; i += 3) {
                sliceList.push(products.slice(i, i + 3));
            }

            console.log(sliceList);

            return sliceList;
        },
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
    },
    watch: {
        'selected.category': function (newSelected) {
            console.log(newSelected);

            let queryString = '?categories=' + this.selected.category;

            if (newSelected === 'Alle') {
                queryString = '';
            }

            $.get('/api/products' + queryString, (response) => {
                this.products = this.sliceProducts(response);
            });
        },
        'selected.brand': function (newSelected) {
            console.log(newSelected);

            let queryString = '?brands=' + this.selected.brand;

            if (newSelected === 'Alle') {
                queryString = '';
            }

            $.get('/api/products' + queryString, (response) => {
                this.products = this.sliceProducts(response);
            });
        },
        'selected.color': function (newSelected) {
            console.log(newSelected);

            let queryString = '?colors=' + this.selected.color;

            if (newSelected === 'Alle') {
                queryString = '';
            }

            $.get('/api/products' + queryString, (response) => {
                this.products = this.sliceProducts(response);
            });
        }
    }
});
