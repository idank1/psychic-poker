var conf = require('../conf');
var categoriesService = require('./card-categories');
var handsCategories = categoriesService.handsCategories; 

function getTurnLine(allCards){    
    var arrHandCards = [],
        arrDeckCards = [];
    
    // Spliting the line into 'hand' cards and deck cards
    for (var i = 0; i < conf.handMaxCards; i++){
        arrHandCards.push(allCards[i]);
    }
    
    for (var i = allCards.length - conf.handMaxCards; i < allCards.length; i++){
        arrDeckCards.push(allCards[i]);
    }
    
    // Getting all the avalilable replacing options
    var handsCombos = powerSet(arrHandCards);
    
    // Checking for the best possible hand
    var bestCategory = checkForBestHand(handsCombos, arrHandCards, arrDeckCards);    
    
    printHandLine(bestCategory, arrHandCards, arrDeckCards);
}

function checkForBestHand(handsCombos, arrHandCards, arrDeckCards){
    // Initializing the current best hand to be the worst
    var currentBestCategory = handsCategories.length - 1;
    
    // Running over the combos.. for each combo, check if the hand is better than the current best hand
    for (var currentCombo = 0; currentCombo < handsCombos.length; currentCombo++){        
        // Calculating the remaining cards by filtering the current hand with the current combo
        var remainedHandCards = arrHandCards.filter(function(val) {
          return handsCombos[currentCombo].indexOf(val) == -1;
        });
            
        // Filling the hands cards with new cards from the deck
        var newHand = takeNewCardsFromDeck(remainedHandCards, arrDeckCards);                
        
        // Checking for the current category of our hand
        var currentCategory = checkHandCategory(newHand);
        
        if(currentCategory < currentBestCategory){
            currentBestCategory = currentCategory;
        }                                
    }
    
    return currentBestCategory;
}

function printHandLine(bestHandCategory, newHand, arrDeckCards){
    console.log("Hand: " + newHand + " Deck: " + arrDeckCards + " Best hand: "+handsCategories[bestHandCategory].name);
}

function checkHandCategory(hand){
    // Initialize the hand name to the default case
    var categoryNumber = handsCategories.length - 1;
    
    for (var currCategory = 0; currCategory < handsCategories.length - 1; currCategory++){
        if (handsCategories[currCategory].function(hand)){
            categoryNumber = currCategory;
            break;
        }
    }
    
    return categoryNumber;
}

function takeNewCardsFromDeck(remainedHandCards, arrDeckCards){
    var newHand = [];
    newHand.push.apply(newHand,remainedHandCards);
    
    for (var i = 0; i < conf.handMaxCards - remainedHandCards.length; i++){        
        newHand.push(arrDeckCards[i]);
    }
    
    return newHand;
}

function powerSet(list){
    var set = [],
        listSize = list.length,
        combinationsCount = (1 << listSize),
        combination;
    
    for (var i = 1; i <= combinationsCount ; i++ ){
        var combination = [];
        for (var j=0;j<listSize;j++){
            if ((i & (1 << j))){
                combination.push(list[j]);
            }
        }
        set.push(combination);
    }
    
    return set;
}

module.exports = {
    getTurnLine: getTurnLine
}
