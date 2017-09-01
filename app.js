var fs = require('fs'),
 inputFilePath = 'C:\\Idan\\Projects\\Interviews\\Poker\\files\\',
 inputFileName = 'input.txt';

var gameService = require('./modules/poker-game.js');

startGame(inputFilePath+inputFileName);

function startGame(fileName){
    fs.readFile(fileName, 'utf8', function(err, fileData) {
        if (err){ 
            console.error('Error in reading file: ' + inputFileName);        
        }
        else{            
            // By lines
            var lines = fileData.split('\n');
            
            for(var line = 0; line < lines.length; line++){
//                console.log("line " + line + "- " + lines[line]);                                                
                
                gameService.getTurnLine(lines[line].trim().split(' '));
            }        
        }
    });
}