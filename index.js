// 1 -  TAGS
const form = document.querySelector("#todo-form");
const taskTitleInput = document.querySelector("#task-title-input");
const todoListUl = document.querySelector("#todo-list");

//ARRAY DE TASKS
let tasks = [];

//2 - FUNÇÃO PARA RENDERIZAR O HTML
function renderTaskOnHTML(taskTitle, done = false) {
  //2.1 - RENDERIZANDO <ul> DE TASKS AO HTML

  //2.1.1 - CRIANDO TAG <li>
  const li = document.createElement("li");

  //2.1.2 - CRIANDO INPUT CHECKBOX
  const input = document.createElement("input");

  //2.1.3 - ATRIBUINDO TYPE "checkbox" AO INPUT
  input.setAttribute("type", "checkbox");

  //2.1.4 - EVENTO DE TOGGLE (done, undone) -> CHECKBOX
  input.addEventListener("change", (event) => {
    //SELECIONANDO O ELEMENTO "PAI" DO <input type=checkbox> = <li>
    const liToToggle = event.target.parentElement;

    //ADICIONANDO LINE-THROUGH EM TAREFA CONCLUÍDA

    //RESERVANDO PROPRIEDADE QUE VERIFICA EM boolean SE A CHECKBOX FOI MARCADA OU NÃO
    const done = event.target.checked;

    //SELECIONANDO A TAG <span> QUE SERA ESTILIZADA CASO SEJA MARCDA
    const spanToToggle = liToToggle.querySelector("span");
    if (done) {
      spanToToggle.style.textDecoration = "line-through";
    } else {
      spanToToggle.style.textDecoration = "none";
    }

    //2.1.5 - MODIFICANDO ATRIBUTO "done" DO ARRAY "tasks"

    //PERCORRE TODAS AS TAREFAS NO ARRAY E VERIFICA A IGUALDADE DO TÍTULO
    //COM A TAREFA QUE ESTÁ SENDO ALTERADA NO EVENTO
    //CASO TÍTULOS IGUAIS ALTERA O ATRIBUTO "done"
    tasks = tasks.map((t) => {
      if (t.title === spanToToggle.textContent) {
        return {
          title: t.title,
          done: !t.done,
        };
      }
      return t;
    });

    //2.1.6 - ATUALIZANDO DADOS NO LOCAL STORAGE
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  //2.1.5 - VERIFICAR STATUS DA TAREFA PARA EXECUTAR "window.onload"
  input.checked = done;

  //3.3 - CRIANDO TAG <span>
  const span = document.createElement("span");
  span.textContent = taskTitle;

  //3.3.1 - VERIFICAÇÃO DO <style> DA <span> PARA QUANDO A PÁGINA FOR ATUALIZADA - "window.onload"
  if (done) {
    span.style.textDecoration = "line-through";
  }

  //3.4 - CRIANDO BUTTON
  const button = document.createElement("button");
  button.textContent = "REMOVER";

  //3.4.1 - REMOVE A TAG <li> "PAI" DO BOTÃO DE REMOVER
  button.addEventListener("click", (event) => {
    const liToRemove = event.target.parentElement;

    //3.4.2 - LOCALIZANDO TÍTULO DA TAREFA A SER REMOVIDA
    const titleToRemove = liToRemove.querySelector("span").textContent;

    //3.4.3 - FILTRO PARA REMOVER A TASK DO ARRAY "tasks"
    tasks = tasks.filter((t) => t.title !== titleToRemove);

    //3.4.4 - REMOVE A TAG <li> da <ul>
    todoListUl.removeChild(liToRemove);

    //3.4.5 - ATUALIZANDO DADOS NO LOCAL STORAGE
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  //3.5 - INSERINDO TAGS A <li>
  li.appendChild(input);
  li.appendChild(span);
  li.appendChild(button);

  //3.6 - INSERINDO <li> CRIADA A <ul>
  todoListUl.appendChild(li);
}

//RENDERIZNADO ITEMS DO "LocalStorage" no HTML
window.onload = () => {
  const tasksOnLocalStorage = localStorage.getItem("tasks");

  if (!tasksOnLocalStorage) return;

  tasks = JSON.parse(tasksOnLocalStorage);

  tasks.forEach((t) => {
    renderTaskOnHTML(t.title, t.done);
  });
};

//3- EVENTOS
//3.1 - ARMAZENAR INPUT DIGITADO NA <ul>
form.addEventListener("submit", (event) => {
  //3.1.1 - EVITA O COMPORTAMENTO PADRÃO DE RELOAD AO DISPARAR UM SUBMIT NO FORM
  event.preventDefault();

  //3.1.2 - PUXANDO A TAREFA DIGITADA NO INPUT
  const taskTitle = taskTitleInput.value;
  //VALIDAÇÃO DE TAMANHO DO INPUT DIGITADO
  if (taskTitle.length < 3) {
    alert("A tarefa deve ter pelo menos 3 caracteres! Digite novamente");
    return;
  }

  //3.1.3 - ADICIONANDO A TASK AO ARRAY[]
  tasks.push({
    title: taskTitle, //ATRIBUTO TITLE
    done: false, //ATRIBUTO CONCLUIDO => CHECKBOX
  });

  //3.2 - ARMAZENANDO TASKS AO LOCAL STORAGE
  localStorage.setItem("tasks", JSON.stringify(tasks));

  //3.3 - CHAMANDO A FUNÇÃO
  renderTaskOnHTML(taskTitle);

  //3.4 - LIMPANDO O INPUT APÓS DIGITAR
  taskTitleInput.value = "";
});
