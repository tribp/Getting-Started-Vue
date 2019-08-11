var vm1 = new Vue({
  el: '#myApp',
  data: {
    isRed: false,
    color: 'green'
  },
  methods: {
    toggle: function() {
      this.isRed = !this.isRed;
    }
  }
});
