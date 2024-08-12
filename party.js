// Description: Sprint 2 Problem 3 - Create a JSON file and manipulate and output
//              to console and browser all the file's attributes - A D&D adventuring
//              party.  Tested with live server porting to Edge.  Thanks to the GitHub 
//              of prawstho, O'Reilly App with downloadable library, and Chat GPT.
// Author:      David C Elliott
// Date:        Aug 1 - 12th, 2024
// COmplete file package: party.js, party.json, index.html
// JS object defined below

// Function to emulate a roll of a d20
function rollD20() {
    return Math.floor(Math.random() * 20) + 1;
}

// Function to calculate the to-hit roll and return a script
function toHit(character) {
    const toHitRoll = rollD20();
    const attackModifier = parseInt(character.attacks[0].attackModifier, 10); 
    const totalToHit = toHitRoll + attackModifier;
    return `${character.name} rolls a ${toHitRoll} to which their attack modifier of ${attackModifier} is added,\n` +
           `resulting in a total of ${totalToHit} to hit an AC of ${totalToHit}.`;
}

// Function to calculate xp for level up and return a script
function levelUp(character) {
    const currXP = character.xp;
    const nextXP = character.nextLevel;
    const xpNeed = nextXP - currXP;
    const nextLVL = character.level + 1;
    return `${character.name} requires ${xpNeed} xp to advance to level ${nextLVL}.`;
}

// Function to compare races and generate a message
function raceComp(party) {
    if (party.length < 6) {
        return 'Not enough characters to generate the race comparison message.';
    }

    // Extract the races
    const races = party.map(character => character.race);

    // Ensure the races array has at least 6 elements
    if (races.length < 6) {
        return 'Not enough races available to complete the message.';
    }

    return `A party consisting of a ${races[0]}, a ${races[1]}, \n` +
           `a ${races[2]}, a ${races[3]}, and a ${races[4]} \n` +
           `and a ${races[5]} is gonna save the world.`;
}

// Fetch the party.json file
fetch('./party.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const container = document.createElement('div');
    container.id = 'partyContainer';

    // Call raceComp with the party data and log the result
    console.log(raceComp(data.party));

    // Process each character in the party
    data.party.forEach(character => {
      const characterDiv = document.createElement('div');
      characterDiv.className = 'character';

      characterDiv.innerHTML = `
        <h2>${character.name} (${character.race} ${character.class})</h2>
        <p>Level: ${character.level}</p>
        <p>XP: ${character.xp}</p>
        <p>Next Level: ${character.nextLevel}</p>
        <p>Hit Points: ${character.hitPoints}</p>
        <p>Armor Class: ${character.AC}</p>
        <p>Movement: ${character.movement}</p>
        <p>Primary Skill: ${getPrimarySkill(character)}</p>
        <p>Main Spell: ${getMainSpell(character)}</p>
        <p>Main Attack: ${getMainAttack(character)}</p>
        <p>${toHit(character)}</p>
        <p>${levelUp(character)}</p>
      `;

      // Add the character's div to the container
      container.appendChild(characterDiv);

      // Also log the data to the console
      console.log(`${character.name} (${character.race} ${character.class})`);
      console.log(`Level: ${character.level}`);
      console.log(`XP: ${character.xp}`);
      console.log(`Next Level: ${character.nextLevel}`);
      console.log(`Hit Points: ${character.hitPoints}`);
      console.log(`Armor Class: ${character.AC}`);
      console.log(`Movement: ${character.movement}`);
      console.log(`Primary Skill: ${getPrimarySkill(character)}`);
      console.log(`Main Spell: ${getMainSpell(character)}`);
      console.log(`Main Attack: ${getMainAttack(character)}`);
      console.log(toHit(character)); 
      console.log(levelUp(character)); 
    });

    // Add the container to the body of the HTML
    document.body.appendChild(container);
  })
  .catch(error => {
    // Handle any errors that occur while fetching the file
    console.error('There has been a problem with your fetch operation:', error);
  });

// Functions to handle the nested arrays
function getPrimarySkill(character) {
    // Return the first skill listed
    return character.skills[0];
}

function getMainSpell(character) {
    // Return the first level 1 spell, if available
    return character.spells.level1 ? character.spells.level1[0] : 'No spells';
}

function getMainAttack(character) {
    // Return the name of the first attack
    return character.attacks[0].name;
}