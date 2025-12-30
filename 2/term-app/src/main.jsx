import "./index.css";
import { createRoot } from "react-dom/client";
import { TermList } from "./TermList";

const form = document.getElementById("add-description"),
  descriptionList = document.getElementById("description-list"),
  reactRoot = createRoot(descriptionList);

function saveTermList(terms) {
  localStorage.setItem("termList", JSON.stringify(terms));
}

function restoreTermList() {
  const rawTermList = localStorage.getItem("termList");

  if (!rawTermList) {
    return [];
  }

  return JSON.parse(rawTermList);
}

function syncTermList() {
  saveTermList(terms);
  reactRoot.render(<TermList terms={terms} onDelete={deleteItem} />);
}

let terms = restoreTermList();

function addTerm(title, description) {
  terms.push({
    // id: crypto.randomUUID(),
    id: Date.now(),
    title,
    description,
  });

  terms.sort((term1, term2) => (term1.title < term2.title ? -1 : 1));

  syncTermList();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Получаем значения полей формы
  const title = form.elements["title"].value;
  const description = form.elements["description"].value;

  // Сбрасываем форму
  form.reset();

  addTerm(title, description);
});

function deleteItem(id) {
  terms = terms.filter((term) => term.id !== id);

  syncTermList();
}

syncTermList();
