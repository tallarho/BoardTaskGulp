const text = document.querySelector("input") as HTMLInputElement;
const addBtn = document.querySelector(".add-task") as HTMLButtonElement;
const todoBlock = document.querySelector(".todo-block") as HTMLDivElement;

let count: number;
if (localStorage.getItem("count") !== null) {
  count = Number(localStorage.getItem("count"));
} else {
  count = 0;
}
interface Card {
  id: number;
  text: string;
}

function renderTask() {
  todoBlock.innerHTML = "";

  const saved: string | null = localStorage.getItem("card");
  const arr = saved ? JSON.parse(saved) : [];

  arr.forEach((e: Card, index:number) => {
    todoBlock.innerHTML += `
      <div class="card" id="${e.id}">
        <div class='check-and-text'>
            <div class="checkbox-wrapper-15">
              <input class="inp-cbx" id="cbx-${index}" type="checkbox" style="display: none;"/>
              <label class="cbx" for="cbx-${index}">
                <span>
                  <svg width="12px" height="9px" viewbox="0 0 12 9">
                    <polyline points="1 5 4 8 11 1"></polyline>
                  </svg>
                </span>
                <span>${e.text}</span>
              </label>
            </div>
        </div>
        <button class='delete-task' onclick="deleteTask(this)">X</button>
      </div>
    `;
  });
}

addBtn.addEventListener("click", function () {
  if (text.value === "") return;

  const saved: string | null = localStorage.getItem("card");
  const arr = saved ? JSON.parse(saved) : [];

  let count = localStorage.getItem("count");
  count = count ? String(Number(count) + 1) : "1";
  localStorage.setItem("count", count);

  const obj: Card = {
    id: Number(count),
    text: text.value,
  };

  arr?.push(obj);
  localStorage.setItem("card", JSON.stringify(arr));

  text.value = "";
  renderTask();
});

function deleteTask(button) {
  const id = button.closest(".card")?.id;
  if (!id) return;

  const saved: string | null = localStorage.getItem("card");
  const arr = saved ? JSON.parse(saved) : [];

  const filtered = arr.filter((task: { id: number }) => task.id !== Number(id));

  let count = localStorage.getItem("count");
  count = count ? String(Number(count) - 1) : "1";

  localStorage.setItem("count", count);
  localStorage.setItem("card", JSON.stringify(filtered));
  renderTask();
}

window.addEventListener("DOMContentLoaded", () => {
  renderTask();
});
