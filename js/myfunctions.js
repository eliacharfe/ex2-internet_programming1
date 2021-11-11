if (typeof document !== "undefined") {
    document.addEventListener('DOMContentLoaded', () => { // listen and wait for DOM

        mainModul.getById("addBtn").addEventListener("click", mainModul.addButtonClicked); // submit when click
        mainModul.getById("sortBtn").addEventListener('click', buttonsModul.sort);//sort toDoList
        mainModul.getById('showHighPriority').addEventListener('click', buttonsModul.showHighPriority);// show high priority
        mainModul.getById('backBtn').addEventListener('click', buttonsModul.backButton);
        document.addEventListener("keydown", function (event) {
            if (event.code === 'Space') {  // submit when press on space
                event.preventDefault();
                mainModul.addButtonClicked();
            }
            /*if(event.code === 'Enter')
                event.preventDefault();*/
        }, true);
    });
}
//-------------------------------------------------
//---------------------------------------------------
const mainModul = (() => {

    let toDoList = []
    let publicData = {}

    class Task {
        constructor(title, description, priority) {
            this.title = title;
            this.description = description;
            this.priority = priority;
        }

        createDiv() {
            // create new card div with title, description and button, then return the div
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

            let btnDelete = createNode('button');
            appendNode(cardBody, btnDelete, 'btn btn-danger', "Delete");

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
        //when the add button is clicked (or clicked Space)
        let inpTitle = mainModul.getById("titleID");
        let inpDescription = mainModul.getById("descriptionID");
        let checkBox = mainModul.getById("checkbox");
        let incorrectInput = mainModul.getById('incorrectInput');
        incorrectInput.value = '';

        if (!validationModul.correctInput(inpTitle, inpDescription, incorrectInput))
            return;

        // if got here ==> correct inputs
        inpTitle.setAttribute('class', 'form-control'); // in case was invalid because had bad input before
        inpDescription.setAttribute('class', 'form-control');

        toDoList.push(new Task(inpTitle.value, inpDescription.value, checkBox.checked));
        mainModul.displayList();

        incorrectInput.setAttribute("class", "d-none");
        inpTitle.value = inpDescription.value = '';
    }

    //------------------------------------------------------------
    publicData.displayList = function () { // display list of tasks to the DOM
        mainModul.getById("myDiv").innerHTML = '';// clear div
        toDoList.forEach(task => {
            mainModul.getById("myDiv").appendChild(task.createDiv()); // inset tasks to div dom
        });

        buttonsModul.buttonsDeleteHandle("myDiv"); // buttons handle
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
        // check inputs and return true if all is correct inputs, else will show user what problem he have and return false
        if (isEmpty(inpTitle) || !isLetterOrNumber(inpTitle)) {
            error('please enter a non empty title with letters and digits only\n', incorrectInput);
            inpTitle.value = '';
            inpTitle.setAttribute('class', 'form-control is-invalid');
            return false;
        }
        if (isAlreadyExistTitle(inpTitle.value)) {
            error('this task name is already exist. Choose another name for the task\n', incorrectInput);
            inpTitle.setAttribute('class', 'form-control is-invalid');
            inpTitle.value = '';
            return false;
        }
        if (isEmpty(inpDescription)) {
            error('please enter a non empty text description\n', incorrectInput);
            inpDescription.setAttribute('class', 'form-control is-invalid');
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

    publicData.sort = function () { // sort the array of tasks by title
        mainModul.myList().sort((a, b) => {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
        });

        mainModul.displayList();
    }
    //--------------------------
    publicData.showHighPriority = function () {
        // show high priority list
        mainModul.getById('mainDiv').style.display = "none";
        mainModul.getById('divShowHigh').style.display = "block";

        mainModul.getById("divHighPriority").innerHTML = ''; // clear div
        mainModul.myList().forEach(task => {
            if (task.priority)
                mainModul.getById('divHighPriority').appendChild(task.createDiv());
        });

        buttonsModul.buttonsDeleteHandle("divHighPriority"); // buttons handle
    }
    //----------------------------
    publicData.backButton = function () {
        // when pressed on the back button
        mainModul.getById('mainDiv').style.display = "block";
        mainModul.getById('divShowHigh').style.display = "none";
        mainModul.displayList();
    }
    //-------------------------------------------------------------
    publicData.buttonsDeleteHandle = function (currDivOutput) {
        // generic function that check if buttons pressed on div of the display window (regular / high priority mode
        // and delete the task if pressed on its delete button
        let buttons = mainModul.getById(currDivOutput).querySelectorAll('button');

        buttons.forEach(btn => {
            btn.addEventListener('click', function () {
                let title = btn.parentElement.getElementsByTagName('h5')[0].innerHTML;
                btn.parentElement.parentElement.parentElement.remove();
                mainModul.myList().forEach(task => {
                    if (task.title === title)
                        mainModul.myList().splice(mainModul.myList().indexOf(task), 1);
                });
            })
        })
    }

    return publicData;
})();