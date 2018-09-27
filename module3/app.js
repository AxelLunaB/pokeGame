// Put this in the script section in JSFiddle
// In a local setup, you need to merge this and the index.html file into one file
new Vue({
	el: '#app',
	data: {
		show: false,
		show2: false,
		ingredients: ['meat','fruit','cookies'],
		persons: [
			{name:'trapo',age:22,color:'red'},
			{name:'atsel',age:22,color:'blue'},
		],
		pokemons:[]
	},

	computed : {
		myStyle: function (){
			return{
				width: 100 + 'px',
				height: 100 + 'px'
			};
		},

	},
	methods : {
		getRandomName: function(){
			fetch('https://randomuser.me/api/').then(res => res.json())
			.then(res =>{
				console.log(res)
				this.ingredients.push(res.results[0].name.first)
			});

		},
		getRandomPoke: function(){
			var n = parseInt(Math.random(1,151) * 100);
			console.log(n);

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


		}
	}

})
