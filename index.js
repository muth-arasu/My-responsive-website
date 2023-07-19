/* const taskContainer =document.getElementsByClassName("task__container");
console.log(taskContainer); */
const taskContainer = document.querySelector(".task__container");
console.log(taskContainer);
let globalStore = [] ;
const generateNewCard =(taskData)=> `<div class="col-md-6 col-lg-4" >
<div class="card " id=${taskData.id} >
  <div class="card-header d-flex justify-content-end gap-2 " >
    <button type="button" class="btn btn-outline-success"id=${taskData.id} onclick="editCard.apply(this,arguments)">
      <i class="fa-solid fa-pen-to-square"id=${taskData.id} onclick="editCard.apply(this,arguments)"></i>
    </button>

    <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this,arguments)">
      <i class="fa-solid fa-trash" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"></i>
    </button>
  </div>

  <img src=${taskData.imageUrl} class="card-img-top-fluid" alt="this is cameraman"/>

  <div class="card-body">
    <h5 class="card-title">${taskData.taskTitle} </h5>
    <p class="card-text">${taskData.taskType}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
  <div class="card-footer text-body-secondary float-end">
    <button type="button"id=${taskData.id} class="btn btn-outline-primary float-end"></i>Opentask</button>
  </div>
</div>


</div>`;

const loadIntialCard =() =>{
  //localStorage to get tasky card data
  //console.log("loadInitialCard is working");
   const getCardData = localStorage.getItem("tasky");

  //convert from string to normal object
  const {cards} =JSON.parse(getCardData);


  //loop over those array of task object to create HTML card,inject it to DOM

  cards.map((cardObject) =>  {
    
    taskContainer.insertAdjacentHTML("beforeend",generateNewCard(cardObject));

     //update our globalStore
     globalStore.push(cardObject);

  })
 

};
const updatedLocalStorage=()=>{
  localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));
};
const saveChanges = () => {
    const taskData  = {
        id:`${Date.now()}`,//unique id for card 
        imageUrl : document.getElementById("imageurl").value,
        taskTitle: document.getElementById("taskTitle").value,
        taskType: document.getElementById("TaskType").value,
        taskDescription: document.getElementById("TaskDescribtion").value,
        //Parent object
        //browser ->window
        //DOM =>document (we can edit the html content)
    };
   // console.log(taskData.id);
    
    taskContainer.insertAdjacentHTML("BeforeEnd",generateNewCard(taskData));
    globalStore.push(taskData);
    updatedLocalStorage();
  
    

   /*const newCard =`<div class="col-md-6 col-lg-4" id=${taskData.id}>
<div class="card ">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success"><i class="fa-solid fa-pen-to-square"></i></button>
 
    <button type="button" class="btn btn-outline-danger"><i class="fa-solid fa-trash"></i></button>
                </div>

  <img src=${taskData.imageUrl} class="card-img-top" alt="this is cameraman"/>

  <div class="card-body">
    <h5 class="card-title">${taskData.taskTitle} </h5>
    <p class="card-text">${taskData.taskType}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
  <div class="card-footer text-body-secondary float-end">
    <button type="button" class="btn btn-primary float-end"><i class="fa-solid fa-plus"></i>Opentask</button>
  </div>
</div>


</div>`; */ 
    
};
// Issues
// page will cause the data to e deleted -> localstorge->5MB(solved)

//Features
//Delete the card
const deleteCard = (event)=>{
  event =window.event;
  const targetID =event.target.id;
// console.log(targetID);
 const tagName = event.target.tagName;
 //console.log(tagName);

//match the id of the element with the id of inside the globalStore*/
globalStore = globalStore.filter((cardObject)=> cardObject.id!==targetID);
 updatedLocalStorage();
if(tagName==="BUTTON"){
   return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
 }else{
   return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
 }
};


//Edit the card
const editCard=(event)=>{
  event = window.event;
  const targetID = event.target.id;
  const tagName = event.target.tagName;
  let parentElement;
  //console.log("edit is called");
  
  if(tagName==="BUTTON"){
    parentElement= event.target.parentNode.parentNode;
   }
   else{
    parentElement= event.target.parentNode.parentNode.parentNode;
  }
  
  let taskTitle=parentElement.childNodes[5].childNodes[1];
  let taskDescription=parentElement.childNodes[5].childNodes[3];
  let taskType=parentElement.childNodes[5].childNodes[5];
  let submitbutton =parentElement.childNodes[7].childNodes[1];

  
  taskTitle.setAttribute("contenteditable","true");
  taskDescription.setAttribute("contenteditable","true");
  taskType.setAttribute("contenteditable","true");
  submitbutton.setAttribute("onclick","saveEditChanges.apply(this,arguments)");
  submitbutton.innerHTML="Save Changes";

};


const saveEditChanges=(event)=>{
  event = window.event;
  const targetID = event.target.id;
  const tagName = event.target.tagName;
  let parentElement;
  //console.log("edit is called");
  
  if(tagName==="BUTTON"){
    parentElement= event.target.parentNode.parentNode;
   }
   else{
    parentElement= event.target.parentNode.parentNode.parentNode;
  }
  
  let taskTitle=parentElement.childNodes[5].childNodes[1];
  let taskDescription=parentElement.childNodes[5].childNodes[3];
  let taskType=parentElement.childNodes[5].childNodes[5];
  let submitbutton =parentElement.childNodes[7].childNodes[1];
  
  const updatedData ={
    taskTitle:taskTitle.innerHTML,
    taskType:taskType.innerHTML,
    taskDescription:taskDescription.innerHTML,

  };
  globalStore = globalStore.map((task)=>{
    if(task.id===targetID){
      return{
        id:task.id,//unique id for card 
        imageUrl : task.imageUrl,
        taskTitle: updatedData.taskTitle,
        taskType: updatedData.taskType,
        taskDescription: updatedData.taskDescription,
      }
    }
    return task;
    
  });
  updatedLocalStorage();
  
  taskTitle.setAttribute("contenteditable","false");
  taskDescription.setAttribute("contenteditable","false");
  taskType.setAttribute("contenteditable","false");
  submitbutton.setAttribute("onclick","saveEditChanges.apply(this,arguments)");
  submitbutton.removeAttribute("onclick");
  submitbutton.innerHTML="Open Task";


};
//open the card
