
class Form
{
    constructor(title, description, highPriority) {
        this.title = title;
        this.description = description;
        this.highPriority = highPriority;

      // this.push({label: '<input type="button" value="B"/>' });

    }

    /*creatFormObject()*/

    getOneForm(){
        return this.title + '\n' + this.description + '\n';
    }

}
//--------------------------------------
//--------------------------------------
function addToList(form)
{
   /* let obj = form.title + '\n' + form.description + '\n';*/
    formList.push(form.getOneForm());
}
//-----------------------------------------
function printForm()
{
    lst = []
    for(let form of formList)
    {
        lst.push(form.getOneForm())
        console.log(form.getOneForm());
    }
    return lst;
}

formList = []

/*let form1 = new Form('Exercise 2', 'internet programming course', true);
let form2 = new Form('Shopping', 'Buy milk', false);*/

/*addToList(form1);
addToList(form2);*/

printForm()
//-------------------------------------------------------
/*document.getElementById("myBtn").onclick = function() {addButton()};*/
function addButtonClicked() {
    if ( typeof addButtonClicked.counter == 'undefined' ) {
        addButtonClicked.counter = 0;
    }

    document.getElementById('incorrectInput').value = '';
    let inpTitle = document.getElementById("titleID");
    let inpDescription =  document.getElementById("descriptionID");

    if (isEmpty(inpTitle) || !check(inpTitle)) {
        error('please enter a non empty title with letters and digits only\n');
        inpTitle.value = '';
        return; }
    if (isEmpty(inpDescription)) {
        error('please enter a non empty text description\n');
        inpDescription.value = '';
        return; }

    /*let form = new Form(inpTitle.value, inpDescription.value, false);
    addToList(form);*/

    let outForm = document.getElementById('formOutput');
    outForm.setAttribute("class", "card w-100  border border-5 rounded-3 d-block");
/*     outForm.appendChild(document.getElementById('title').innerHTML = inpTitle.value );
     outForm.appendChild(document.getElementById('desc').innerHTML = inpDescription.value);*/

     document.getElementById('title').innerHTML = inpTitle.value.trim();
     document.getElementById('desc').innerHTML = inpDescription.value.trim();
     document.getElementById("delete").setAttribute("class", "d-block btn btn-danger ");

    createForm(inpTitle.value, inpDescription.value);

   // document.getElementById("demo").innerHTML = formList;

    document.getElementById('incorrectInput').setAttribute("class", "d-none");
    inpTitle.value = '';
    inpDescription.value = '';
}
//-----------------------------------------------
function check(inp){
    return inp.value.match(/[a-z]/i) || !isNaN(inp.value);
}
//-------------------------------------
function isEmpty(inp){
    return (inp.value.length == 0)
}
//----------------------------------------
function error(str){
    let incorrect =  document.getElementById('incorrectInput')
    incorrect.innerHTML = str + "<br />";
    incorrect.setAttribute("class", "alert alert-danger")
}
//------------------------------------

/*
function createElement(inp){
    return document.createElement('li').textContent = inp;
}
//---------------------------------
function appendChildren(parent, childArray){
    childArray.forEach(function (child){
        parent.appendChild(child);
    });
}
*/


//---------------------------
function  createForm(inpTitle, inpDescription){

    let createTaskCard = (task) => {

        let card = document.createElement('div');
        card.className = 'card w-100  border border-5 rounded-3';

        let cardBody = document.createElement('div');
        cardBody.className = "card-body";

        let title = document.createElement('h5');
        title.innerText = inpTitle;
        title.className = 'card-title';

        let Description = document.createElement('p');
        Description.innerHTML = inpDescription;
        Description.className = "card-text";

        cardBody.appendChild(title);
        cardBody.appendChild(Description);
        card.appendChild(cardBody);

        formList.appendChild(card);

    }

    let initListOfTasks = () => {
        if (formList) {
            document.getElementById('demo').replaceWith(formList);
            return;
        }

        formList = document.getElementById('demo');
        tasks.forEach((task) => {
            createTaskCard(task);
        });
    };

    initListOfTasks();
}

//-----------------------

var tasks = [{
    "title": "home",
    "color": "blue",
},
    {
        "title": "city",
        "color": "green",
    }
];





/*
    $(document).ready(function(){
        $('[data-toggle="popover"]').popover();
    });
*/







/*  var v = document.createElement("FORM");
  let outForm = document.getElementById('formOutput');
  v.setAttribute("id", "myForm");
  outForm.appendChild(v);
  outForm.setAttribute("class", "card w-100  border border-5 rounded-3 d-block");

 // var y = document.createElement("card-title");
 let y = document.getElementById("title");

  y.setAttribute("class","card-title");
 // y.setAttribute("id","title");
  y.setAttribute("type", "text");
  y.setAttribute("value", inpTitle.value);*/

// document.getElementById("formOutput").appendChild(y);
/*  outForm.innerHTML = formList ;*/
//  document.getElementById("delete").appendChild(btn);
//outForm.appendChild(btn);

/* let myList = document.getElementById("listElem");
 let items = [createElement(inpTitle.value), createElement(inpDescription.value)];

 appendChildren(myList, items);*/









/*<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js"
        integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB"
        crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"
        integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13"
        crossorigin="anonymous"></script>*/



/*

    /!*  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
})*!/
*/
