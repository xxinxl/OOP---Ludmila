import fs from "fs" 
import path from "path" 
import { stringify } from "querystring"
import readlineSync from "readline-sync" 
 
const getPath = (fPath) => { 
    return path.resolve() + fPath 
} 
 
const setPerson = (person) => { 
    const path = getPath('\\people.json') 
    const peopleList = JSON.parse(fs.readFileSync(path)) 
    peopleList.alive.push(person) 
    fs.writeFileSync(path, JSON.stringify(peopleList, null, 2)) 
    // console.log(peopleList) 
    // сперва узнаём путь, потом пушим в живых person 
} 
 
const addDeadPerson = (person) => { 
    const path = getPath() 
    const peopleList = JSON.parse(fs.readFileSync(path)) 
    const namePerson = person.name
    const personObj = alivePeople.filter(({name}) => name === namePerson)
    const newArray = [...alivePeople.slice(0, indexAlivePerson -1), ...peopleList.alive.slice(indexAlivePerson)] 
    alivePeople = newArray
    //вадим сказал пока не работает(а ещё написал что и не заработает(походу))

    fs.writeFileSync(path, JSON, stringify(peopleList, null, 2))  
    // сперва узнаём путь, потом читаем массив живыми 
} 
setPerson({
    name: 'VIV',
    age: 46,
    health: 19,
    tools: [],
    damage: 7,
    farmingSkill: 73
})
addDeadPerson()