import { render, API } from "../js/utility.js";

const container = document.querySelector("#navbar");
const btnSearch = document.querySelector("#search");
const input = document.querySelector(".search-input");
render(container, `
    <h2>Movie Database</h2>
    <ul>
        <li><a href="#add" id= "add"><img src="./img/add.png" width="50"></a></li>
        <li><button id= "search"><img src="./img/search.png" width="50"></button><input type="text" name="search" class="search-input" placeholder="Search" autocomplete="off"></li>
    </ul>
`);

// btnSearch.addEventListener("click", () =>{

//     input.style.display = "inline-block";

    // const value = input.value.toLowerCase();

    // const result = data.filter( (item) => 
    // item.title.toLowerCase().search(value) > -1 
    // )

    // render(container, result);

// });


const list = (data) => {
    const elements = data
        .map (item => `
                    <li>
                    <img src="${item.poster}" class="poster" height="300">
                    <div class="text-film">
                    <a href="#view-${item.id}">${item.title}</a>
                    <p>${item.year}</p>
                    <a href="#edit-${item.id}" class="edit" ><img src="./img/edit.png" width="50"></a>
                    <button class="delete" id="${item.id}"><img src="./img/delete.png" width="50"></button>
                    </div></li>`)
        .join("");

    const container = document.querySelector("#content");

    render(container, `
        <ul>${elements}</ul>`
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
