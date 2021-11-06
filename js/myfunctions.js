

class Form
{
    constructor(myDiv) {
        this.myDiv = myDiv;
        toDoList.push(this.myDiv);
    }

}
//--------------------------------------
//-----------------------------------------

toDoList = []

//-------------------------------------------------------
function addButtonClicked() {
    let inpTitle = getById("titleID");
    let inpDescription =  getById("descriptionID");
    let checkBox = getById("checkbox");
    let incorrectInput =  getById('incorrectInput');
    incorrectInput.value = '';

    if (!correctInput(inpTitle, inpDescription, incorrectInput))
        return;

    // if got here ==> correct inputs
     new Form(createCard(inpTitle.value, inpDescription.value, checkBox));
     displayForm();

   /*  for (let elem of toDoList) {
         let x =  elem.children[0].children[0].children[0].children[0];
        // let y = x.id;

         for(let i = 0; i < x.length; i++) {
             if (x[i].className == 'card-title') {
                 document.getElementById('demo').innerHTML = x;
             }
        }
        // document.getElementById('demo').innerHTML = x;
     }*/
    // document.getElementById('demo').innerHTML = toDoList[0].valueOf();

    incorrectInput.setAttribute("class", "d-none");
    inpTitle.value = inpDescription.value = '';
}
//--------------------------
function correctInput(inpTitle, inpDescription, incorrectInput){
    if (isEmpty(inpTitle) || !isLetterOrNumber(inpTitle)) {
        error('please enter a non empty title with letters and digits only\n', incorrectInput);
        inpTitle.value = '';
        return false;
    }
    if (isEmpty(inpDescription)) {
        error('please enter a non empty text description\n', incorrectInput);
        inpDescription.value = '';
        return false;
    }
    return true;
}
//-----------------------------------------------
function isLetterOrNumber(inp){
    return inp.value.match(/^[0-9a-zA-Z\s]+$/);
}
//-------------------------------------
function isEmpty(inp){
    return (inp.value.trim().length === 0);
}
//----------------------------------------
function error(str, incorrectInp){
    incorrectInp.innerHTML = str + "<br />";
    incorrectInp.setAttribute("class", "alert alert-danger");
}
//------------------------------------
function displayForm(){
    toDoList.forEach(element => {
        getById("myDiv").appendChild(element);
    });
}
//---------------------------
function createCard(inpTitle, inpDescription, checkBox){

    let myDiv = createNode('div')

    let card = createNode('div');
    (checkBox.checked) ?  appendNode(myDiv, card, 'card w-100  border border-5 rounded-3 alert alert-danger')
                       :  appendNode(myDiv, card, 'card w-100  border border-5 rounded-3');

    let cardBody = createNode('div');
    appendNode(card, cardBody, "card-body");

    let titleCard = createNode('h5');
    titleCard.innerText = inpTitle;
    titleCard.id = 't';
    appendNode(cardBody, titleCard, 'card-title')

    let descriptionCard = createNode('p');
    descriptionCard.innerHTML = inpDescription;
    appendNode(cardBody, descriptionCard, 'card-text')

    let btnDelete = createNode('button');
    btnDelete.innerHTML = "Delete";
    appendNode(cardBody, btnDelete, "btn btn-danger")

/*    var c = document.getElementById('myDiv').childNodes;
    var txt = "";
    var i;
    for (i = 0; i < c.length; i++) {
        txt = txt + c[i].nodeName + "<br>";
    }


    document.getElementById('demo').innerHTML = txt;*/

    return  myDiv;
}
//---------------------------------
function appendNode(parent, child, nameClass) {
    child.className = nameClass;
    parent.appendChild(child);
}
//-----------------------------------
function getById(container) {
    return document.getElementById(container);
}
//------------------------------------
function createNode(node) {
    return document.createElement(node);
}
//--------------------------------
/*function deleteBtnClicked(){
}*/
//-------------------------------
function compare( a, b ) {
    if ( a.title.value < b.title.value ){
        return -1;
    }
    if ( a.title.value > b.title.value ){
        return 1;
    }
    return 0;
}
//-----------
function sort() {
    // toDoList.forEach(element.title => );

    toDoList.sort(compare);

    displayForm();
}
//--------------------------
/*
function press(event) {
    if (event.keyCode == 13 && !event.shiftKey) {
        getById("myDiv").innerHTML += "<br>";
    }
}

*/











/*
    $(document).ready(function(){
        $('[data-toggle="popover"]').popover();
    });
*/



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
