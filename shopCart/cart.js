// https://vuejs.org/v2/guide/

const app = new Vue({
    el: '#app',
    
    // https://vuejs.org/v2/guide/instance.html#Data-and-Methods
    data() {
      return {
        products: [
          {
            id: 1,
            name: 'Product 1',
            description: 'This is an incredibly awesome product',
            quantity: 0,
          },
          {
            id: 2,
            name: 'Product 2',
            description: 'This is an incredibly awesome product',
            quantity: 0,
          },
          {
            id: 3,
            name: 'Product 3',
            description: 'This is an incredibly awesome product',
            quantity: 0,
          }
        ],
        showCart: false
      };
    },
    
    // https://vuejs.org/v2/guide/computed.html
    computed: {
      cart() {
        return this.products.filter(product => product.quantity > 0);
      },
      totalQuantity() {
        return this.products.reduce(
          (total, product) => total + product.quantity,
          0
        );
      }
    },
      
      // https://vuejs.org/v2/guide/events.html#Methods-in-Inline-Handlers
      methods: {
        updateCart(product, updateType) {      
          for (let i = 0; i < this.products.length; i++) {
            console.log(i);
            if (this.products[i].id === product.id) {
              if (updateType === 'subtract') {
                if (this.products[i].quantity !== 0) {
                  this.products[i].quantity--;
                }
              } else {
                this.products[i].quantity++;
              }
              
              break;
            }
          }
        }
      }
    });







