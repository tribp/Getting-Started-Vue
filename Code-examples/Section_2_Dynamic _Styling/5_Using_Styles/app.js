var vm1 = new Vue({
  el: '#myApp',
  data: {
    color: 'green',
    downLoadCounter: 0,
    downLoadStatus: '',
    myStyle: {
      backgroundColor: 'red', //use camelCase since '-' is not allowed in property names
      width: '0px',
      contain: 'content' //Otherwise  text 'Downloading' will go out of div box when to small!
    }
  },
  methods: {
    startDownLoad: function() {
      let timerId = setInterval(() => {
        if (this.downLoadCounter < 40) {
          this.downLoadStatus = 'DownLoading';
          this.downLoadCounter++;
          console.log(this.downLoadCounter);
          this.myStyle.width = this.downLoadCounter * 10 + 'px';
        } else {
          clearInterval(timerId);
          this.downLoadStatus = 'Finished';
        }
      }, 200);
    }
  }
});
