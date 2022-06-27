//Definig variables

const form = document.getElementById('form');
const errorForm = document.querySelector('.errorForm');
const text = document.getElementById('input');
const addBtn = document.getElementById('addBtn');
const results = document.querySelector('.results__items');

// Lotties here
//=====================
//Error lotties

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

    if (task.length <= 0) {
      welcome();
    } else {
      results.removeChild(results.firstChild);
      addNote();
    }
  });
}

// **Function add task

function addTask() {
  const taskDate = `${day}/${month}/${year}`;

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
    errorInput();
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

//**Error Input */

function errorInput() {
  while (errorForm.firstChild) {
    errorForm.removeChild(errorForm.firstChild);
  }
  errorForm.classList.remove('hidden');

  const errorMessage = bodymovin.loadAnimation({
    container: errorForm,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://assets6.lottiefiles.com/packages/lf20_0pgmwzt3.json',
  });

  const error = document.createElement('p');
  error.classList.add('text-red-400');
  error.innerText = 'Opps something went wrong 🔻😒';
  errorForm.appendChild(error);

  setTimeout(() => {
    errorForm.classList.add('hidden');
  }, 2800);
}

//** Welcome function */

function welcome() {
  const welcomeText = document.createElement('p');
  welcomeText.innerText = 'Hey 🖐️, welcome to your task book ';
  welcomeText.classList.add(
    'text',
    'p-9',
    'uppercase',
    'text-center',
    'welcome'
  );
  results.insertAdjacentElement('beforebegin', welcomeText);
}
