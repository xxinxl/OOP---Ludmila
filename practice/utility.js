import fs from 'fs';
import path from 'path';
import _ from 'lodash';
// import { stringify } from 'querystring';
import readlineSync from 'readline-sync';
import Apache from './classes/apache.js';
import Redneck from './classes/Redneck.js';
import Weapon from './classes/weapon.js';
import Tool from './classes/tool.js';

const getPath = (fPath) => path.resolve() + fPath;

const createObject = () => {
  const classes = ['Apache', 'Redneck', 'Tool', 'Weapon'];
  const classToCreate = readlineSync.keyInSelect(classes, 'who to create?');

  if (classToCreate === -1) {
    console.log('ну не надо так, не надо');
    return false;
  }

  console.log(classToCreate);

  const name = classToCreate < 2 ? readlineSync.question('Name: ')
    : readlineSync.question('title: ');

  const obj = classToCreate === 0 ? new Apache(name)
    : classToCreate === 1 ? new Redneck(name)
      : classToCreate === 2 ? new Tool(name) : new Weapon(name);

  console.log(obj);
  setPerson(obj);
};

const setPerson = (person) => {
  const fPath = getPath('/people.json');
  const listOfPerson = JSON.parse(fs.readFileSync(fPath));
  listOfPerson.alive.push(person);
  fs.writeFileSync(fPath, JSON.stringify(listOfPerson, null, 2), 'utf-8');
};

const deleteDeadPerson = (person) => {
  const fPath = getPath('/people.json');
  const listOfPerson = JSON.parse(fs.readFileSync(fPath));

  const nameOfDead = person.name;

  const filtered = listOfPerson.alive.filter(({ name }) => name !== nameOfDead);
  listOfPerson.alive = filtered;
  fs.writeFileSync(fPath, JSON.stringify(listOfPerson, null, 2), 'utf-8');
};

const updatePerson = (person) => {
  const fPath = getPath('/people.json');
  const listOfPerson = JSON.parse(fs.readFileSync(fPath));
  const nameToUpdate = person.name;
  const filtered = listOfPerson.alive.filter(({ name }) => name !== nameToUpdate);
  listOfPerson.alive = filtered;
  listOfPerson.alive.push(person);
  fs.writeFileSync(fPath, JSON.stringify(listOfPerson, null, 2), 'utf-8');
};

const backToClass = (name) => {
  const fPath = getPath('/people.json');
  const listOfPerson = JSON.parse(fs.readFileSync(fPath));

  const filtered = listOfPerson.alive.filter(({ nameIter }) => name === nameIter).at(0);

  let classObject;
  switch (filtered.className) {
    case 'Apache':
      classObject = new Apache(name);
      break;
    case 'Redneck':
      classObject = new Redneck(name);
      break;
    case 'Weapon':
      classObject = new Weapon(name);
      break;
    default:
      classObject = new Tool(name);
      break;
  }

  const entries = Object.entries(filtered);

  entries.forEach(([key, value]) => {
    classObject[key] = _.isObject(value) ? value.map((item) => backToClass(item)) : value;
  });
  return classObject;
};

export {
  setPerson, deleteDeadPerson, updatePerson, backToClass, createObject,
};
