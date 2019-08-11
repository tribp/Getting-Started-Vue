var vm1 = new Vue({
  el: '#myApp',
  data: {
    isRed: false,
    isGreen: false
  },
  methods: {
    toggle: function() {
      this.isGreen = !this.isGreen;
    }
  }
});
