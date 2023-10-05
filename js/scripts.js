    // creating a list of pokemons
    let pokemonList = [
        
        {name: 'balbasure', height: 7, types: ['grass', 'poison']},
        {name:'charizard', height:17, types:['fire','flying ']},
        {name:'charmander', height: 6, types: ['fire']},
    
    ];

    
    // looping through the pokemon list and type the results on the html page
    document.write("<h3> === forLoop === </h3>")
     for(let i=0; i<pokemonList.length; i++) {
        if(pokemonList[i].height > 7){    
    document.write( (pokemonList[i].name + ' height ( ' + pokemonList[i].height + ') Wow that is big <br>'))
        }
        else{
            document.write((pokemonList[i].name + ' height ( ' + pokemonList[i].height + ' ) <br>'))
        }
    } 

    document.write("<h3> === forEach Loop === </h3>")
    pokemonList.forEach(function (pokemon) {
        if(pokemon.height > 7){    
            document.write( (pokemon.name + ' height ( ' + pokemon.height + ') Wow that is big <br>'))
                }
                else{
                    document.write((pokemon.name + ' height ( ' + pokemon.height + ' ) <br>'))
                }
    })


    

