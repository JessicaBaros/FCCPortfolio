import { people } from '../data/people.js';
import { getLastNumber, removeChildren } from '../utils/index.js';

const mainBody = document.querySelector ('body')
const header = document.createElement('header')
const h1 = document.createElement('h1')
    h1.textContent = "Star Wars Characters"
const buttonSection = document.createElement('section')

const maleButton = document.createElement('button')
    maleButton.textContent ="Male Characters"
    maleButton.addEventListener('click', ()=> populateDom(maleCharacters))

const femaleButton = document.createElement('button')
    femaleButton.textContent = "Female Characters"
    femaleButton.addEventListener('click', ()=> populateDom(femaleCharacters))

const otherButton = document.createElement('button')
    otherButton.textContent = "Other Characters"
    otherButton.addEventListener('click', ()=> populateDom(otherCharacters))    

header.appendChild(h1)
header.appendChild(buttonSection)
buttonSection.appendChild(maleButton)
buttonSection.appendChild(femaleButton)
buttonSection.appendChild(otherButton)
mainBody.appendChild(header)

const mainContent = document.querySelector('main')

document.body.insertBefore(header, mainContent)

const maleCharacters = people.filter(person => person.gender === 'male')
const femaleCharacters = people.filter(person => person.gender === 'female')
const otherCharacters = people.filter(person => person.gender !== 'male' && person.gender !== 'female')


console.log(maleCharacters)

function populateDom(characters) {

    removeChildren(mainContent)
    
    characters.forEach((element) => {
        
        const charFigure = document.createElement('figure')
        const charImg = document.createElement('img')
        const charNum = getLastNumber(element.url)
            charImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`
        const charCaption = document.createElement('figcaption')
            charCaption.textContent = element.name
        charFigure.appendChild(charImg)
        charFigure.appendChild(charCaption)
        mainContent.appendChild(charFigure)
        
});
}

