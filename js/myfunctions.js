window.addEventListener('DOMContentLoaded', () => {

    mainModul.getById("addBtn").addEventListener("click", mainModul.addButtonClicked); // submit when click
    mainModul.getById("sortBtn").addEventListener('click', buttonsModul.sort);//sort toDoList
    mainModul.getById('showHighPriority').addEventListener('click', buttonsModul.showHighPriority);// show high priority
    mainModul.getById('backBtn').addEventListener('click', buttonsModul.backButton);
    window.addEventListener("keydown", function (event) {
        if (event.code === 'Space') {  // submit when press on space
            event.preventDefault();
            mainModul.addButtonClicked();
        }
    }, true);
});
//-------------------------------------------------
//---------------------------------------------------
const mainModul = (() => {

    let toDoList = []
    let publicData = {}

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
    const createNode = function (node) {
        return document.createElement(node);
    }

    //---------------------------------------
    const appendNode = function (parent, child, nameClass, text) {
        child.className = nameClass;
        child.innerHTML = text;
        parent.appendChild(child);
    }

    //--------------------------------------------------------------------
    publicData.addButtonClicked = function () {
        let inpTitle = mainModul.getById("titleID");
        let inpDescription = mainModul.getById("descriptionID");
        let checkBox = mainModul.getById("checkbox");
        let incorrectInput = mainModul.getById('incorrectInput');
        incorrectInput.value = '';

        if (!validationModul.correctInput(inpTitle, inpDescription, incorrectInput))
            return;

        // if got here ==> correct inputs
        inpTitle.setAttribute('class', 'form-control');
        inpDescription.setAttribute('class', 'form-control');

        let btnDelete = createNode('button');
        btnDelete.className = 'btn btn-danger';
        btnDelete.innerHTML = "Delete";

        toDoList.push(new Form(inpTitle.value, inpDescription.value, checkBox.checked, btnDelete));

        toDoList.forEach(elem => { // checking buttons and delete each task that its delete button pressed
            elem.button.addEventListener('click', function () {
                mainModul.getById('myDiv').removeChild(mainModul.getById('myDiv').childNodes[toDoList.indexOf(elem)]);

                for (let title of mainModul.getById('divHighPriority').getElementsByTagName('h5')) {
                    if (title.innerHTML === elem.title) {
                        title.parentElement.parentElement.parentElement.remove();
                    }
                }
                toDoList.splice(toDoList.indexOf(elem), 1);
            });
        });

        mainModul.displayForm();

        incorrectInput.setAttribute("class", "d-none");
        inpTitle.value = inpDescription.value = '';
    }

    //------------------------------------------------------------
    publicData.displayForm = function () {
        mainModul.getById("myDiv").innerHTML = '';
        toDoList.forEach(element => {
            mainModul.getById("myDiv").appendChild(element.createDiv());
        });
    }
    //--------------------------------------
    publicData.getById = function (container) {
        return document.getElementById(container);
    }
    //-------------------------------------
    publicData.myList = function () {
        return toDoList;
    }

    return publicData;
})();
//---------------------------------
// modul validation
const validationModul = (() => {
    let publicData = {}

    publicData.correctInput = function (inpTitle, inpDescription, incorrectInput) {
        if (isEmpty(inpTitle) || !isLetterOrNumber(inpTitle)) {
            error('please enter a non empty title with letters and digits only\n', incorrectInput);
            inpTitle.value = '';
            mainModul.getById('titleID').setAttribute('class', 'form-control is-invalid');
            return false;
        }
        if (isAlreadyExistTitle(inpTitle.value)) {
            error('this task name is already exist. Choose another name for the task\n', incorrectInput);
            mainModul.getById('titleID').setAttribute('class', 'form-control is-invalid');
            inpTitle.value = '';
            return false;
        }
        if (isEmpty(inpDescription)) {
            error('please enter a non empty text description\n', incorrectInput);
            mainModul.getById('descriptionID').setAttribute('class', 'form-control is-invalid');
            inpDescription.value = '';
            return false;
        }
        return true; // correct input
    }
    //----------------------------------------------
    const isAlreadyExistTitle = function (title) {
        return mainModul.myList().some(function (el) {
            return el.title === title;
        });
    }
    //-----------------------------------------------
    const isLetterOrNumber = function (inp) {
        return inp.value.match(/^[0-9a-zA-Z\s]+$/);
    }
    //-------------------------------------
    const isEmpty = function (inp) {
        return (inp.value.trim().length === 0);
    }
    //----------------------------------------
    const error = function (str, incorrectInp) {
        incorrectInp.innerHTML = str;
        incorrectInp.setAttribute("class", "alert alert-danger");
    }

    return publicData;
})();
//--------------------------------
// buttons modul
const buttonsModul = (() => {
    let publicData = {}

    publicData.sort = function () {
        mainModul.myList().sort((a, b) => {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
        });

        mainModul.displayForm();
    }
//--------------------------
    publicData.showHighPriority = function () {
        mainModul.getById('mainDiv').setAttribute('class', 'd-none');
        mainModul.getById('divShowHigh').setAttribute('class', 'd-block');

        mainModul.getById("divHighPriority").innerHTML = ''
        mainModul.myList().forEach(elem => {
            if (elem.priority)
                mainModul.getById('divHighPriority').appendChild(elem.createDiv());
        });
    }
//----------------------------
    publicData.backButton = function () {
        mainModul.getById('mainDiv').setAttribute('class', 'd-block');
        mainModul.getById('divShowHigh').setAttribute('class', 'd-none');
        mainModul.displayForm();
    }

    return publicData;
})();