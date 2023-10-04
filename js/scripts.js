 // creating a list of pokemons
 let pokemonList = [
    
    {name: 'balbasure', height: 7, types: ['grass', 'poison']},
    {name:'charizard', height:17, types:['fire','flying ']},
    {name:'charmander', height: 6, types: ['fire']},
   
];
 
// looping through the pokemon list and type the results on the html page

for(let i=0; i<pokemonList.length; i++) {
    if(pokemonList[i].height > 7){    
   document.write( (pokemonList[i].name + ' height ( ' + pokemonList[i].height + ') Wow that is big <br>'))
    }
    else{
        document.write((pokemonList[i].name + ' height ( ' + pokemonList[i].height + ' ) <br>'))
    }
}