new Vue({
  el:'#app',
 data : {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    actionInPlay: false,
    mainMenu: true,
    mainMenu2: true,
    menuPage: 0,
    trainerName: 'Red',
    trainerSprite: 'assets/img/trainer_male.png',
   	pokemonsFought:[],
    pokemonCurrent:[{ name:'bulbasaur', move:'RazorLeaf', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' }],
    pokemonOwned:[],
    pokemonStartOpc:[],
    audio: new Audio('assets/music/BT.mp3'),
    audioIsPlaying: false,
    fxPaths:['assets/music/normal_fight_attack.mp3','assets/music/death.mp3','assets/music/heal.mp3'],
    mtPaths:['assets/music/mainMenu.mp3','assets/music/BT.mp3'],
    turns: []
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

           p_instance.pokemonStartOpc.push({
            name: response.name,
            move: response.moves[parseInt(Math.random(1,response.moves.length) * 100) % response.moves.length].move.name,
            sprite: response.sprites.front_default,

          })
        });
    }



  },
 computed : {


},
 methods : {
   playerAttack: function(){
    if(this.actionInPlay)
    return;

     this.actionInPlay = true;

     this.playFx(this.fxPaths[0]);
     var damage = Math.floor(Math.random() * (25 - 1 + 1)) + 1;
     var enemydamage = Math.floor(Math.random() * ((damage+5) - 1 + 1)) + 1;
     var self = this;
     setTimeout(function(){
        self.monsterHealth = self.monsterHealth - damage;
        self.logActions(self.pokemonCurrent[0].name,enemydamage,false);
        self.playerHealth = self.playerHealth - enemydamage;
          self.logActions(self.pokemonOwned[0].name,damage,true);
        self.actionInPlay = false;
        self.checkHealth();
     },500);

   },

   checkHealth : function (){
     if(this.playerHealth <= 0){
       this.playFx(this.fxPaths[1]);
       this.playerHealth = 0;
       var self = this;
       setTimeout(function(){
         if(confirm('You lost, wanna play again?')){
         self.playerHealth = 100;
         self.newPoke();
         self.getRandomfPoke();
         }else {
           self.giveUp();
         }
         return;
       },150);

     }

     if(this.monsterHealth <= 0){
         this.playFx(this.fxPaths[1]);
        this.monsterHealth = 0;
        var self = this;
        setTimeout(function(){
          if(confirm('Keep Fighting?')){
          self.newPoke();
          }else {
            self.gameIsRunning = false;
            self.audio.pause();
          }
        },150);

      }
   },
   logActions : function (whoDidIt, whatItDid,isPlayerTurn){

     this.turns.unshift({
                         text: whoDidIt + " did: " + whatItDid + " damage!",
                         isPlayer: isPlayerTurn
                       });
   },
   newPoke: function (){
     this.getRandomPoke();
     this.monsterHealth = 100;
   },

   specialAttack: function (){
     if(this.actionInPlay)
     return;

      this.actionInPlay = true;

      this.playFx(this.fxPaths[0]);
      var damage = Math.floor(Math.random() * (25 - 1 + 1)) + 1;
      var enemydamage = Math.floor(Math.random() * ((damage+20) - 1 + 1)) + 1;
      var self = this;
      setTimeout(function(){
        if(self.monsterHealth - damage <= 0){
           monsterHealth = 0;
         }
         self.monsterHealth = self.monsterHealth - damage;
         self.playerHealth = self.playerHealth - enemydamage;
         self.actionInPlay = false;
         self.checkHealth();
      },500);

   },
   heal: function (){
      this.playFx(this.fxPaths[2]);
      var heal = Math.max(Math.floor(Math.random() * (30 - 1 + 1)) + 1,15);

      if(this.playerHealth + heal > 100)
      this.playerHealth = 100;
      else {
        this.playerHealth += heal;
      }

      var getAction = this.rngAction();

      if(getAction == 1){
            var enemydamage = Math.floor(Math.random() * ((15) - 1 + 1)) + 1;
            this.playerHealth -= enemydamage;
      }else{
              var enemyHeal = Math.floor(Math.random() * ((15) - 1 + 1)) + 1;
              if(this.monsterHealth + enemyHeal > 100)
              this.monsterHealth = 100;
              else {
                this.monsterHealth += enemyHeal;
              }


      }


   },
   giveUp: function (){
     this.gameIsRunning = false;
     this.mainMenu = true;
     this.playMainTheme();
     this.turns  = [];
   },

   rngAction : function(){
     var rng = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
     return rng;
   },
   startGame: function(){
     this.gameIsRunning = true;
     this.playerHealth = 100;
     this.monsterHealth = 100;
     this.playBattleTheme();
   },
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
         p_instance.pokemonCurrent.splice(0,0,{
         name: response.name,
         move: response.moves[parseInt(Math.random(1,response.moves.length) * 100) % response.moves.length].move.name,
         sprite: response.sprites.front_default

       })
     });
   },
   getRandomfPoke: function(){
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
         p_instance.pokemonOwned.splice(0,0,{
         name: response.name,
         move: response.moves[parseInt(Math.random(1,response.moves.length) * 100) % response.moves.length].move.name,
         sprite: response.sprites.front_default

       })
     });
   },


   playBattleTheme : function(){
     if(this.audioIsPlaying){
       this.audio.pause();
       this.audioIsPlaying = false;
     }
      this.audio = new Audio(this.mtPaths[1]);
      // path to file
     this.audioIsPlaying = true;
     this.audio.volume = 0.01;
     this.audio.play();

   },
   playMainTheme : function(){
     this.mainMenu2 = false;

     if(this.audioIsPlaying){
       this.audio.pause();
       this.audioIsPlaying = false;
     }
      this.audio =  new Audio(this.mtPaths[0]);
      // path to file
     this.audioIsPlaying = true;
     this.audio.volume = 0.01;
     this.audio.play();

   },

   playFx : function(fxPath){
     var audioAtt = new Audio(fxPath) // path to file
     audioAtt.volume = 0.03;
     audioAtt.play();
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
