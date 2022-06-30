const tasks = document.querySelector('#tasks');
const btnAdd = document.querySelector('#btn-add');
const btnClean = document.querySelector('#btn-clean');
const ulList = document.querySelector('#ul-list');

window.onload = [
  getSalvedTasks()
]

document.addEventListener('keydown', (event) => {
  const tecla = event.keyCode;
  if (tecla === 13) {
    validateTasks();
  }
});

btnAdd.addEventListener('click', validateTasks);

function validateTasks() {
  const tasksValue = tasks.value;
  if (tasksValue != "") {
    createtasks(tasksValue);
  }
  tasks.value = "";
}

btnClean.addEventListener('click', () => {
  const lis = document.querySelectorAll('span');
  for (let i = 0; i < lis.length; i++) {
    lis[i].remove();
  }
  salvedTasks();
})

function createtasks(tasksValue) {
  const liTasks = createLi(tasksValue);
  const btnLiClean = createBtnLiClean();
  const btnLiFinish = createBtnLiFinish();
  const span = document.createElement('span');
  span.appendChild(btnLiFinish);
  span.appendChild(liTasks);
  span.appendChild(btnLiClean);
  ulList.appendChild(span);
  salvedTasks();
}

function createLi(tasksValue) {
  const liTasks = document.createElement('li');
  liTasks.innerHTML = tasksValue;
  liTasks.classList = 'li-tasks';
  markLi(liTasks);
  return liTasks;
}

function createBtnLiFinish() {
  const btnLiFinish = document.createElement('button');
  btnLiFinish.addEventListener('click', taskFinish);
  btnLiFinish.innerHTML = ' ✔️ ';
  btnLiFinish.classList = 'btn-li-finish';
  return btnLiFinish;
}

function taskFinish() {
  this.nextSibling.classList = 'li-tasks finish';
  salvedTasks();
}

function createBtnLiClean() {
  const btnLiClean = document.createElement('button');
  btnLiClean.addEventListener("click", removeTasksLi);
  btnLiClean.innerHTML = ' 🗑️ ';
  btnLiClean.classList = 'btn-li-clean';
  return btnLiClean;
}

function removeTasksLi() {
  this.parentNode.remove();
  salvedTasks();
}

function salvedTasks() {
  const liTasks = ulList.innerHTML
  localStorage.setItem('liTasks', liTasks);
}

function getSalvedTasks() {
  const liTasks = localStorage.getItem('liTasks');
  ulList.innerHTML = liTasks;
  insertAddEventBtnLiClean();
  insertAddeventBtnLiFinish();
  insertAddeventLiMark();
}

function insertAddEventBtnLiClean() {
  const btnsLi = document.querySelectorAll('.btn-li-clean');
  for (let index = 0; index < btnsLi.length; index++) {
    btnsLi[index].addEventListener('click', removeTasksLi);
  }
}

function markLi(liTasks) {
  liTasks.addEventListener('click', (event) => {
    const color = document.querySelector('.mark');
    if (color === null) {
      event.target.classList = 'mark';
    } else {
      color.classList = 'li-tasks';
    }
  });
}


document.addEventListener('keydown', (event) => {
  const key = event.keyCode;
  const mark = document.querySelector('.mark').parentNode;
  if (mark) {
    if (key === 38 && mark.previousElementSibling) {
      mark.parentNode.insertBefore(mark, mark.previousElementSibling);
    } else if (key === 40 && mark.nextElementSibling) {
      mark.parentNode.insertBefore(mark.nextElementSibling, mark);
    }
  }
  salvedTasks();
});

function insertAddeventBtnLiFinish() {
  const btnLiFinish = document.querySelectorAll('.btn-li-finish');
  for(let i = 0; i < btnLiFinish.length; i++) {
    btnLiFinish[i].addEventListener('click', taskFinish);
  }
}

function insertAddeventLiMark() {
  const liTasc = document.querySelectorAll('li');
  for(let i = 0; i < liTasc.length; i++) {
    liTasc[i].addEventListener('click', (event) => {
    const color = document.querySelector('.mark');
    if (color == null) {
      event.target.classList = 'mark';
      salvedTasks();
    } else {
      color.classList = 'li-tasks';
      salvedTasks();
    }
    });
  }
}
