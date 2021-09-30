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
        this.team = this.checkTeam(team);
    }

    checkTeam(team){
        if(team=="Technology" || team=="Service") return team
        else throw 'NOT VALID TEAM';
    }
}


//DOM MANIPULATION FUNCTIONS

/*OLD FORM OPENS
function openDeveloperForm(){
    // Get Form
    const developerForm = document.querySelector("#developerform");
    const newEmployeeDropdown = document.querySelector("#newemployeedropdown");

    //Open it
    developerForm.classList.remove("offscreenright");
    newEmployeeDropdown.classList.add("disabled");
}

function openServicerForm(){
    const servicerForm = document.querySelector("#servicerform");
    const newEmployeeDropdown = document.querySelector("#newemployeedropdown");

    servicerForm.classList.remove("offscreenright");
    newEmployeeDropdown.classList.add("disabled");
}

function openManagerForm(){
    const managerForm = document.querySelector("#managerform");
    const newEmployeeDropdown = document.querySelector("#newemployeedropdown");
    
    managerForm.classList.remove("offscreenright");
    newEmployeeDropdown.classList.add("disabled");
} */

// Universal Open Form Functions
function openForm(formid){
    document.querySelector(formid).classList.remove("offscreenright");
    document.querySelector("#newemployeedropdown").classList.add("disabled");
    document.querySelector("#employeelist").classList.add("offscreenleft");
}
function closeForms(){
    populateCards();

    // Get all forms
    const developerForm = document.querySelector("#developerform");
    const servicerForm = document.querySelector("#servicerform");
    const managerForm = document.querySelector("#managerform");
    const newEmployeeDropdown = document.querySelector("#newemployeedropdown");
    document.querySelector("#employeelist").classList.remove("offscreenleft");


    // Hide em all
    developerForm.classList.add("offscreenright");
    servicerForm.classList.add("offscreenright");
    managerForm.classList.add("offscreenright");
    newEmployeeDropdown.classList.remove("disabled");   //disable dropdown

    // Clear all Forms
    developerForm.reset();
    servicerForm.reset();
    managerForm.reset();

}

//SAVE & UPDATE FUNCTIONS
function addDeveloper() {
    //constructor(id, name, email, dob, qualification, yoe, manager)

    const ls = window.localStorage;
    const firstname = document.querySelector("#developerform #firstname").value;
    const lastname = document.querySelector("#developerform #lastname").value;
    const dob = document.querySelector("#developerform #dateofbirth").value;
    const email = document.querySelector("#developerform #email").value;
    const employeeid = document.querySelector("#developerform #employeeid").value;
    const qualification = document.querySelector("#developerform #qualification").value;
    const yoe = document.querySelector("#developerform #yoe").value; 
    const selectmanager = document.querySelector("#developerform #selectmanager");

    //Validation and Update
    if(firstname&&lastname&&employeeid&&dob&&email&&qualification&&yoe&&selectmanager.value!=0){

        var tempmanager=selectmanager.options[selectmanager.selectedIndex].text;
        const obj = new Developer(employeeid, firstname+" "+lastname, email, dob, qualification, yoe, tempmanager);

        //Get DB
        let db = ls.getItem('db');
        db = JSON.parse(db);

        //Update DB
        db.developers.push(obj);

        //Set DB
        db = JSON.stringify(db);
        ls.setItem('db', db);

        closeForms();
    } else {
        console.log("invalid");
    }
}

function addServicer() {
    //constructor(id, name, email, dob, recommendation, manager)
    const ls = window.localStorage;
    const firstname = document.querySelector("#servicerform #firstname").value;
    const lastname = document.querySelector("#servicerform #lastname").value;
    const dob = document.querySelector("#servicerform #dateofbirth").value;
    const email = document.querySelector("#servicerform #email").value;
    const employeeid = document.querySelector("#servicerform #employeeid").value;
    let recommendation = document.querySelector("#servicerform #recommendation").value;
    const selectmanager = document.querySelector("#servicerform #selectmanager");

    //Validation and Update
    if(firstname&&lastname&&dob&&email&&employeeid&&selectmanager.value!=0){
        
        //Get selected Manager Name & Set empty recommendation
        if(!recommendation) recommendation="";
        var tempmanager=selectmanager.options[selectmanager.selectedIndex].text;
        const obj = new Servicer(employeeid, firstname+" "+lastname, email, dob, recommendation, tempmanager);
        // console.log(obj);

        //Get DB
        let db = ls.getItem('db');
        db = JSON.parse(db);

        //Update DB
        db.servicers.push(obj);

        //Set DB
        db = JSON.stringify(db);
        ls.setItem('db', db);

        closeForms();        
    } else {
        console.log("invalid!");
    }
}

