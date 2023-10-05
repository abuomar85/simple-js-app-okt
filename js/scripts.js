  
    //creating the app using IIFE
    let pokemonRepository = (function() {

        // create the pokeomnList
        let pokemonList = [
        
            {name: 'balbasure', height: 7, types: ['grass', 'poison']},
            {name:'charizard', height:17, types:['fire','flying ']},
            {name:'charmander', height: 6, types: ['fire']},
        
        ];

        // get all pokemons
        function getAll() {
            return pokemonList;
        }

        // check if the new pokemon is an object and has the whole keys before adding it
        function add(pokemon){
            if(typeof pokemon === 'object' && 'name' in pokemon && 'height' in pokemon && 'types' in pokemon) {
                return pokemonList.push(pokemon)
               
            } else {
                 
            return document.write('<p> not object</p>')
            }
        }


        // filter the pokemons by the name
        const findPokemonByName = (name) => {
            return pokemonList.filter(pokemon => pokemon.name.toLowerCase() === name.toLowerCase());
        };
        


        return{
            add: add,
            getAll: getAll,
           findPokemonByName: findPokemonByName
            
        }

    })();

    // searching for a pokemon
    const result = pokemonRepository.findPokemonByName('charizard');
        
    if (result.length > 0) {
        console.log('Found Pokémon:', result[0]);
    } else {
        console.log('Pokémon not found.');
    } 
  
    //adding new pokemon 
    pokemonRepository.add({name: 'Squirtle', height: 5, types: ['Squirtle']});

    
    // looping through the repo and type the results on the html page
    document.write("<h3> === forLoop === </h3>")
     for(let i=0; i<pokemonRepository.getAll().length; i++) {
        if(pokemonRepository.getAll()[i].height > 7){    
    document.write( (pokemonRepository.getAll()[i].name + ' height ( ' + pokemonRepository.getAll()[i].height + ') Wow that is big <br>'))
        }
        else{
            document.write((pokemonRepository.getAll()[i].name + ' height ( ' + pokemonRepository.getAll()[i].height + ' ) <br>'))
        }
    } 

    document.write("<h3> === forEach Loop === </h3>")
    pokemonRepository.getAll().forEach(function (pokemon) {
        if(pokemon.height > 7){    
            document.write( (pokemon.name + ' height ( ' + pokemon.height + ') Wow that is big <br>'))
                }
                else{
                    document.write((pokemon.name + ' height ( ' + pokemon.height + ' ) <br>'))
                }
    }) 


    

