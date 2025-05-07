var text = document.querySelector("input");
var addBtn = document.querySelector(".add-task");
var todoBlock = document.querySelector(".todo-block");
var count;
if (localStorage.getItem("count") !== null) {
    count = Number(localStorage.getItem("count"));
}
else {
    count = 0;
}
function renderTask() {
    todoBlock.innerHTML = "";
    var saved = localStorage.getItem("card");
    var arr = saved ? JSON.parse(saved) : [];
    arr.forEach(function (e, index) {
        todoBlock.innerHTML += "\n      <div class=\"card\" id=\"".concat(e.id, "\">\n        <div class='check-and-text'>\n            <div class=\"checkbox-wrapper-15\">\n              <input class=\"inp-cbx\" id=\"cbx-").concat(index, "\" type=\"checkbox\" style=\"display: none;\"/>\n              <label class=\"cbx\" for=\"cbx-").concat(index, "\">\n                <span>\n                  <svg width=\"12px\" height=\"9px\" viewbox=\"0 0 12 9\">\n                    <polyline points=\"1 5 4 8 11 1\"></polyline>\n                  </svg>\n                </span>\n                <span>").concat(e.text, "</span>\n              </label>\n            </div>\n        </div>\n        <button class='delete-task' onclick=\"deleteTask(this)\">X</button>\n      </div>\n    ");
    });
}
addBtn.addEventListener("click", function () {
    if (text.value === "")
        return;
    var saved = localStorage.getItem("card");
    var arr = saved ? JSON.parse(saved) : [];
    var count = localStorage.getItem("count");
    count = count ? String(Number(count) + 1) : "1";
    localStorage.setItem("count", count);
    var obj = {
        id: Number(count),
        text: text.value,
    };
    arr === null || arr === void 0 ? void 0 : arr.push(obj);
    localStorage.setItem("card", JSON.stringify(arr));
    text.value = "";
    renderTask();
});
function deleteTask(button) {
    var _a;
    var id = (_a = button.closest(".card")) === null || _a === void 0 ? void 0 : _a.id;
    if (!id)
        return;
    var saved = localStorage.getItem("card");
    var arr = saved ? JSON.parse(saved) : [];
    var filtered = arr.filter(function (task) { return task.id !== Number(id); });
    var count = localStorage.getItem("count");
    count = count ? String(Number(count) - 1) : "1";
    localStorage.setItem("count", count);
    localStorage.setItem("card", JSON.stringify(filtered));
    renderTask();
}
window.addEventListener("DOMContentLoaded", function () {
    renderTask();
});
