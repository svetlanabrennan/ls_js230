todo_items = [
  { id: 1, title: 'Homework' },
  { id: 2, title: 'Shopping' },
  { id: 3, title: 'Calling Mom' },
  { id: 4, title: 'Coffee with John ' }
];

document.addEventListener("DOMContentLoaded", () => {
  let listTemplate = Handlebars.compile(document.querySelector("#listTemplate").innerHTML);

  renderList(listTemplate);

  document.addEventListener("click", event => {
    event.preventDefault;
    if (event.target.tagName === "SPAN") {
      let todoId = event.target.parentNode.id;
      let deleteQuestion = Handlebars.compile(document.querySelector("#deleteQuestion").innerHTML);

      document.querySelector(".confirm_prompt").insertAdjacentHTML("beforeend", deleteQuestion({ id: todoId }));
      document.querySelector(".confirm_prompt").classList.add("show");

      let yesBtn = document.querySelector(".confirm_yes");
      let noBtn = document.querySelector(".confirm_no");

      yesBtn.addEventListener("click", event => {
        document.querySelector(".confirm_prompt").classList.remove("show");
        document.querySelector(".confirm_prompt").removeChild(document.querySelector(".confirm_delete"));
        todo_items = todo_items.filter(todo => todo.id !== Number(todoId));
        document.querySelector("#todos").textContent = "";
        renderList(listTemplate);
      });

      noBtn.addEventListener("click", event => {
        document.querySelector(".confirm_prompt").classList.remove("show");
        document.querySelector(".confirm_prompt").removeChild(document.querySelector(".confirm_delete"))
      });
    }
  })
});

function renderList(template) {
  todo_items.forEach(item => {
    document.querySelector("#todos").insertAdjacentHTML("beforeend", template(item));
  })
}