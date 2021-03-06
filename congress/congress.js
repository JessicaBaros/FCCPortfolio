import { senators } from "../data/senators.js";
import { representatives } from "../data/representatives.js";
import { removeChildren } from "../utils/index.js";

const members = [...senators, ...representatives]

const senatorDiv = document.querySelector('.senators')
const loyaltyHeading = document.querySelector('.mostLoyal')
const seniorityHeading = document.querySelector('.seniority')

function SimplifiedMembers(chamberFilter){
    const filteredArray = members.filter(member => chamberFilter ? member.short_title === chamberFilter:member)
    
    return filteredArray.map(senator => {
        let middleName= senator.middle_name ? ` ${senator.middle_name} `: ` `
        let suffex = senator.suffix ? `${senator.suffix}` : ``
        return { // returns an object with properties from senators data
            id: senator.id,
            name: `${senator.first_name}${middleName}${senator.last_name}${suffex}`,
            party: senator.party,
            gender: senator.gender,
            seniority: +senator.seniority,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}.jpeg`,
            missedVotesPct: senator.missed_votes_pct,
            loyalty: senator.votes_with_party_pct,
            state: senator.state,
            short_title: senator.short_title
        }
    })
}

function populateSenatorDiv(simpleSenators){
    removeChildren(senatorDiv)
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

const mostSeniorMember = SimplifiedMembers().reduce((acc, senators) => acc.seniority > senators.seniority ? acc : senators)

seniorityHeading.textContent = `The most Senior Member of Congress is ${mostSeniorMember.name} who has been in congress for ${mostSeniorMember.seniority} years..`

const mostLoyal = SimplifiedMembers().reduce((acc, senator) => {
    if (senator.loyalty === 100) {
        acc.push(senator)
    }
    return acc
}, [])

const cowardList = document.createElement('ol')
const spineless = mostLoyal.map(coward => {
    let listItem = document.createElement('li')
    listItem.textContent = coward.name   
    cowardList.appendChild(listItem)
})

loyaltyHeading.appendChild(cowardList)


populateSenatorDiv(SimplifiedMembers())

const filterSenators = (prop, value) =>  SimplifiedMembers().filter(senator =>senator[prop] === value)



//getting buttons to work
const buttons = document.querySelector ('#buttons')

const senatorButton = document.createElement('button')
    senatorButton.textContent = "Senators"
    senatorButton.addEventListener('click', () => populateSenatorDiv(filterSenators('short_title','Sen.')))

const representativeButton = document.createElement('button')
    representativeButton.textContent = "Representatative"
    representativeButton.addEventListener('click', () => populateSenatorDiv(filterSenators('short_title','Rep.')))

const repButton = document.createElement('button')
    repButton.textContent = "Republican"
    repButton.addEventListener('click', () => populateSenatorDiv(filterSenators('party','R')))

const demButton = document.createElement('button')
    demButton.textContent = "Democrat"
    demButton.addEventListener('click', () => populateSenatorDiv(filterSenators('party','D')))

buttons.appendChild(senatorButton)
buttons.appendChild(representativeButton)
buttons.appendChild(repButton)
buttons.appendChild(demButton)



