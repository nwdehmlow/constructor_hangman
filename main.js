var prompt = require("prompt");
prompt.start();
var Word = require("./word.js");

var game = {
  wordBank : ["HTML", "javascript", "coding", "console", "variable", "string", "boolean", "method", "jquery"],
  guessesLeft : 10,
  currentWord : null,
  startGame : function(wrd){
    var word = new Word(this.wordBank[Math.floor(Math.random()*this.wordBank.length)]);
    this.currentWord = word;
    this.currentWord.getLets();
    this.keepPromptingUser();
    },
  keepPromptingUser : function(){
    var self = this;
    prompt.get(["guessLetter"], function(err, result){
      console.log("The letter or space you guessed is " + result.guessLetter);
      var findHowManyOfUserGuess = self.currentWord.checkIfLetterFound(result.guessLetter);
      if (findHowManyOfUserGuess === 0){
        console.log("You guessed wrong!");
        console.log("Guesses left:" + self.guessesLeft);
        console
        self.guessesLeft -= 1;
      }else{
        console.log("You guessed right!")
        if (self.currentWord.didWeFindTheWord() === true){
          console.log("You Won!!");
          return 1;
        }else{
          console.log(self.currentWord.wordRender());
        }
      }
      if (self.guessesLeft > 0 && self.currentWord.found === false){
        self.keepPromptingUser();
      }
      else if(self.guessesLeft === 0){
        console.log("Game over.");
        console.log("The word was " + self.currentWord.word);
      }else{
        console.log(self.currentWord.wordRender());
      }
    });
  }
};

game.startGame();