function addManager() {
    
    //Get Inputs & Elements
    const ls = window.localStorage;
    const firstname = document.querySelector("#managerform #firstname").value;
    const lastname = document.querySelector("#managerform #lastname").value;
    const dob = document.querySelector("#managerform #dateofbirth").value;
    const email = document.querySelector("#managerform #email").value;
    const employeeid = document.querySelector("#managerform #employeeid").value;
    const qualification = document.querySelector("#managerform #qualification").value;
    const team = document.querySelector("#managerform #selectteam").value;
    const selectmanager1 = document.querySelectorAll("#developerform #selectmanager");
    const selectmanager2 = document.querySelectorAll("#servicerform #selectmanager");

    //Validation & Update DB
    if(firstname&&lastname&&dob&&email&&employeeid&&qualification&&(team==1||team==2)){
        //Create obj - constructor(id, name, email, dob, qualification, team)
        const obj = new Manager(employeeid, firstname+" "+lastname, email, dob, qualification, team==1?"Technology":"Service");

        //Get DB
        let db = ls.getItem('db');
        db = JSON.parse(db);

        //Update DB
        if(team=="1")
            db.managers.technology.push(obj);
        else
            db.managers.service.push(obj);

        // console.log(selectmanager1);
        // console.log(selectmanager2);

        //stringify it and save DB
        db = JSON.stringify(db);
        ls.setItem('db', db);

        updateManagerList();

        //Go back to Main Screen
        closeForms();
    }
    else {
        console.log("invalid!");
    }
}

function updateManagerList(){

    //Get DOM
    const selectmanager1 = document.querySelector("#developerform #selectmanager");
    const selectmanager2 = document.querySelector("#servicerform #selectmanager");

    //Get DB
    const ls = window.localStorage;
    db = ls.getItem('db');
    db = JSON.parse(db);

    //Update DOM
    selectmanager1.innerHTML='<option value="0" selected>Unappointed</option>';
    for(let i=0; i<db.managers.technology.length; i++){
        selectmanager1.innerHTML+=`<option value="${i+1}">${db.managers.technology[i].name}</option>`;
    }
    selectmanager2.innerHTML='<option value="0" selected>Unappointed</option>';
    for(let i=0; i<db.managers.service.length; i++){
        selectmanager2.innerHTML+=`<option value="${i+1}">${db.managers.service[i].name}</option>`
    }

}

