const pokemonName = document.querySelector('.pokemon-name');
const pokemonId = document.querySelector('.pokemon-id');
const pokemonImg = document.querySelector('.pokemon-img');

const form = document.querySelector('.form');
const inputPokemon = document.querySelector('#search-input');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next')

let pokemonSearch = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json()
    return data
  }

}


const renderPokemon = async (pokemon) => {
  pokemonName.textContent = "Loading...";
  pokemonId.textContent = "";
  const data = await fetchPokemon(pokemon)

  if (data) {
    pokemonImg.style.display = "block";
    pokemonName.textContent = data.name;
    pokemonId.textContent = data.id;
    pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    inputPokemon.value = "";
    pokemonSearch = data.id;
  } else {
    pokemonImg.style.display = 'none';
    pokemonName.textContent = "Not found :c";
    pokemonId.textContent = "";
  }

}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  renderPokemon(inputPokemon.value.toLowerCase());
})

btnPrev.addEventListener('click', () => {
  if (pokemonSearch > 1) {
    pokemonSearch -= 1;
    renderPokemon(pokemonSearch)
  }
})

btnNext.addEventListener('click', () => {
  pokemonSearch += 1;
  renderPokemon(pokemonSearch);
})

renderPokemon(pokemonSearch);