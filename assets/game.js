//enemy name is set to any
var fight = function (enemy) {

  // repeat and execute as long as the enemy-robot is alive 
  while (playerInfo.health > 0 && enemy.health > 0) {

    // ask player if they'd like to fight or run
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

     // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");
    
      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
        // subtract money from playerInfo.money for skipping
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        console.log("playerMoney", playerInfo.money)
        window.alert(playerInfo.name + ' has ' + playerInfo.money + ' money left ')
        break;
      }
    }

    // Alert players that they are starting the round
    //window.alert("Welcome to Robot Gladiators!");

    // generate random damage value based on player's attack power
    var damage = randomNumber(playerInfo.money - 3, playerInfo.money);

    enemy.health = Math.max(0, enemy.health - damage);

    console.log(
      playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
    );
    window.alert(playerInfo.name + " attacked " + enemy.name)

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + " has died!");
      // award player money for winning
      playerInfo.money = playerInfo.money + 20;
      console.log("player money", playerInfo.money)
      window.alert(playerInfo.name + ' now has ' + playerInfo.money + ' money ')
      // leave while() loop since enemy is dead
      break;
    }
    else {
      window.alert(enemy.name + " still has " + enemy.health + " health left.");
    }



    // remove player's health by subtracting the amount set in the enemyAttack variable
    // generate random damage value based on player's attack power
    var damage = randomNumber(enemy.attack - 3, enemy.attack);

    playerInfo.health = Math.max(0, playerInfo.health - damage);

    console.log(
      enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
    );
    window.alert(enemy.name + " attacked " + playerInfo.name)

    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + " has died!");
      // leave while() loop if player is dead
      break;
    }
    else {
      window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
    }

  }

};


// function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

var playerInfo = {
  name: window.prompt("What is your robot's name?"),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  }, // comma!

  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
     this.health += 20;
     this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  }, // comma!

  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
     this.attack += 6;
     this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  }
};

var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];

// You can also log multiple values at once like this
console.log(playerInfo.name, playerInfo.attack, playerInfo.health);


var startGame = function() {
  for (var i = 0; i < enemyInfo.length; i++) {
    startGame = function() {
     // reset player stats
     playerInfo.reset();
    }

    if (playerInfo.health > 0) {

     // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
     window.alert("Welcome to Robot Gladiators! Round " + (i + 1) );

     // pick new enemy to fight based on the index of the enemyInfo array
     var pickedEnemyObj = enemyInfo[i];

     // reset enemy.health before starting new fight
     pickedEnemyObj.health = randomNumber(40, 60);

     // use debugger to pause script from running and check what's going on at that moment in the code
      debugger;

     // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
     fight(pickedEnemyObj);

      // if player is still alive and we're not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
          // ask if player wants to use the store before next round
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

        // if yes, take them to the store() function
        if (storeConfirm) {
          shop();
        }
      }

    }
    else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }

  }
  // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
  endGame();
};


var shop = function() {

  window.alert("entered the shop");
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
  );

  // use switch to carry out action
 switch (shopOptionPrompt) {
   case "REFILL": // new case
   case "refill":
    playerInfo.refillHealth();
     break; 

   case "UPGRADE": // new case   
   case "upgrade":
    playerInfo.upgradeAttack();
     break;

   case "LEAVE": // new case
   case "leave":
     window.alert("Leaving the store.");

     // do nothing, so function will end
     break;
   default:
     window.alert("You did not pick a valid option. Try again.");

     // call shop() again to force player to pick a valid option
     shop();
    break;
  }
};
// start the game when the page loads
startGame();


// function to end the entire game
function endGame() {
  
  window.alert("The game has now ended. Let's see how you did!");

  // if player is still alive, player wins!
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
  } 
  else {
    window.alert("You've lost your robot in battle.");
  }

  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");
  if (playAgainConfirm) {
    // restart the game
    startGame();
  } 
  else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }

};


//var enemy = {
  //name: "Roborto",
  //attack: randomNumber(10, 14),
  //shield: {
    //type: "wood",
    //strength: 10
  //}
//};