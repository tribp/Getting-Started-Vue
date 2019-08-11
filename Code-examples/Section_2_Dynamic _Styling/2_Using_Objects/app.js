var vm1 = new Vue({
  el: '#myApp',
  data: {
    isRed: false
  },
  computed: {
    computeDivClasses: function() {
      return {
        red: this.isRed,
        blue: !this.isRed
      };
    }
  },
  methods: {
    toggle: function() {
      this.isRed = !this.isRed;
    }
  }
});
