/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    let container = document.getElementById("games-container");
    // loop over each item in the data
    for(let i=0; i<games.length; i++){
        let element = document.createElement("div");
        element.classList.add("game-card");
        const display = `
        <p>
        <img class="game-img" src=${games[i].img} />
        <strong><h2>${games[i].name}</h2></strong>
        ${games[i].description}<br><br>
        <strong>Pledged:</strong> ${games[i].pledged}<br>
        <strong>Goal:</strong> ${games[i].goal}<br>
        <strong>Backers:</strong> ${games[i].backers}<br>
        </p>
        `;
        element.innerHTML = display;
        container.appendChild(element);
    }

        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
let total = GAMES_JSON.reduce((accumulated, game) => accumulated + game.backers, 0);
let display = `${total.toLocaleString('en-US')}`;
contributionsCard.innerHTML = display;
// use reduce() to count the number of total contributions by summing the backers


// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
let totalRaised = GAMES_JSON.reduce((accumulated, game) => accumulated + game.pledged, 0);
let displayTotalRaised = `$${totalRaised.toLocaleString('en-US')}`;
raisedCard.innerHTML = displayTotalRaised;

// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
let numGames = GAMES_JSON.length;
let displayNumGames = `${numGames}`;
gamesCard.innerHTML = displayNumGames;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    let unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);
    console.log(unfundedGames);
    addGamesToPage(unfundedGames);

    // use filter() to get a list of games that have not yet met their goal


    // use the function we previously created to add the unfunded games to the DOM

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    let fundedGames = GAMES_JSON.filter((game) => game.pledged >= game.goal);
    console.log(fundedGames);
    addGamesToPage(fundedGames);

    // use filter() to get a list of games that have met or exceeded their goal


    // use the function we previously created to add unfunded games to the DOM

}


// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);

    // add all games from the JSON data to the DOM

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
unfundedBtn.addEventListener("click", filterUnfundedOnly);
const fundedBtn = document.getElementById("funded-btn");
fundedBtn.addEventListener("click", filterFundedOnly);
const allBtn = document.getElementById("all-btn");
allBtn.addEventListener("click", showAllGames);

// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unfundedGames = GAMES_JSON.reduce((acc, game) => game.pledged < game.goal ? acc + 1 : acc, 0);
let neededFunding = GAMES_JSON.reduce((acc, game) => game.pledged < game.goal ? acc + game.goal - game.pledged : acc, 0);
let formatStr = neededFunding.toLocaleString('en-US');
// create a string that explains the number of unfunded games using the ternary operator
const description = `Currently, ${unfundedGames} have not reached their funding goal. We need your help to raise a further $${formatStr} to help 
fund these games!`;
const descElement = document.createElement("p");
descElement.innerHTML = description;
descriptionContainer.appendChild(descElement);
// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */


const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [first, second, ...othergames] = sortedGames;
//console.log(first, second);
let topFundedGame = document.createElement("p");
let secondFundedGame = document.createElement("p");
topFundedGame.innerHTML = `<strong><h2>${first.name}<h2></strong>`;
secondFundedGame.innerHTML = `<strong><h2>${second.name}<h2></strong>`;
firstGameContainer.appendChild(topFundedGame);
secondGameContainer.appendChild(secondFundedGame);

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item