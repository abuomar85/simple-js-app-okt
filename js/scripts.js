  
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

        // make a list of pokemon inside ul 
        function addListItem(pokemon) {
            let pokemonList = document.querySelector('.pokemon-list');
            let listItem = document.createElement('li');
            let button = document.createElement('button');
            button.innerText = pokemon.name;
            button.classList.add('pokemon-button');
            pokemonList.appendChild(listItem); 
            listItem.appendChild(button);
            // log the pokemon name when the button is clicked 
            showDetails(button,pokemon)
            
        }

        //listen to the events and log the pokemon name when the button is clicked
        function showDetails(button, pokemon) {
            button.addEventListener('click', function() {
                console.log(pokemon.name);
            })
            
        }


        return{
            add: add,
            getAll: getAll,
           findPokemonByName: findPokemonByName,
           addListItem: addListItem,
           showDetails: showDetails
            
        }

    })();

    // searching for a pokemon (Enter the name between the breaks)
    const result = pokemonRepository.findPokemonByName('');
        
    if (result.length > 0) {
        console.log('Found Pokemon:', result[0]);
    } else {
        console.log('Pokemon not found.');
    } 
    //adding new pokemon 
    pokemonRepository.add({name: 'Squirtle', height: 5, types: ['Squirtle']});

    //looping throug the pokemons using forEachLoop
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    }) 


    