function populateCards(){
    //Get Elements
    const employeelist = document.querySelector("#employeelist .row");
    const developercardtemplate = document.querySelector("#developercardtemplate");
    const servicercardtemplate = document.querySelector("#servicercardtemplate");
    const managercardtemplate = document.querySelector("#managercardtemplate");

    //Get Database
    const ls = window.localStorage;
    let db = ls.getItem('db');
    db = JSON.parse(db);

    //Populate Developers
    for(let i=0; i<db.developers.length; i++){
        var temp = developercardtemplate.content.cloneNode(true);
        temp.querySelector(".employeename").innerHTML=db.developers[i].name;
        temp.querySelector(".employeeid").innerHTML=`Developer | #${db.developers[i].id}`
        temp.querySelector(".employeemanager").innerHTML=db.developers[i].manager;
        temp.querySelector(".employeequalification").innerHTML=db.developers[i].qualification;
        temp.querySelector(".yoe").innerHTML=db.developers[i].yoe;
        temp.querySelector(".employeeemail").innerHTML=db.developers[i].email;
        temp.querySelector("abbr").title=db.developers[i].passcode;

        // var tempdob = db.developers[i].dob.getDate()+"/"+(db.developers[i].dob.getMonth()+1)+"/"+db.developers[i].dob.getFullYear();
        var tempdob = new Date(db.developers[i].dob);
        tempdob = tempdob.getDate()+"/"+(tempdob.getMonth()+1)+"/"+tempdob.getFullYear();
        temp.querySelector(".employeedob").innerHTML=tempdob;

        employeelist.appendChild(temp);
    }

    //Populate Servicers
    for(let i=0; i<db.servicers.length; i++){
        var temp = servicercardtemplate.content.cloneNode(true);
        temp.querySelector(".employeename").innerHTML=db.servicers[i].name;
        temp.querySelector(".employeeid").innerHTML=`Servicer | #${db.servicers[i].id}`
        temp.querySelector(".employeemanager").innerHTML=db.servicers[i].manager;
        temp.querySelector(".employeerecommendation").innerHTML= db.servicers[i].recommendation||"NaN";
        temp.querySelector(".employeeemail").innerHTML=db.servicers[i].email;

        // var tempdob = db.developers[i].dob.getDate()+"/"+(db.developers[i].dob.getMonth()+1)+"/"+db.developers[i].dob.getFullYear();
        var tempdob = new Date(db.servicers[i].dob);
        tempdob = tempdob.getDate()+"/"+(tempdob.getMonth()+1)+"/"+tempdob.getFullYear();
        temp.querySelector(".employeedob").innerHTML=tempdob;

        employeelist.appendChild(temp);
    }

    //Populate Tech-Managers
    for(let i=0; i<db.managers.technology.length; i++){
        var temp = managercardtemplate.content.cloneNode(true);
        temp.querySelector(".employeename").innerHTML=db.managers.technology[i].name;
        temp.querySelector(".employeeid").innerHTML=`Manager | #${db.managers.technology[i].id}`
        temp.querySelector(".employeeemail").innerHTML=db.managers.technology[i].email;
        temp.querySelector(".employeequalification").innerHTML=db.managers.technology[i].qualification;
        temp.querySelector(".employeeteam").innerHTML=db.managers.technology[i].team;

        // var tempdob = db.developers[i].dob.getDate()+"/"+(db.developers[i].dob.getMonth()+1)+"/"+db.developers[i].dob.getFullYear();
        var tempdob = new Date(db.managers.technology[i].dob);
        tempdob = tempdob.getDate()+"/"+(tempdob.getMonth()+1)+"/"+tempdob.getFullYear();
        temp.querySelector(".employeedob").innerHTML=tempdob;

        employeelist.appendChild(temp);
    }

    for(let i=0; i<db.managers.service.length; i++){
        var temp = managercardtemplate.content.cloneNode(true);
        temp.querySelector(".employeename").innerHTML=db.managers.service[i].name;
        temp.querySelector(".employeeid").innerHTML=`Manager | #${db.managers.service[i].id}`
        temp.querySelector(".employeeemail").innerHTML=db.managers.service[i].email;
        temp.querySelector(".employeequalification").innerHTML=db.managers.service[i].qualification;
        temp.querySelector(".employeeteam").innerHTML=db.managers.service[i].team;

        // var tempdob = db.developers[i].dob.getDate()+"/"+(db.developers[i].dob.getMonth()+1)+"/"+db.developers[i].dob.getFullYear();
        var tempdob = new Date(db.managers.service[i].dob);
        tempdob = tempdob.getDate()+"/"+(tempdob.getMonth()+1)+"/"+tempdob.getFullYear();
        temp.querySelector(".employeedob").innerHTML=tempdob;

        employeelist.appendChild(temp);
    }
}

// Attach Event Handlers
(function(){

    //Get Elements
    //-Forms
    const newDeveloperBtn = document.querySelector("#newdeveloperbtn");
    const newServicerBtn = document.querySelector("#newservicerbtn");
    const newManagerBtn = document.querySelector("#newmanagerbtn");
    //-Btns
    const cancelBtns = document.querySelectorAll("#cancelbtn");
    const addDeveloperBtn = document.querySelector("#developerform #addemployeebtn");
    const addServicerBtn = document.querySelector("#servicerform #addemployeebtn");
    const addManagerBtn = document.querySelector("#managerform #addemployeebtn");

    // Show Forms
    newDeveloperBtn.addEventListener("click", ()=> openForm("#developerform"));
    newServicerBtn.addEventListener("click", ()=> openForm("#servicerform"));
    newManagerBtn.addEventListener("click", ()=> openForm("#managerform"));

    //Cancel Forms
    for (const cancelbtn of cancelBtns){
        cancelbtn.addEventListener("click", closeForms);
    }

    //Add Applicant
    addDeveloperBtn.addEventListener("click", addDeveloper);
    addServicerBtn.addEventListener("click", addServicer);
    addManagerBtn.addEventListener("click", addManager);

    //Create Base Database
    const ls = window.localStorage;
    let db = ls.getItem('db');
    db = JSON.parse(db);
    if(!db){
        db={
            developers: [],
            servicers: [],
            managers: {
                technology: [],
                service: []
            }
        };

        db=JSON.stringify(db);
        ls.setItem('db', db);
        console.log("Created Empty Database");
    }
    console.log(db);

    //Update DOM on load
    updateManagerList();
    populateCards();
})();