import { removeChildren } from "../utils/index.js";

function getAPIData(url) {
    try {
        return fetch(url).then((data) => data.json ())
        
        const data = response.json()
        return data
    } catch (error){
        console.error(error)
    }
}

function loadPokemon(offset = 0, limit=25) {
    removeChildren(pokeGrid)
    getAPIData(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,).then(async(data) => {
   
    for (const pokemon of data.results) {
        await getAPIData(pokemon.url).then((pokeData) => populatePokeCard(pokeData))
    }
})
}
const pokeGrid =document.querySelector('.pokeGrid')
const loadButton = document.querySelector('.loadButton')
loadButton.addEventListener('click', () => loadPokemon())
const newButton = document.querySelector('.newPokemon')
newButton.addEventListener('click', () => {
    let pokeName = prompt ('What will you name your new Pokemon?')
    let pokeHeight = prompt ('What is the height of your pokemon?')
    let pokeWeight = prompt ('What is the Weight of your Pokemon')
    let pokeAbilities = prompt('And your abilities? (Use a comma Separated List')

    let newPokemon = new Pokemon(
        pokeName,
        pokeHeight,
        pokeWeight, 
        getAbilitiesArray(pokeAbilities),
    )
    
    
    populatePokeCard(newPokemon)
})
const morePokemon = document.querySelector('.morePokemon')
morePokemon.addEventListener('click', () => {
    let startPoint = prompt ('Which Pokemon ID do we start with?')
    let howMany = prompt('How many more pokemon do you want to see?')
    removeChildren(pokeGrid)
    loadPokemon(startPoint, howMany)

})
function getAbilitiesArray(commaString) {
    let tempArray = commaString.split(',')
    console.log(tempArray)
    return tempArray.map((abliityName) => {
        return {
            ability: {
                name: abliityName
            }
        }
    })
}

function populatePokeCard(singlePokemon) {
    const pokeScene = document.createElement('div')
        pokeScene.className = 'scene'
    const pokeCard = document.createElement('div')
        pokeCard.className = 'card'
            pokeCard.addEventListener('click', () => pokeCard.classList.toggle('is-flipped')
            )
    const front = populateCardFront(singlePokemon)
    const back = populateCardBack(singlePokemon)

    pokeCard.appendChild(front)
    pokeCard.appendChild(back)
    pokeScene.appendChild(pokeCard)
    pokeGrid.appendChild(pokeScene)
}

function populateCardFront(pokemon) {
    const pokeFront = document.createElement('figure')
        pokeFront.className = 'cardFace front'
            const pokeImg = document.createElement('img')
            if (pokemon.id === 9001) {
                pokeImg.src = '../images/pokeball.png'
            } else {pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            
            const pokeCaption = document.createElement('figcaption')
            pokeCaption.textContent = ` ${pokemon.name}`
            pokeFront.appendChild(pokeImg)
            pokeFront.appendChild(pokeCaption)
        return pokeFront
}

function typesBackground(pokemon, card) {
    let pokeType1 = pokemon.types[0].type.name
    let pokeType2 = pokemon.types[1]?.type.name
    if (!pokeType2) {
        card.style.setProperty('background', getPokeTypeColor(pokeType1))
    } else {
        card.style.setProperty('background',
        `liniar-gradient(${getPokeTypeColor(pokeType1)}, ${getPokeTypeColor(pokeType2)})`)
    }
}


function populateCardBack(pokemon) {
    const pokeBack = document.createElement('div')
        pokeBack.className = 'cardFace back'
        const label = document.createElement('h3')
        label.textContent = 'Abilities:'
        const abilityList = document.createElement('ul')
        
        pokemon.abilities.forEach((ability) => {
           
            let abilityItem = document.createElement('li')
            abilityItem.textContent = ability.ability.name
            abilityList.appendChild(abilityItem)
        })

        pokeBack.appendChild(label)
        pokeBack.appendChild(abilityList)
    

        typesBackground(pokemon, pokeBack)

        return pokeBack
}

class Pokemon {
    constructor(name, height, weight, abilities) {
        this.id=100,
        this.name = name,
        this.height = height,
        this.weight = weight
        this.abilities = abilities
    }
}

function getPokeTypeColor(pokeType) {
    let color 
    switch (pokeType) {
        case 'grass':
            color = '#7AC74C'
            break
            case 'fire':
            color = '#EE8130'
            break
            case 'water':
            color = '#6390F0'
            break
            case 'bug':
            color = '#A6B91A'
            break
            case 'normal':
            color = '#A8A77A'
            break
            case 'flying':
            color = '#A98FF3'
            break
            case 'electric':
            color = '#F7D02C'
            break
            case 'psychic':
            color = '#F95587'
            break
            case 'poison':
            color = '#A33EA1'
            break
            case 'ground':
            color = '#E2BF65'
            break
            default:
            color = 'orange'
    }
    return color
}

