// Función para buscar un personaje por nombre
const fetchCharacterByName = async (nombre) => {
    try {
        const url = `https://rickandmortyapi.com/api/character/?name=${nombre}`;
        const response = await fetch(url); //solicitud http a resolver

        const data = await response.json(); //Convierte la solicitud a un objeto, retorna una promesa
        displayCharacters(data.results); //data.results contiene un array de personajes obtenidos desde la api.
    } catch (error) {
        console.error('Error:', error);
        displayError('Personaje no encontrado.');
    }
};

// Función para mostrar los personajes
const displayCharacters = (personajes) => {
    const characterList = document.getElementById('listaPersonajes'); //busca y devuelve el primer elemento del DOM cuyo atributo id coincida con el valor parámetro
    characterList.innerHTML = ''; // Limpia el contenido anterior

    personajes.forEach(character => {
        // Crear un contenedor para cada personaje
        const characterDiv = document.createElement('div'); //crea un div en el html
        characterDiv.classList.add('character');

        // Añadir imagen del personaje
        const characterImg = document.createElement('img');
        characterImg.src = character.image;
        characterImg.alt = `${character.name} Image`;

        // Añadir nombre del personaje
        const characterName = document.createElement('h2');
        characterName.textContent = character.name;

        // Añadir especie del personaje
        const characterSpecies = document.createElement('p');
        characterSpecies.textContent = `Especie: ${character.species}`;

        // Añadir el contenedor de personajes al DOM
        characterDiv.appendChild(characterImg);
        characterDiv.appendChild(characterName);
        characterDiv.appendChild(characterSpecies);
        characterList.appendChild(characterDiv);
    });
};

//Acá se Maneja el formulario de búsqueda
//cada que se envíe el formulario, se ejecutará la función.
document.getElementById('character-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que la página se recargue
    const characterName = document.getElementById('nombrePersonaje').value.trim();

    if (characterName) {
        fetchCharacterByName(characterName); // Llamar a la función para buscar por nombre
    } else {
        displayError('Ingresa un personaje.');
    }
});
