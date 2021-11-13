import { starships } from "../data/starships.js";
import { getLastNumber, removeChildren} from "../utils/index.js";

const nav = document.querySelector('.leftNav')
const navList= document.querySelector('.navList')
const shipView=document.querySelector('.displaySection')

function populateNav(starships) {
    starships.forEach(starship => {
        let anchorWrap = document.createElement('a')
            anchorWrap.href = '#'
        let listItem = document.createElement('li')
        listItem.textContent = starship.name
        anchorWrap.addEventListener('click' , ()=> {
            populateShipView(starship)
        })

        anchorWrap.appendChild(listItem)
        navList.appendChild(anchorWrap)
    });
}

populateNav(starships)

function populateShipView (shipData) {
    removeChildren(shipView)
    let shipImage = document.createElement('img')
    let shipNum = getLastNumber(shipData.url)
    shipImage.src = `https://starwars-visualguide.com/assets/img/starships/${shipNum}.jpg`
    shipImage.addEventListener('error', () => {
        shipImage.hidden = true
        
    })

    shipView.appendChild(shipImage)
}