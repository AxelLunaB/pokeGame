new Vue({
  el:'#app',
 data : {

    mainMenu: true,
    menuPage: 0,
    trainerName: 'Red',
    trainerSprite: 'assets/img/trainer_male.png',
   	pokemonsFought:[],
    pokemonCurrent:[{ name:'bulbasaur', move:'RazorLeaf', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' }],
    pokemonOwned:[],
    pokemonStartOpc:[]
 },
  mounted : function() {
    for (var i = 0; i<3; i++){
      var pnum = parseInt(Math.random(1,151) * 100);
        var settings = {
          "async": true,
          "User-agent": 'cheese',
          "crossDomain": true,
          "url": `https://pokeapi.co/api/v2/pokemon/${pnum}/`,
          "method": "GET",
          "headers": {}
        }
        var p_instance = this;

        $.ajax(settings).done(function (response) {
          console.log(response);
           p_instance.pokemonStartOpc.push({
            name: response.name,
            move: response.moves[parseInt(Math.random(1,response.moves.length) * 100) % response.moves.length].move.name,
            sprite: response.sprites.front_default,

          })
        });
    }

      console.log(p_instance.pokemonStartOpc);

  },
 computed : {


 },
 methods : {
   //CSS methods
   toggleBall: function (event){

    var res = $('.menu-selection');
    //console.log(res);

    res.each(function(e){

      console.log(event);
      if(event == this.id)
        $(this).addClass('poke-selected')
      else
        $(this).removeClass('poke-selected')
    })
    //console.log(res);

   },
   selectPokeBro : function(num){
     console.log("num " + num);
     this.pokemonOwned.push({
       name: this.pokemonStartOpc[num].name,
       move: this.pokemonStartOpc[num].move,
       sprite: this.pokemonStartOpc[num].sprite,

     })

     console.log(this.pokemonOwned)

   },
   //CSS methods END
   getRandomPoke: function(){
     var n = parseInt(Math.random(1,151) * 100);


     var settings = {
       "async": true,
       "User-agent": 'cheese',
       "crossDomain": true,
       "url": `https://pokeapi.co/api/v2/pokemon/${n}/`,
       "method": "GET",
       "headers": {}
     }
     var p_instance = this;
     $.ajax(settings).done(function (response) {
       console.log(response);
         p_instance.pokemons.push({
         name: response.name,
         move: response.moves[parseInt(Math.random(1,response.moves.length) * 100) % response.moves.length].move.name,
         sprite: response.sprites.front_default

       })
     });
   },


   playBattleTheme : function(){
     var audio = new Audio('assets/music/BT.mp3') // path to file
     audio.volume = 0.01
     audio.play()
   },

   playFx : function(){
     var audioAtt = new Audio('assets/music/normal_fight_attack.mp3') // path to file
     audioAtt.volume = 0.1
     audioAtt.play()
   },

   menuManager: function(){
     this.menuPage++
     console.log(this.menuPage)
     if(this.menuPage > 2){
     this.mainMenu = false
     this.menuPage = 0
     }

   }



 }



});
