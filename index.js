// 1 -  TAGS
const form = document.querySelector('#todo-form')
const taskTitleInput = document.querySelector("#task-title-input")
const todoListUl = document.querySelector('#todo-list')

//ARRAY DE TASKS
let tasks = []

// 2 - EVENTOS
//2.1 - ARMAZENAR INPUT DIGITADO NA <ul>
form.addEventListener('submit', (event) => {
    //2.1.1 - EVITA O COMPORTAMENTO PADRÃO DE RELOAD AO DISPARAR UM SUBMIT NO FORM
    event.preventDefault() 

    //2.1.2 - PUXANDO A TAREFA DIGITADA NO INPUT
    const taskTitle = taskTitleInput.value
    //VALIDAÇÃO DE TAMANHO DO INPUT DIGITADO
    if (taskTitle.length < 3) {
        alert('A tarefa deve ter pelo menos 3 caracteres! Digite novamente')
        return;
    }

    //2.1.3 - ADICIONANDO A TASK AO ARRAY[]
    tasks.push(taskTitle)

    //3 - RENDERIZANDO <ul> DE TASKS AO HTML

    //3.1 - CRIANDO TAG <li>
    const li = document.createElement('li')
    
    //3.2 - CRIANDO INPUT CHECKBOX
    const input = document.createElement('input')
    input.setAttribute('type', 'checkbox') //ATRIBUINDO TYPE "checkbox" AO INPUT

    //3.3 - CRIANDO TAG <span>
    const span = document.createElement('span')
    span.textContent = taskTitle

    //3.4 - CRIANDO BUTTON
    const button = document.createElement('button')
    button.textContent = 'REMOVER'

    //3.5 - INSERINDO TAGS A <li>
    li.appendChild(input)
    li.appendChild(span)
    li.appendChild(button)

    //3.6 - INSERINDO <li> CRIADA A <ul>
    todoListUl.appendChild(li)

    //3.7 - LIMPANDO O INPUT APÓS DIGITAR
    taskTitleInput.value = ''
})