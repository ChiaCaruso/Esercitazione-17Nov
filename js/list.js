import { render, API } from "../js/utility.js";

const list = (data) => {
    const elements = data
        .map (item => `
                    <li>
                    <img src="${item.poster}" width="200">
                    <div class="text-film">
                    <a href="#view-${item.id}">${item.title}</a>
                    <p>${item.year}</p>
                    <a href="#edit-${item.id}" class="edit" ><img src="../img/edit.png" width="50"></a>
                    <button class="delete" id="${item.id}"><img src="../img/delete.png" width="50"></button>
                    </div></li>`)
        .join("");

    const container = document.querySelector("#content");

    render(container, `
        <h2>Scegli un film</h2>
        <ul>${elements}</ul>
        <a href="#add"><button id= "add" class="btn">AGGIUNGI UNA NUOVA SCHEDA</button></a>`
    );

    const btns = [...document.querySelectorAll(".delete")];

    const deleteItem = (event) => {
        const id = parseInt(event.target.id);
        const filtered = data.filter((movie) => movie.id !== id);

        fetch(`${API}/${id}` , { method: "DELETE" })
            .then (response => response.json())
            .then (() => list(filtered));
    };

    const btnClicks = (btn) =>
        btn.addEventListener("click", deleteItem,  { once: true });
        btns.forEach(btnClicks);         

    };

export { list };