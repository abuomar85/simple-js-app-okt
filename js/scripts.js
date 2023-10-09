  
    //creating the app using IIFE
    let pokemonRepository = (function() {

        // create the pokeomnList
        let pokemonList = [];

        let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';

        function add(pokemon){
            if(typeof pokemon === 'object' && 'name' in pokemon ) {
                return pokemonList.push(pokemon)
               
            } else {
                 
            return document.write('<p> not object</p>')
            }
        }



        // get all pokemons
        function getAll() {
            return pokemonList;
        }
        // check if the new pokemon is an object and has the whole keys before adding it

        function loadList() {
            return fetch(apiUrl).then(function(response) {
                return response.json();
            }).then(function(json) {
                json.results.forEach(function(item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon);
                    console.log(pokemon);
                });
            }).catch(function(e) {
                console.error(e)
            })
        }
                // load the pokemon details
                function loadDetails(item) {
                    let url = item.detailsUrl;
                    return fetch(url).then(function(response) {
                        return response.json();
                    }).then(function(details) {
                        // add the details to the item 
                        item.imageUrl = details.sprites.fron_default;
                        item.height = details.height;
                        item.types = details.types;
                    }).catch(function(e) {
                        console.error(e)
                    })
        
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
            let container = document.querySelector('.container');  
            button.addEventListener('click', function() {
                loadDetails(pokemon).then(function() {
                    console.log(pokemon);
                    container.innerText = (pokemon.name);  
                })
                
             });   
        }




        return{
            add: add,
            getAll: getAll,
           findPokemonByName: findPokemonByName,
           addListItem: addListItem,
           showDetails: showDetails,
           loadList:loadList,
           loadDetails: loadDetails
           
            
        }

    })();

    // searching for a pokemon (Enter the name between the breaks)
    const result = pokemonRepository.findPokemonByName('');
        
    if (result.length > 0) {
        console.log('Found Pokemon:', result[0]);
    } else {
        console.log('Pokemon not found.');
    } 
    //adding new pokemon // since we add the pokemon manually it will generate an error in console when it is been clicked 
   // pokemonRepository.add({name: 'Squirtle', height: 5, types: ['Squirtle']});
    // load data from api 
    pokemonRepository.loadList().then(function() {
        pokemonRepository.getAll().forEach(function (pokemon) {
            pokemonRepository.addListItem(pokemon);
        });
    });
    //looping throug the pokemons using forEachLoop
 



   

    

