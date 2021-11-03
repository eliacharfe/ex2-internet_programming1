
/*document.getElementById("myBtn").onclick = function() {addButton()};*/

function addButton() {
    let input = document.getElementById("titleID");
    alert(input.value)

    let y = input.elements["name"].value;
    document.getElementById("demo").innerHTML += input.value;/*"Hi" + y + "<br>"*/
}

/*
    $(document).ready(function(){
        $('[data-toggle="popover"]').popover();
    });
*/



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
