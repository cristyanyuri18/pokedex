const pokemonList = document.getElementById('pokemonList')

const loadMoreButton = document.getElementById('loadMoreButton')

const limit = 4
let offset = 0;

function loadPokemonItens (limit, offset) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) =>  {
        const newHTML = pokemons.map((Pokemon) => `
                    <li class="pokemon ${pokemon.type}">
                        <span class="number">${pokemon.number}</span>
                        <span class="name">${pokemon.name}</span>
            
                        <div class="detail">
                            <ol class="types">
                                ${pokemon.types.map((type) => <li class="type ${type}">`${type}`</li>).join('')}
                            </ol>
            
                            <img src="${pokemon.photo}"alt="${pokemon.name}">
                        </div>
                    </li>
                `
            ).join('')

         pokemonList.innerHTML += newHTML

        })
}

loadPokemonItens(limit, offset)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    loadPokemonItens(limit, offset)
})

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})