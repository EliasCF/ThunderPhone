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
        var getProducts = (productId) => {
            let queryString = '?categories=' + productId;

            if (productId === null) {
                queryString = '';
            }

            //Get products and arrange them in arrays containing three products each
            $.get('/api/products' + queryString, (response) => {
                this.products = this.sliceProducts(response);
            });
        };

        //If a category has been provided in the query string, this promise will get the id of the category
        //before allowing the getProducts function to fetch products
        var getProductId = new Promise((resolve) => {
            var urlParams = new URLSearchParams(window.location.search);

            if (urlParams.get('category') !== null) {
                //Get Id of category
                $.get('/api/categories/id/' + urlParams.get('category'), (response) => {
                    resolve(response);
                });
            } else {
                resolve(null);
            }
        });

        getProductId.then((value) => {
            getProducts(value);
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
        },
        getProductsQueryString: function () {
            let queryString = '';

            if (this.selected.category !== 'Alle') {
                queryString += '?categories=' + this.selected.category;
            }

            if (this.selected.brand !== 'Alle') {
                if (queryString === '') {
                    queryString += '?brands=' + this.selected.brand;
                } else {
                    queryString += '&brands=' + this.selected.brand;
                }
            }

            if (this.selected.color !== 'Alle') {
                if (queryString === '') {
                    queryString += '?colors=' + this.selected.color;
                } else {
                    queryString += '&colors=' + this.selected.color;
                }
            }

            return queryString;
        }
    },
    watch: {
        'selected.category': function () {
            $.get('/api/products' + this.getProductsQueryString(), (response) => {
                this.products = this.sliceProducts(response);
            });
        },
        'selected.brand': function () {
            $.get('/api/products' + this.getProductsQueryString(), (response) => {
                this.products = this.sliceProducts(response);
            });
        },
        'selected.color': function () {
            $.get('/api/products' + this.getProductsQueryString(), (response) => {
                this.products = this.sliceProducts(response);
            });
        }
    }
});
