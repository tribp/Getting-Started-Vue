Vue.component('my-cmp', {
  data: function() {
    return {
      title: 'hello world'
    };
  },
  template: '<p>This is my Super template ! - {{title}}</p>'
});

var vm1 = new Vue({
  el: '#myApp'
});
