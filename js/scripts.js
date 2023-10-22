  
    //creating the app using IIFE
    let pokemonRepository = (function() {

      // create the pokeomnList
      let pokemonList = [];

      let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';

            // get all pokemons
            function getAll() {
              return pokemonList;
          }

      function add(pokemon){
        if(typeof pokemon === 'object' && 'name' in pokemon ) {
            return pokemonList.push(pokemon)
           
        } else {
             
        return document.write('<p> not an object</p>')
        }
    }

          //listen to the events and log the pokemon name when the button is clicked
          function showDetails(button, pokemon) {   
            button.addEventListener('click', function() {
                loadDetails(pokemon).then(function() {
                    showModal(pokemon);
                    
                })
                
             });       
        } 


            //add modal using Bootstrap
            function showModal(pokemon) {



              let modalBody = $(".modal-body");
              let modalTitle = $(".modal-title");
              modalTitle.empty();
              modalBody.empty();
              //looping through types and abilities
              pokemonRepository.loadDetails(pokemon).then(function () {
                let sTypes = "";
                for (let t of pokemon.types) {
                  sTypes = t.type.name + ", " + sTypes;
                }
                let sAbilities = "";
                for (let a of pokemon.abilities) {
                  sAbilities = a.ability.name + ", " + sAbilities;
                }
                // show the elements inside the modal
                let typesElement = $("<p>" + "types : " + sTypes + "</p>");
                let abilitiesElement = $("<p>" + "abilities : " + sAbilities + "</p>");
                modalBody.append(typesElement);
                modalBody.append(abilitiesElement);
              });

              let nameElement = $("<h1>" + pokemon.name + "</h1>");
              let imageElementFront = $('<img class="modal-img" style="width:50%">');
              imageElementFront.attr("src", pokemon.imageUrlFront);
              let imageElementBack = $('<img class="modal-img" style="width:50%">');
              imageElementBack.attr("src", pokemon.imageUrlBack);
              let heighElement = $("<p>" + "height : " + pokemon.height + "</p>");
              let weightElement = $("<p>" + "weight : " + pokemon.weight + "</p>");
              modalTitle.append(nameElement);
              modalBody.append(imageElementFront);
              modalBody.append(imageElementBack);
              modalBody.append(heighElement);
              modalBody.append(weightElement);


              }

            // make a list of pokemon inside ul 
            function addListItem(pokemon) {
              let pokemonList = document.querySelector('.pokemon-list');
              let listItem = document.createElement('li');
              let button = document.createElement('button');
              button.classList.add('pokemon-button' ,'btn' , 'btn-primary');
              listItem.classList.add("list-group-item");
              listItem.appendChild(button);
              pokemonList.appendChild(listItem); 
              button.innerHTML = `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">${pokemon.name}</button> `
              
              button.addEventListener("click", function() {
                showModal(pokemon);
              })
              // log the pokemon name when the button is clicked
              showDetails(button,pokemon)
              
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
                      item.imageUrlFront = details.sprites.front_default;
                      item.imageUrlBack = details.sprites.back_default;
                      item.height = details.height;
                      item.weight = details.weight;
                      item.types = details.types;
                      item.abilities = details.abilities;

                      
                  }).catch(function(e) {
            
                      console.error(e)
                  })

              } 


      // filter the pokemons by the name
      const findPokemonByName = (name) => {
          return pokemonList.filter(pokemon => pokemon.name.toLowerCase() === name.toLowerCase());
      };





      




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




 

  