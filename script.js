//Initialization of array and var decleration 
var todoList = [];
var remList = [];
var comdoList = [];
var addButton = document.getElementById("add-Btn")
var todoInput = document.getElementById("todo_input")
var deleteAllButton = document.getElementById("DelAll")
var allTodos = document.getElementById("all-todos");
var deleteSButton = document.getElementById("DelBtn")


// Button event listners for add and delete
addButton.addEventListener("click", add)
deleteAllButton.addEventListener("click", deleteAll)
deleteSButton.addEventListener("click", deleteS)


// Common event listeners for filtersk
document.addEventListener('click', (e) => {
    if (e.target.className.split(' ')[0] == 'complete' || e.target.className.split(' ')[0] == 'ci') {
        completeTodo(e);
    }
    if (e.target.className.split(' ')[0] == 'delete' || e.target.className.split(' ')[0] == 'di') {
        deleteTodo(e)
    }
   

    if (e.target.id == "all") {
        viewAll();
    }
    if (e.target.id == "rem") {
        viewRemaining();
    }
    if (e.target.id == "com") {
        viewCompleted();
    }

})
//event listner for enter key
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        add();
    }
});


//updates all the remaining, completed and main list
function update() {
    comdoList = todoList.filter((ele) => {
        return ele.complete

    })
    remList = todoList.filter((ele) => {
        return !ele.complete
    })
    document.getElementById("total-count").innerText = todoList.length.toString();
    document.getElementById("c-count").innerText = comdoList.length.toString();
    document.getElementById("p-count").innerText = remList.length.toString();

}

//adds the task in main list

function add() {
    var value = todoInput.value.trim();
    if (value === '') {                     // To check if Input is empty
        alert("Task cannot be empty") 
        return;
    }
    if (todoList.some(task => task.task.toLowerCase() === value.toLowerCase())) {   //To check the Duplicate 
        alert("Task already exists");
        return;
    }
   
    todoList.push({
        task: value,
        id: Date.now().toString(),
        complete: false,
    });


    todoInput.value = "";


    update();
    addinmain(todoList);
}


//Renders the main list and views on the main content

function addinmain(todoList) {
    allTodos.innerHTML = ""
    todoList.forEach(element => {
        var x = `<li id=${element.id} class="todo-item">
        <p id="task"> ${element.complete ? `<strike>${element.task}</strike>` : element.task} </p>
        <div class="todo-actions">
                <button class="complete btn btn-success">
                    <i class="ci fa-solid fa-square-check "></i>
                </button>
                <button class="delete btn btn-error" >
                    <i class="di fa-solid fa-trash"></i>
                </button>
            </div>
        </li>`
        allTodos.innerHTML += x
    });
}



//delete task and update all the list
function deleteTodo(e) {
    var deleted = e.target.parentElement.parentElement.getAttribute('id');
    todoList = todoList.filter((ele) => {
        return ele.id != deleted
    })

    update();
    addinmain(todoList);

}



//completes individula task and updates all the list
function completeTodo(e) {
    var completed = e.target.parentElement.parentElement.getAttribute('id');
    todoList.forEach((obj) => {
        if (obj.id == completed) {
            if (obj.complete == false) {
                obj.complete = true
                console.log(e.target.parentElement.parentElement)
                

                e.target.parentElement.parentElement.querySelector("#task").classList.add("line");
               
                
                
            } else {
                obj.complete = false

                e.target.parentElement.parentElement.querySelector("#task").classList.remove("line");
               
            }
            
        }
    })

    update();
    addinmain(todoList);
}


//deletes all the tasks
function deleteAll(todo) {

    todoList = []

    update();
    addinmain(todoList);

}

//deletes only completed task
function deleteS(todo) {

    todoList = todoList.filter((ele) => {
        return !ele.complete;
    })


    update();
    addinmain(todoList);

};



// functions for filters
function viewCompleted() {
    addinmain(comdoList);
}

function viewRemaining() {
    if(remList.length ===0){
        alert('No Task is Pending');
    }
    addinmain(remList);
    
}
function viewAll() {
    addinmain(todoList);
}
