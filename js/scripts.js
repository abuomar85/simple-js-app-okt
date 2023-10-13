  
    //creating the app using IIFE
    let pokemonRepository = (function() {

        // create the pokeomnList
        let pokemonList = [];

        let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';

        // creating a modal to view the pokemon info
        let modalContainer = document.querySelector('#modal-container'); 
        let dialogPromiseReject; // This can be set later

        function showModal(pokemon){
            modalContainer.innerHTML = '';
            let modal = document.createElement('div');
            modal.classList.add('modal');
            // Add the new modal content
            let closeButtonElement = document.createElement('button');
            closeButtonElement.classList.add('modal-close');
            closeButtonElement.innerText = 'Close';
            closeButtonElement.addEventListener('click', hideModal);

            let titleElement = document.createElement('h1');
            titleElement.innerText = pokemon.name;

            let contentElement = document.createElement('p');
            contentElement.innerText = pokemon.name + ' is ' + pokemon.height + ' height' ;

            let imageElement = document.createElement("img");
            imageElement.src = pokemon.imageUrl
            imageElement.setAttribute("width", "304");
            imageElement.setAttribute("height", "228");
            imageElement.setAttribute("alt", "The team logo"); 


            modal.appendChild(closeButtonElement);
            modal.appendChild(titleElement);
            modal.appendChild(contentElement);
            modal.appendChild(imageElement);
            modalContainer.appendChild(modal);

            modalContainer.classList.add('is-visible');

        }
        //  hide the modal function 
        function hideModal() {
            modalContainer.classList.remove('is-visible');
            if(dialogPromiseReject) {
                dialogPromiseReject();
                dialogPromiseReject = null;
            }
        }


        // close the  modal if the user clicked Escape 
        window.addEventListener('keydown', (e) => {
            if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
                hideModal();
            }
        });

        // close the modal if the user clicked outside the modal 
        modalContainer.addEventListener('click', (e) => {
           let target = e.target;
           if(target === modalContainer) {
            hideModal();
           }
        });


        function add(pokemon){
            if(typeof pokemon === 'object' && 'name' in pokemon ) {
                return pokemonList.push(pokemon)
               
            } else {
                 
            return document.write('<p> not an object</p>')
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
                        item.imageUrl = details.sprites.front_default;
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
            button.addEventListener('click', function() {
                loadDetails(pokemon).then(function() {
                    showModal(pokemon);
                    
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
           loadDetails: loadDetails,
           showModal:showModal
           
            
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
 



   

    

