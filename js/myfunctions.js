window.addEventListener('DOMContentLoaded', () => {

    getById("addBtn").addEventListener("click", addButtonClicked); // submit when click
    getById("sortBtn").addEventListener('click', sort);//sort toDoList
    getById('showHighPriority').addEventListener('click', showHighPriority);// show high priority
    getById('backBtn').addEventListener('click', backButton);

    window.addEventListener("keydown", function (event) {
        if (event.code === 'Space') {  // submit when press on space
            event.preventDefault();
            addButtonClicked();
        }
    }, true);
});
//-------------------------------------------------
//---------------------------------------------------


let toDoList = []

class Form {
    constructor(title, description, priority, button) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.button = button;
    }

    createDiv() {
        let myDiv = createNode('div');
        this.priority ? myDiv.contentEditable = 'true' : myDiv.contentEditable = 'false';

        let card = createNode('div');
        this.priority ? appendNode(myDiv, card, 'card w-100  border border-5 rounded-3 alert alert-warning mb-2', '')
            : appendNode(myDiv, card, 'card w-100  border border-5 rounded-3 mb-2', '');

        let cardBody = createNode('div');
        appendNode(card, cardBody, "card-body", '');

        let titleCard = createNode('h5');
        appendNode(cardBody, titleCard, 'card-title', this.title);

        let descriptionCard = createNode('p');
        appendNode(cardBody, descriptionCard, 'card-text', this.description);

        appendNode(cardBody, this.button, 'btn btn-danger', "Delete");

        return myDiv;
    }
}

//-----------------------------
function createNode(node) {
    return document.createElement(node);
}

//---------------------------------------
function appendNode(parent, child, nameClass, text) {
    child.className = nameClass;
    child.innerHTML = text;
    parent.appendChild(child);
}

//--------------------------------------------------------------------
//  publicData.addButtonClicked = function () {
function addButtonClicked() {
    let inpTitle = getById("titleID");
    let inpDescription = getById("descriptionID");
    let checkBox = getById("checkbox");
    let incorrectInput = getById('incorrectInput');
    incorrectInput.value = '';

    if (!validationModul.correctInput(inpTitle, inpDescription, incorrectInput))
        return;

    // if got here ==> correct inputs
    let btnDelete = createNode('button');
    btnDelete.className = 'btn btn-danger';
    btnDelete.innerHTML = "Delete";

    toDoList.push(new Form(inpTitle.value, inpDescription.value, checkBox.checked, btnDelete));

    toDoList.forEach(elem => {
        elem.button.addEventListener('click', function () {
           // getById('demo').innerHTML = 'enter';

            let div = getById('myDiv');
            let divHighP = getById('divHighPriority');

            for (let title of div.getElementsByTagName('h5')) {
                if (title.innerHTML === elem.title) {
                    title.parentElement.parentElement.parentElement.remove();
                }
            }

            for (let title2 of divHighP.getElementsByTagName('h5')) {
                if (title2.innerHTML === elem.title) {
                    title2.parentElement.parentElement.parentElement.remove();
                }
            }

            toDoList.splice(toDoList.indexOf(elem), 1);
        });
    });

    displayForm();

    incorrectInput.setAttribute("class", "d-none");
    inpTitle.value = inpDescription.value = '';
}

//------------------------------------------------------------
function displayForm() {
    getById("myDiv").innerHTML = ''
    toDoList.forEach(element => {
        getById("myDiv").appendChild(element.createDiv());
    });
}//
//---------------------------------
// modul inside modul
const validationModul = (() => {

    let publicData = {}

    publicData.correctInput = function (inpTitle, inpDescription, incorrectInput) {
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
    function isLetterOrNumber(inp) {
        return inp.value.match(/^[0-9a-zA-Z\s]+$/);
    }

//-------------------------------------
    function isEmpty(inp) {
        return (inp.value.trim().length === 0);
    }

//----------------------------------------
    function error(str, incorrectInp) {
        incorrectInp.innerHTML = str;
        incorrectInp.setAttribute("class", "alert alert-danger");
    }

    return publicData;
})();
//------------------------------
/*
publicData.myList = function () {
    return toDoList;
}
*/

//---------------------------

function getById(container) {
    return document.getElementById(container);
}

//-------------------------
//--------------------------------
function sort() {
    // function sort() {
    toDoList.sort((a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
    });

    displayForm();
}

//--------------------------
function showHighPriority() {
    getById('mainDiv').setAttribute('class', 'd-none');
    getById('divShowHigh').setAttribute('class', 'd-block');

    getById("divHighPriority").innerHTML = ''
    toDoList.forEach(elem => {
        if (elem.priority) {
            getById('divHighPriority').appendChild(elem.createDiv());
        }
    });
}

//----------------------------
function backButton() {
    getById('mainDiv').setAttribute('class', 'd-block');
    getById('divShowHigh').setAttribute('class', 'd-none');

    displayForm();
}

