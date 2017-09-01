var conf = require('../conf.js');
const cardDictionary = {'T':10, 'J':11, 'Q':12, 'K':13};

function createNumbersArray(hand){
    var cardsArray = [],
        cardValue;
    
    for (var currCard = 0; currCard < hand.length; currCard++){
        cardValue = hand[currCard][0];
        
        if(cardValue === 'A'){
            cardsArray[1] = +cardsArray[1] ? cardsArray[1] + 1 : 1;
            cardsArray[14] = +cardsArray[14] ? cardsArray[14] + 1 : 1;
        }
        else if (cardDictionary[cardValue]){
            cardValue = cardDictionary[cardValue];
            cardsArray[cardValue] = +cardsArray[cardValue] ? cardsArray[cardValue] + 1 : 1;
        }        
        else{
            cardsArray[cardValue] = +cardsArray[cardValue] ? cardsArray[cardValue] + 1 : 1;
        }
    }
    
    return cardsArray;
}

var checkIfStraightFlush = function(hand){
    if (checkIfFlush(hand) && checkIfStraight(hand)){
        return true;
    }
    else{
        return false;
    }
}

var checkIfFiveOfAKind = function(hand){
    var isFiveOfAKind = false,
        cardsArray = createNumbersArray(hand);
    
    for (var currCard = 1; currCard < cardsArray.length; currCard++){
        if (cardsArray[currCard] === 5){
            isFiveOfAKind = true;
            break;
        }
    }
    
    return isFiveOfAKind;
}

var checkIfFourOfAKind = function(hand){
    var isFourOfAKind = false,
        cardsArray = createNumbersArray(hand);
    
    for (var currCard = 1; currCard < cardsArray.length; currCard++){
        if (cardsArray[currCard] === 4){
            isFourOfAKind = true;
            break;
        }
    }
    
    return isFourOfAKind;
}

var checkIfFullHouse = function(hand){
    var isFullHouse = false,
        isFoundPair = false,
        isFoundThree = false,
        cardsArray = createNumbersArray(hand);
    
    for (var currCard = 1; currCard < cardsArray.length; currCard++){
        if (cardsArray[currCard] === 3){
            if(isFoundPair){
                isFullHouse = true;
                break;
            }
            else{
                isFoundThree = true;
            }
        }        
        else if (cardsArray[currCard] === 2){
            if(isFoundThree){
                isFullHouse = true;
                break;
            }
            else{
                isFoundPair = true;
            }
        }
    }
    
    return isFullHouse;
}

var checkIfFlush = function(hand){
    var IsFlush = true;
    
    for (var currCard = 0; currCard < hand.length - 1 && IsFlush; currCard++){
        if (hand[currCard][1] !== hand[currCard + 1][1]){
            IsFlush = false;
        }
    }
    
    return IsFlush;
}

var checkIfStraight = function(hand){
    var cardsArray = createNumbersArray(hand);
    
    var straightCardsCounter = 0;
    // We made array where each index represents wheter the card with the value of the index is exists
    for (var currCard = 1; currCard < cardsArray.length && straightCardsCounter < conf.handMaxCards; currCard++){
        // Check if we have the current card in the 'hand'
        if (cardsArray[currCard]){
            straightCardsCounter++;
        }
        else{
            straightCardsCounter = 0;
        }
    }
    
    if (straightCardsCounter === 5){
        isFoundStraight = true;
    }
    else{
        isFoundStraight = false;
    }
    
    return isFoundStraight;
}

var checkIfThreeOfAKind = function(hand){
    var isThreeOfAKind = false,
        cardsArray = createNumbersArray(hand);
    
    for (var currCard = 1; currCard < cardsArray.length; currCard++){
        if (cardsArray[currCard] === 3){
            isThreeOfAKind = true;
            break;
        }
    }
    
    return isThreeOfAKind;
}

var checkIfTwoPairs = function(hand){
    var isTwoPairs = false,
        pairsNumber = 0,
        cardsArray = createNumbersArray(hand);
    
    // We don't want to count the Ace twice, so we will start from 2
    for (var currCard = 2; currCard < cardsArray.length; currCard++){
        if (cardsArray[currCard] === 2){
            pairsNumber++;
        }
    }
    
    if (pairsNumber >= 2){
        isTwoPairs = true;
    }
    
    return isTwoPairs;
}

var checkIfPair = function(hand){
    var isPair = false,
        cardsArray = createNumbersArray(hand);
    
    for (var currCard = 1; currCard < cardsArray.length; currCard++){
        if (cardsArray[currCard] === 2){
            isPair = true;
        }
    }
    
    return isPair;
}

var handsCategories = [
                        {name: "Five of a kind", function: checkIfFiveOfAKind},
                        {name: "Straight flush", function: checkIfStraightFlush},
                        {name: "Four of a kind", function: checkIfFourOfAKind},
                        {name: "Full house", function: checkIfFullHouse},
                        {name: "Flush", function: checkIfFlush},
                        {name: "Straight", function: checkIfStraight},
                        {name: "Three of a kind", function: checkIfThreeOfAKind},
                        {name: "Two pairs", function: checkIfTwoPairs},
                        {name: "One pair", function: checkIfPair},
                        {name: "High card"}];

module.exports = {
    handsCategories: handsCategories
};