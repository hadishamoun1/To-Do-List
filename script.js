

let addTask = document.getElementById('addtask-btn')
let localStorageContent = localStorage.getItem('tasks')


addTask.addEventListener('click',createTask)

checkPendingDates()

setInterval(checkPendingDates,30000)



function createTask(){
    let name = document.getElementById('name').value
    let description = document.getElementById('text').value
    let date = document.getElementById('date').value

    

    let taskmanager = document.createElement('div')
    taskmanager.classList.add('task-manager')
    taskmanager.setAttribute('draggable','true')

    let nameElement = document.createElement('div')
    nameElement.classList.add('name')
    nameElement.textContent = 'Name: ' + name

    let descriptionElement = document.createElement('div')
    descriptionElement.classList.add('description')
    descriptionElement.textContent = 'Description: ' + description

    let dateAndtime = document.createElement('div')
    dateAndtime.classList.add('dateandtime')
    dateAndtime.textContent = 'Date and Time: ' + date

    let completeBtn = document.createElement('div')
    completeBtn.classList.add('btn-div')
    let button = document.createElement('button')
    button.classList.add('completed-btn')
    button.textContent= 'Completed'
    button.addEventListener('click',completedTask)
    completeBtn.appendChild(button)

    
    
    taskmanager.appendChild(nameElement)
    taskmanager.appendChild(descriptionElement)
    taskmanager.appendChild(dateAndtime)
    taskmanager.appendChild(completeBtn)
    

   

    pendingTask(taskmanager,date)
    saveTasks(name,description,date)
    dragTasks(taskmanager)
}


function completedTask(event){

    let taskmanager= event.target.closest('.task-manager')
    let completedTask = taskmanager.cloneNode(true)
    let completeBtn = completedTask.querySelector('.completed-btn')
    completeBtn.parentNode.removeChild(completeBtn)

    let completedBox = document.querySelector('.completed')
    completedBox.appendChild(completedTask)

    taskmanager.parentNode.removeChild(taskmanager)


}

function pendingTask(taskmanager,duedate){
    let dueDate = new Date(duedate);
    let now = new Date();

    if (dueDate < now) {
        
        let pastdueBox = document.querySelector(".pastdue")
        pastdueBox.appendChild(taskmanager)
        
    }else{
        let pendingBox = document.querySelector('.pending')
        pendingBox.appendChild(taskmanager)

    }

}

function checkPendingDates(){
    let pendingtasks = document.querySelectorAll('.pending .task-manager')

    for(let i =0;i<pendingtasks.length;i++){
        let task = pendingtasks[i]
        let taskDate = task.querySelector('.dateandtime')
        let dueDate = new Date(taskDate.textContent.replace('Date and Time: ', ''));
        pendingTask(task, dueDate)
    }


}
function saveTasks(name,description,date){
    
    

    let myobj = {
    name: name,
    description: description,
    date:date
    }
    let myobjarray 
    if (localStorageContent === null){
        myobjarray = []
    }
    else{
        myobjarray=JSON.parse(localStorageContent)
    }
    myobjarray.push(myobj)
    localStorage.setItem('tasks',JSON.stringify(myobjarray))

    }
    
    
  
    

   


function dragTasks(taskmanager){
    let completedBox = document.querySelector('.completed')

    taskmanager.addEventListener('dragstart',function(event){
        
        taskmanager.classList.add('dragging');
        console.log(event)
    })
    completedBox.addEventListener('dragover',function(event){
        event.preventDefault()
    }
)
    

    completedBox.addEventListener('drop', function(event) {
        event.preventDefault();
        let draggedTask = document.querySelector('.dragging');
        let completedBtn = draggedTask.querySelector('.completed-btn')
        if (draggedTask) {
            completedBtn.parentNode.removeChild(completedBtn)
            completedBox.appendChild(draggedTask);
            draggedTask.classList.remove('dragging');
        }
        
    });

    

}

