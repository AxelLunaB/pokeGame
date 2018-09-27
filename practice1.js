new Vue({

  el:'#exercise',
  data:{
    userName:'cinq',
    userAge:'3',
    imgLink:'https://imgc.allpostersimages.com/img/print/posters/you-shall-not-pass-sign_a-G-12360298-10577378.jpg',
  },
  methods:{

    rngNumber: function (){
      return Math.random(0,1);
    },
    prePopulate: function (){
      return userName;
    }
  }
});
