import { starships } from "../data/starships.js";
import { getLastNumber} from "../utils/index.js";

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
    console.log(`Click on ${shipData.name}`)
    let shipImage = document.createElement('img')
    shipImage.scr = `https://starwars-visualguide.com/assets/img/starships/1.jpg`
    shipView.appendChild(shipImage)
}