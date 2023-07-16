
//Wk05 Coding Assignment
//Create a menu app with @ least 1 array and 2 classes
//Menu should have the option to create, view, and delete elements
//You must comment on your code to show your understanding

//I'm creating a menu to manage a used car lot with different makes and models and their locations.

//My 1st class holds the name Vehical (object of the class). 
//The describe is the description of the vehicals different makes and models that are avail.

class Vehical {
    constructor(model, make) {
        this.model = model;
        this.make = make;
    }

    describe() {
        return `This ${this.model} is a ${this.make}.`;
    }
}

//Location holds the name of the location but we also need the blank array to hold the different makes and models.
class Location {
    constructor(model) {
        this.model = model;
        this.vehicals = [];
    }

//add vehical checks to see if vehical is an instance of Vehical.
//The push allows us to add another vehical into the array.
    addVehical(vehical) {
        if (vehical instanceof Vehical) {
            this.vehicals.push(vehical);
        } else {
            throw new Error(`You can only add an instance of a Vehical. Argument is not a vehical: ${vehical}`);
        }
    }

    describe() {
        return `${this.model} has ${this.vehicals.length} vehicals available.`;
    }
}

//This starts our menu - this is where we initialize our locations with a blank array. 
//SelectedLocation is null because we haven't entered any locations yet.

class Menu {
    constructor() {
        this.locations = [];
        this.selectedLocation = null;
    }

    //This starts our menu with menu options. This is the flow of our options
    start() {
        let selection = this.showMainMenuOptions();

        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createLocation();
                    break;
                case '2':
                    this.viewLocation();
                    break;
                case '3':
                    this.deleteLocation();
                    break;
                case '4':
                    this.displayLocations();
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
            1) create new location
            2) view location
            3) delete location
            4) display all locations
         `);
    }
    
    //This will return a prompt from the Location menu
    showLocationMenuOptions(locationInfo) {
        return prompt (`
             0) back
             1) add a new model
             2) delete model
    ---------------------
             ${locationInfo}
        `);
}
//Heres were we build a string. We'll iterate through through the index of each locaton and make is show up in a different line.
    displayLocations() {
        let locationString = '';
        for (let i = 0; i < this.locations.length; i++) {
            locationString += i + ') ' + this.locations[i].model + '\n';
        }
        alert(locationString);
    }

    //This is where our prompt tells us where to enter model names for new location. And the push adds in the new model
    createLocation() {
        let model = prompt('Enter name for new location:');
        this.locations.push(new Location(model));
    }

    //The prompt give index of the location you want to view.
    //The if statement here validates user input.
    //The for statement: selectedLocation. Selected location is the location, each location has a vehicals array, 
    //so we are looking at that vehicals array and we are iterating through it so we need the length from that array. 

    viewLocation() {
        let index = prompt('Enter the index of the location you wish to view:'); 
        if (index > -1 && index < this.locations.length) {
            this.selectedLocation = this.locations[index];
            let description = 'Location Name: ' + this.selectedLocation.model + '\n';

            for (let i = 0; i < this.selectedLocation.vehicals.length; i++) {
                description += i + ')' + this.selectedLocation.vehicals[i].model + ' - ' + this.selectedLocation.vehicals[i].make + '\n';
            }

            let selection = this.showLocationMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createVehical();
                    break;
                case '2':
                    this.deleteVehical();

            }
        }

    }

    //Heres were we delete a location, create a vehical, & delete a vehical.
    deleteLocation() {
        let index = prompt('Enter the index of the location you wish to delete:');
        if (index > -1 && index < this.locations.length) {
            this.locations.splice(index, 1);
        }
     }

    createVehical(){
        let model = prompt('Enter model for new vehical :');
        let make = prompt('Enter make for new vehical:');
        this.selectedLocation.vehicals.push(new Vehical(model, make));
    }

    deleteVehical() {
        let index = prompt('Enter the index of the vehical you wish to delete:');
        if (index > -1 && index < this.selectedLocation.vehicals.length) {
            this.selectedLocation.vehicals.splice(index, 1);
        }
    }

}

//This creates an instance of our menu
//Start is the method that shows everything
let menu = new Menu();
menu.start();

