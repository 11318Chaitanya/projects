const liContainer = document.getElementById('li-container');
const inputField = document.getElementById('input-field');
const addButton = document.getElementById('add-button');

addButton.addEventListener('click', ()=>{
    if(inputField.value === ''){
        alert('Please write task before');
    }
    else addNewTask();
})

function addNewTask(){
    
    let li = document.createElement('li');
    li.innerHTML = inputField.value;
    liContainer.appendChild(li);

    let span = document.createElement('span');
    span.innerHTML = '\u00d7';
    li.appendChild(span);

    inputField.value = '';
    saveData();
}

liContainer.addEventListener('click',(e)=>{
    if(e.target.tagName === "LI"){
        e.target.classList.toggle('checked');
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem('data', liContainer.innerHTML);
}

window.addEventListener('load',()=>{
    liContainer.innerHTML = localStorage.getItem('data');
})