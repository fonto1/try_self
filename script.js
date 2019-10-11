let data = {
    icebox: ["hoppa", "gråta"],
    todo: ["leka"],
    doing: ["äta"],
    test: ["jobba", "läsa"],
    done: ["musik", "måla"]
}

let boards = document.querySelectorAll(".boards");
let key = 0;
let icebox = document.getElementById("icebox");
let todo = document.getElementById("todo");
let doing = document.getElementById("doing");
let test = document.getElementById("test");
let done = document.getElementById("done");
let index = "index";




let button = document.getElementById("button");
let input = document.getElementById("input");

button.addEventListener('click', create)
/*
document.querySelectorAll(".drag").forEach(function (drag) {
    drag.addEventListener('dragstart', dragStart)
    drag.addEventListener('dragend', dragEnd)
})
*/

boards.forEach(function (emp) {
    emp.addEventListener('dragstart', dragStart)
    emp.addEventListener("dragover", dragOver)
    emp.addEventListener("drop", dragDrop)
    emp.addEventListener("click",del)
});

function del(){
    let element = event.target;
    let todoObject = element.parentElement.innerText
    let parent = element.parentElement.parentElement.id
    if (element.className == "fas fa-trash-alt"){
        let objId = data[parent].indexOf(todoObject);
        data[parent].splice(objId,1);
        display();
    }


}

function dragStart(evt) {
    evt.dataTransfer.setData("text", evt.target.id);
    console.log("dragging...")
}

function dragEnd() {
    console.log("ending....")
}

function display() {
    boards.forEach(function (bor) {
        bor.innerHTML = bor.id;
    });

    ["icebox", "todo", "doing", "test", "done"].forEach(function (info) {
        document.getElementById(info).innerHTML += data[info].map(function (item) {
            key++
            return `<li id="${key}" class="drag" draggable='true'>${item}<i class="fas fa-trash-alt"></i></li>`
        }).join(" ");

    })
    key = 0;
}

display();



function create() {
    data.icebox.push(input.value);
    input.value ="";
    display();
}


function dragOver(e) {
    e.preventDefault();
    console.log("over")
}

function dragDrop(evt) {

    if (evt.target.className == 'boards') {
        evt.preventDefault();
        let db = evt.dataTransfer.getData("text");
        console.log("dropped")
        evt.target.appendChild(document.getElementById(db));

    }

}

/*
function save(){
    localStorage.setItem(index,JSON.stringify(data))
}

function get(){
    let data = JSON.parse(localStorage.getItem(index))
}
*/