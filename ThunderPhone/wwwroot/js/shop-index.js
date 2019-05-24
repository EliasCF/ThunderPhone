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
        },
        currentProductAmount: 5,
        productsPerLoad: 5
    },
    created: function () {
        var getProducts = (productId) => {
            return new Promise((resolve) => {
                let queryString = '?categories=' + productId + '&amount=' + this.currentProductAmount;

                if (productId === null) {
                    queryString = '?amount=' + this.currentProductAmount;
                }

                //Get products and arrange them in arrays containing three products each
                $.get('/api/products' + queryString, (response) => {
                    this.products = this.sliceProducts(response);

                    resolve(productId);
                });
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
            getProducts(value).then((id) => {
                //Get categories
                $.get('/api/categories', (response) => {
                    this.categories = response;

                    if (id !== null) {
                        this.selected.category = id;
                    }
                });
            });
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

            if (queryString === '') {
                queryString = '?amount=' + this.productsPerLoad;
            } else {
                queryString += '&amount=' + this.productsPerLoad;
            }

            return queryString;
        },
        loadProductRange: function () {
            $.get('/api/products' + this.getProductsQueryString() + '&from=' + this.currentProductAmount, (response) => {
                this.currentProductAmount += this.productsPerLoad;

                let newItems = response;

                //Length of the last array in items
                let lastItemArrayLength = this.products[this.products.length - 1].length;

                //If the last array of this.products is less than 3 items long
                //Then we have to move the top items from the new array to keep this.products consistent
                if (lastItemArrayLength !== 3) {
                    newItems.slice(0, 3 - lastItemArrayLength).forEach((item) => {
                        this.products[this.products.length - 1].push(item);
                    });

                    //Remove the moved items to avoid adding them to this.products twice
                    newItems = newItems.slice(3 - lastItemArrayLength, newItems.length);
                }

                this.sliceProducts(newItems).forEach((array) => {
                    this.products.push(array);
                });
            });
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
            $.get('/api/products' + this.getProductsQueryString() + '&amount=' + this.productsPerLoad, (response) => {
                this.products = this.sliceProducts(response);
            });
        }
    }
});
