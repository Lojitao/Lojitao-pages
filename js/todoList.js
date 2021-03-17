

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOperation = document.querySelector(".filter-todo");



document.addEventListener("DOMContentLoaded",getTodos)
todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click",deleteCheck);
filterOperation.addEventListener("change",filterTodo);

// function filterTodo(e){
//     console.log(e.target.value);
// }

function addTodo(event){

    event.preventDefault();
    //todoDiv
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //creat li
    const newTodo = document.createElement("li");
    newTodo.innerText =  todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //add localstage
    saveLocalTodos(todoInput.value);

    //check mark button
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class = "fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);



    //check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //appedn to list
    if(todoInput.value == ""){
        window.alert("no-contain");
    }else{
        todoList.appendChild(todoDiv);
    };
   

    todoInput.value = "";



}


function deleteCheck(e){
    const item = e.target;
    //DELETE TODO
    if(item.classList[0]==="trash-btn"){
        const todo = item.parentElement;
        removeLocalTodos(todo) 
        todo.addEventListener("transitionend",()=>{
            todo.remove();
        })
        todo.classList.add("fall")
        

    }

    //CHECK MARK
    if(item.classList[0]==="complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }

} 


function filterTodo(e){
    const todos = todoList.childNodes;
    //console.log(todos);
    //console.log(e.target.value)
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                // console.log(todo);
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                };
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
        };
    });
    
}



function saveLocalTodos(todo){
    let result = isLocalHaveValue();
    //console.log(result);
    // isLocalHaveValue();
    //把剛新增的input.value加到todos陣列
   
    result.push(todo);
    //最後一起通通設置在localStorage
    localStorage.setItem("result", JSON.stringify(result));

}

function getTodos(){
   let result = isLocalHaveValue();
    // isLocalHaveValue();
    // console.log(isLocalHaveValue());
    // isLocalHaveValue();
    // console.log(localstagev);
    result.forEach(function(todo){
        
        //todoDiv
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //creat li
        const newTodo = document.createElement("li");
        newTodo.innerText =  todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        

        //check mark button
        const completeButton = document.createElement("button");
        completeButton.innerHTML = '<i class = "fas fa-check"></i>';
        completeButton.classList.add("complete-btn");
        todoDiv.appendChild(completeButton);



        //check trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
       
    })
}


function removeLocalTodos(todo){
    // isLocalHaveValue();
    // let todos;
    let result = isLocalHaveValue()
    //判斷localStorage有無值
    // if(localStorage.getItem("todos") === null ){
    //     todos = [];
    // }else{
    //     todos = JSON.parse(localStorage.getItem("todos")) ;
    // };
    const todosIndex = todo.children[0].innerText;
    result.splice(result.indexOf(todosIndex),1);
    localStorage.setItem("result", JSON.stringify(result));
}


function isLocalHaveValue(){
    let result;
    //判斷localStorage有無值
    if(localStorage.getItem("result") === null ){
        result = [];
        //return todos;
    }else{
        result = JSON.parse(localStorage.getItem("result")) 
        //return todos;
    };
    return result;
}
    
