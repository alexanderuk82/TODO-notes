//Definig variables

const form = document.getElementById('form');
const text = document.getElementById('input');
const addBtn = document.getElementById('addBtn');
const results = document.querySelector('.results__items');

let task = [];

// Dates

const fullDate = new Date();
const day = fullDate.getDate();
const month = fullDate.getMonth();
const year = fullDate.getFullYear();

startApp();

//**Main function */

function startApp() {
  form.addEventListener('submit', addTask);

  //Read from local storage
  document.addEventListener('DOMContentLoaded', () => {
    task = JSON.parse(localStorage.getItem('notes')) || [];
    addNote();
  });
}

// **Function add task

function addTask() {
  const taskDate = `${day}/${month}/${year}`;
  console.log(taskDate);
  if (text.value !== '') {
    const taskObject = {
      id: Date.now(),
      text: text.value,
      date: taskDate,
    };

    task = [...task, taskObject];

    storage(task);
    addNote();

    form.reset();
  } else {
    console.log('error');
  }
}

// **Function add note inside od the container

function addNote() {
  clearHtml();
  task.forEach((task) => {
    const note = document.createElement('div');
    note.classList.add(
      'note',
      'grid',
      'gap-4',
      'h-[315px]',
      'w-[342px]',
      'bg-black-50',
      'borderBox',
      'rounded',
      'p-5'
    );

    note.innerHTML = `
        
     <div class="date">
        <img src="/img/calendar.svg" alt="" />
        <p>${task.date}</p>
          </div>
         <div class="content">
              <p>
              ${task.text}
             </p>
          </div>
    
      <div class="bottom">
         <div class="tag" id="tag">
          <p>TO DO</p>
         </div>
    
         <button class="remove" id="remove">
          <img src="/img/trash.svg" alt="" />
         </button>
       </div>  
      
        `;

    results.appendChild(note);

    const btnRemove = note.children[2].children[1];

    btnRemove.addEventListener('click', () => {
      deleting(task.id);
    });
  });
}

//**Deleting */

function deleting(itemId) {
  task = task.filter((tasks) => tasks.id !== itemId);
  addNote();
  storage();
}

//** Storage */

function storage() {
  localStorage.setItem('notes', JSON.stringify(task));
}

//** Clear Html*/

function clearHtml() {
  while (results.firstChild) {
    results.removeChild(results.firstChild);
  }
}
