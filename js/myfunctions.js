

class Form
{
    constructor(myDiv) {
        this.myDiv = myDiv;
        return this.myDiv;
    }
}
//---------------------------------------------------
toDoList = []

//-------------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {

    getById("addBtn").addEventListener("click", addButtonClicked);
    getById("sortBtn").addEventListener('click',sort);
    getById('showHighPriority').addEventListener('click', showHighPriority);
    getById('backBtn').addEventListener('click', backButton);

    window.addEventListener("keydown", function(event) {
        if (event.code === 'Space') {
            event.preventDefault();
            addButtonClicked();
        }
    }, true);
});
//-------------------------------
function addButtonClicked() {
    let inpTitle = getById("titleID");
    let inpDescription = getById("descriptionID");
    let checkBox = getById("checkbox");
    let incorrectInput = getById('incorrectInput');
    incorrectInput.value = '';

    if (!correctInput(inpTitle, inpDescription, incorrectInput))
        return;

    // if got here ==> correct inputs
     toDoList.push(new Form(createCard(inpTitle.value, inpDescription.value, checkBox)))

     toDoList.forEach( elem => {
         elem.getElementsByClassName('btn btn-danger')[0].addEventListener('click', function (){
             getById('myDiv').removeChild(getById('myDiv').childNodes[toDoList.indexOf(elem)]);
             toDoList.splice(toDoList.indexOf(elem),  1);
         });
     });

    displayForm();

    incorrectInput.setAttribute("class", "d-none");
    inpTitle.value = inpDescription.value = '';
}
//------------------------------------------------------------
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
    incorrectInp.innerHTML = str;
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

    let myDiv = createNode('div');
    checkBox.checked ? myDiv.contentEditable = 'true' : myDiv.contentEditable = 'false';

    let card = createNode('div');
    checkBox.checked ? appendNode(myDiv, card, 'card w-100  border border-5 rounded-3 alert alert-warning mb-2', '')
                     : appendNode(myDiv, card, 'card w-100  border border-5 rounded-3 mb-2', '');

    let cardBody = createNode('div');
    appendNode(card, cardBody, "card-body", '');

    let titleCard = createNode('h5');
    appendNode(cardBody, titleCard, 'card-title', inpTitle);

    let descriptionCard = createNode('p');
    appendNode(cardBody, descriptionCard, 'card-text', inpDescription);

    let btnDelete = createNode('button');
    appendNode(cardBody, btnDelete, "btn btn-danger", "Delete");

    return myDiv;
}
//------------------------------------
function createNode(node) {
    return document.createElement(node);
}
//---------------------------------
function appendNode(parent, child, nameClass, text) {
    child.className = nameClass;
    child.innerHTML = text;
    parent.appendChild(child);
}
//-----------------------------------
function getById(container) {
    return document.getElementById(container);
}
//--------------------------------
function sort() {
   toDoList.sort((a, b) => {
       if ( a.getElementsByTagName('h5')[0].innerHTML < b.getElementsByTagName('h5')[0].innerHTML )  return -1;
       if ( a.getElementsByTagName('h5')[0].innerHTML > b.getElementsByTagName('h5')[0].innerHTML )  return 1;
       return 0;
    });

   displayForm();
}
//--------------------------
function showHighPriority() {
    getById('mainDiv').setAttribute('class', 'd-none');
    getById('divShowHigh').setAttribute('class', 'd-block');

    toDoList.forEach( elem => {
        if (elem.getAttribute('contentEditable') === 'true'){
            getById('divHighPriority').appendChild(elem);
        }
    });
}
//----------------------------
function backButton() {
    getById('mainDiv').setAttribute('class', 'd-block');
    getById('divShowHigh').setAttribute('class', 'd-none');

    displayForm();
}
