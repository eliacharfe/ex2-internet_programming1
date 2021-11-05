

class Form
{
    constructor(myDiv) {
        this.myDiv = myDiv;
        document.getElementById("myDiv").appendChild(this.myDiv);

      //  toDoList.append(this.myDiv);
     //   toDoList.appendChild(this.myDiv);
        //toDoList.push(this.myDiv);

       toDoList.push( document.getElementById("myDiv").appendChild(this.myDiv));
    }

}

//--------------------------------------
//--------------------------------------
function addToList(form)
{
   toDoList.push(form);
  //  toDoList.appendChild(form);
}
//-----------------------------------------

toDoList = []


//-------------------------------------------------------
/*document.getElementById("myBtn").onclick = function() {addButton()};*/
function addButtonClicked() {
    let inpTitle = document.getElementById("titleID");
    let inpDescription =  document.getElementById("descriptionID");
    let checkBox = document.getElementById("checkbox");
    let incorrectInput =  document.getElementById('incorrectInput');
    incorrectInput.value = '';

    if (isEmpty(inpTitle) || !check(inpTitle)) {
        error('please enter a non empty title with letters and digits only\n', incorrectInput);
        inpTitle.value = '';
        return; }
    if (isEmpty(inpDescription)) {
        error('please enter a non empty text description\n', incorrectInput);
        inpDescription.value = '';
        return; }

    addToList(createCard(inpTitle.value, inpDescription.value, checkBox));

   // document.getElementById("myDiv").innerHTML = toDoList;
    //document.getElementsByClassName("container-fluid").innerHTML = toDoList;

    incorrectInput.setAttribute("class", "d-none");
    inpTitle.value = inpDescription.value = '';
}
//-----------------------------------------------
function check(inp){
    return inp.value.match(/^[0-9a-zA-Z\s]+$/)
 //   return inp.value.match(/[a-z]/i) || !isNaN(inp.value);
}
//-------------------------------------
function isEmpty(inp){
    return (inp.value.length == 0)
}
//----------------------------------------
function error(str, incorrectInp){
    incorrectInp.innerHTML = str + "<br />";
    incorrectInp.setAttribute("class", "alert alert-danger");
}
//------------------------------------
//---------------------------
function createCard(inpTitle, inpDescription, checkBox){

    let myDiv = document.createElement('div');

    let card = document.createElement('div');
    (checkBox.checked) ? card.setAttribute("class", "card w-100  border border-5 rounded-3 alert alert-danger")
        :  card.className = "card w-100  border border-5 rounded-3";
    myDiv.appendChild(card);

    let cardBody = document.createElement('div');
    cardBody.className = "card-body";
    card.appendChild(cardBody);

    let title = document.createElement('h5');
    title.innerText = inpTitle;
    title.className = 'card-title';
    cardBody.appendChild(title);

    let description = document.createElement('p');
    description.innerHTML = inpDescription;
    description.className = "card-text";
    cardBody.appendChild(description );

    let btnDelete = document.createElement('button');
    btnDelete.innerHTML = "Delete";
    btnDelete.setAttribute("class","btn btn-danger");
    cardBody.appendChild(btnDelete);

    //document.getElementById("myDiv").appendChild(myDiv);
    return  new Form(myDiv);
}
//--------------------------------
function deleteBtnClicked(){

}
//-------------------------------
function sort(){
   // toDoList.forEach(element.title => );

    let x = document.getElementById("myDiv");

  /*  toDoList.sort(function (a, b) {
        return a.localeCompare(b);
    });*/

/*    let result = [];
    for (let i = 0; i < toDoList.length; i++) {
        if (toDoList[i].title === false) {
            result.push(toDoList[i]);
        }
    }
    for (let i = 0; i < toDoList.length; i++) {
        if (!toDoList[i].title === false) {
            result.push(toDoList[i]);
        }
    }

    x.innerHTML = result;*/

  //  toDoList.sort((firstItem.title.value, secondItem.title.value) => firstItem.title.value - secondItem.grade.title.value);
}

//--------------------------
function press(event) {
    if (event.keyCode == 13 && !event.shiftKey) {

        document.getElementById("myDiv").innerHTML += "<br>";
    }
}












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
