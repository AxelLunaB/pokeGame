new Vue({

  el:'#app',
  data:{
  name: 'Daniel',
  mes:'this is a mess',
  welcomeMsg:'HelloThere',
  link: 'https://ar3d.net',
  finishedLink: '<a href="https://ar3d.net/quiniela"> Ve la Quiniela </a>',
  counter:0,
  x: 0,
  y:0,
  value: '',

  //css
  attachRed: false,
  color: 'green',
  width: 100,

  },
  computed: {
    output: function(){
      return this.counter > 5 ? '> 5' : '< 5';
    },

    //css
    divClasses: function (){

      return {
        red: this.attachRed,
        blue: !this.attachRed,
      }
    },
    myStyle: function (){
      return{
        backgroundColor: this.color,
        width: this.width + 'px'
      };
    }

  },
  watch: {
    counter: function (value){
       var vm = this;
       setTimeout(function (){
         vm.counter = 0;
       },2000)
    }

  },

  methods: {
      result: function(){
          return this.counter > 5 ? '> 5' : '< 5';
      },
     changeTitle: function (event) {

       this.mes = event.target.value;
     },
     sayHello: function (){

       this.welcomeMsg = 'General Kenobi';
       return this.welcomeMsg;
     },
     addToCount: function (step, event) {
       this.counter += step;

     },
     updateCoords: function(event){
      this.x = event.clientX;
      this.y = event.clientY;
    },
    alertMe: function (event){
      alert("alert!: " + event.target.value);
    }

  }
});
