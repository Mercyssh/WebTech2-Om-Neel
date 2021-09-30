//Example of creating a new object from class - EXECUTE AFTER CREATION OF CLASS
// const dev1 = new Developer(0, "Dinesh", "dinesh@gmail.com", "08-15-1998", "BSc", "5")
// const dev2 = new Developer(2, "Suresh", "Suresh@gmail.com", "08-15-1998", "BSc", "5")
// const ser1 = new Servicer(1, "Karuna", "Karuna@gmail.com", "07-11-1999")


//CLASS SETUP
//Employee - Master Class
//properties: id, name, email, dob 
class Employee {
    constructor(id, name, email, dob) {
        this.id = id
        this.name = name
        this.email = email
        this.dob = new Date(dob)
    }

    age() {
        return new Date().getFullYear() - this.dob.getFullYear()
    }
}

//Developer - Extension of Employee
//properties: id, name, email, dob, qualification, yoe, passcode, manager, team
class Developer extends Employee {
    constructor(id, name, email, dob, qualification, yoe, manager) {
        //Super = Inherit these properties from my parent
        super(id, name, email, dob)

        //Unique properties
        this.qualification = qualification;
        this.yoe = yoe;
        this.passcode = this.createPasscode();
        this.manager = manager;
        this.team = "Technology";
    }

    //Generate a random passcode
    createPasscode() {
        return parseInt(Math.random() * 1000000);
    }
}

//Servicer - Extension of Employee
//properties: id, name, email, dob, recommendation, manager, team
class Servicer extends Employee {
    constructor(id, name, email, dob, recommendation, manager) {
        super(id, name, email, dob) //Inherit from parent(employee)

        //Unique properties
        this.recommendation = recommendation
        this.manager = manager
        this.team = "Service"
    }

    //Verify if recommendation is provided or not
    verifyRecommendation() {
        if (this.recommendation) return true
        return false
    }

    /*Legacy Code - provided by sir
    welcome() {
        return "Let's do our job as a team!"
    }

    generateCard() {
        var cards = document.getElementById("cards")
        var html = `<div>
        <div><b>Id: <b> ${this.id}</div>
        <div><b>Name: <b> ${this.name}</div>
        <div><b>Email: <b> ${this.email}</div>
        <div><b>DOB: <b> ${this.dob}</div>
        <div><b>Age: <b> ${this.age()}</div>
        <div><b>Recommendation: <b> ${this.recommendation}</div>
    </div>`

        cards.insertAdjacentHTML("beforeend", html);
    }*/

}

//Manager - Extension of Employee
//properties: id, name, email, dob, qualification, team
class Manager extends Employee {
    constructor(id, name, email, dob, qualification, team){
        super(id, name, email, dob) //Inherit from parent(employee)

        //Unique properties
        this.qualification = qualification;
        this.team = this.checkTeam();
    }

    checkTeam(){
        if(team=="Technology" || team=="Service") return team
        else throw 'NOT VALID TEAM';
    }
}


//DOM MANIPULATION FUNCTIONS
function openDeveloperForm(){
    const developerForm = document.querySelector("#developerForm");
    const servicerForm = document.querySelector("#servicerForm");
    const managerForm = document.querySelector("#managerForm");

    //Hide / Unhide DOM stuff
    developerForm.classList.remove("invis");
    managerForm.classList.add("invis");
    servicerForm.classList.add("invis");
}

//SAVE FUNCTIONS
function addDeveloper(obj) {
    const ls = window.localStorage;

    //Get DB and parse it into an object
    let db = ls.getItem('db');
    db = JSON.parse(db);

    //Update DB
    db.developers.push(obj);

    //stringify it and save DB
    db = JSON.stringify(db);
    ls.setItem('db', db);

    //Go back to Main Screen
    openMainScreen();
}

function addServicer(obj) {
    const ls = window.localStorage;

    //Get DB and parse it into an object
    let db = ls.getItem('db');
    db = JSON.parse(db);

    //Update DB
    db.servicers.push(obj);

    //stringify it and save DB
    db = JSON.stringify(db);
    ls.setItem('db', db);

    //Go back to Main Screen
    openMainScreen();
}

function addManager(obj) {
    const ls = window.localStorage;

    //Get DB and parse it into an object
    let db = ls.getItem('db');
    db = JSON.parse(db);

    //Update DB
    db.managers.push(obj);

    //stringify it and save DB
    db = JSON.stringify(db);
    ls.setItem('db', db);

    //Go back to Main Screen
    openMainScreen();
}