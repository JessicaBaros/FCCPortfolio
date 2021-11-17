import { senators } from "../data/senators.js";

const senatorDiv = document.querySelector('.senators')

//Simplified Senators JS File

function SimplifiedSenators(){
    return senators.map(senator => {
        let middleName= senator.middle_name ? ` ${senator.middle_name} `: ` `
        let suffex = senator.suffex ? `${senator.suffex}` : ``
        
        return { // returns an object with properties from senators data
            id: senator.id,
            name: `${senator.first_name}${middleName}${senator.last_name}${suffex}`,
            party: senator.party,
            gender: senator.gender,
            party: senator.party,
            seniority: parseInt(senator.seniority, 10),
            imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}.jpeg`
            
        }
    })
}


function populateSenatorDiv(simpleSenators){
    simpleSenators.forEach(senator => {
        const senFigure = document.createElement('figure')
        const figImg = document.createElement('img')
        const figCaption = document.createElement('figcaption')

        figImg.src = senator.imgURL
        figCaption.textContent = senator.name

        senFigure.appendChild(figImg)
        senFigure.appendChild(figCaption)
        senatorDiv.appendChild(senFigure)
    });

}

const filterSenators = (prop, value) =>  SimplifiedSenators().filter(senator =>senator[prop] === value)

const mostSeniorSenator = SimplifiedSenators().reduce((acc, senators) => acc.seniority > senators.seniority ? acc : senators)

console.log(mostSeniorSenator)

populateSenatorDiv(SimplifiedSenators())
