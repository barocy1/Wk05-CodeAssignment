

//Create a menu app with @ least 1 array and 2 classes
//Menu should have the option to create, view, and delete elements
//You must comment on your code to show your understanding

//I'm creating a menu to manage teams & players on those teams

//My 1st class holds the name and the position of the player (object of the class). 
//The describe is the description of the player and position.

class Player {
    constructor(name, position) {
        this.name = name;
        this.position = position;
    }

    describe() {
        return `${this.name} plays ${this.position}.`;
    }
}

//Team holds the name of the team but we also need the blank array to hold the players name.
class Team {
    constructor(name) {
        this.name = name;
        this.players = [];
    }

//add player checks to see if player is an instance of Player.
//The push allows us to add another player into the array.
    addPlayer(player) {
        if (player instanceof Player) {
            this.players.push(player);
        } else {
            throw new Error(`You can only add an instance of a Player. Argument is not a player: ${player}`);
        }
    }

    describe() {
        return `${this.name} has ${this.players.length} players.`;
    }
}

//This starts our menu - this is where we initialize our team with a blank array. 
//SelectedTeam is null because we haven't entered any teams yet.

class Menu {
    constructor() {
        this.teams = [];
        this.selectedTeam = null;
    }

    //This starts our menu with menu options. This is the flow of our options
    start() {
        let selection = this.showMainMenuOptions();

        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createTeam();
                    break;
                case '2':
                    this.viewTeam();
                    break;
                case '3':
                    this.deleteTeam();
                    break;
                case '4':
                    this.displayTeams();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

         alert("GoodBye!");
    }

    //This will return a prompt from the MAIN menu
    showMainMenuOptions() {
        return prompt(`
            0) exit
            1) create new team
            2) view team
            3) delete team
            4) display all teams
         `);
    }
    
    //This will return a prompt from the TEAM menu
    showTeamMenuOptions(teamInfo) {
        return prompt (`
             0) back
             1) create player
             2) delete player
    ---------------------
             ${teamInfo}
        `);
}
//Heres were we build a string. We'll iterate through through the index of each team and make is show up in a different line.
    displayTeams() {
        let teamString = '';
        for (let i = 0; i < this.teams.length; i++) {
            teamString += i + ') ' + this.teams[i].name + '\n';
        }
        alert(teamString);
    }

    //This is where our prompt tells us where to enter name for new team. And the push adds in the new name 
    createTeam() {
        let name = prompt('Enter name for new team:');
        this.teams.push(new Team(name));
    }

    //The prompt give index of the teams you want to view.
    //The if statement here validates user input.
    //The for statement: selectedTeam. Selected team is a team, each team has a players array, 
    //so weare looking at that players array and we are iterating through it so we need the lenght from that array. 

    viewTeam() {
        let index = prompt('Enter the index of the team you wish to view:'); 
        if (index > -1 && index < this.teams.length) {
            this.selectedTeam = this.teams[index];
            let description = 'Team Name: ' + this.selectedTeam.name + '\n';

            for (let i = 0; i < this.selectedTeam.players.length; i++) {
                description += i + ')' + this.selectedTeam.players[i].name + ' - ' + this.selectedTeam.playerS[i].position + '\n';
            }

            let selection = this.showTeamMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createPlayer();
                    break;
                case '2':
                    this.deletePlayer();

            }
        }

    }

    //Heres were we delete a team, create a player, & delete a player.
    deleteTeam() {
        let index = prompt('Enter the index of the team you wish to delete:');
        if (index > -1 && this.teams.length) {
            this.teams.splice(index, 1);
        }
     }

    createPlayer(){
        let name = prompt('Enter name for new player:');
        let position = prompt('Enter position for new player:');
        this.selectedTeam.players.push(new Player(name, position));
    }

    deletePlayer() {
        let index = prompt('Enter the index of the player you wish to delete:');
        if (index > -1 && index < this.selectedTeam.players.length) {
            this.selectedTeam.players.splice(index, 1);
        }
    }

}

//This creates an instance of our menu
//Start is the method that shows everything
let menu = new Menu();
menu.start();

