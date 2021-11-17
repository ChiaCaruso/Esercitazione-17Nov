import { render, API } from "../js/utility.js";


const edit = (id = 0) => {
    const resource = `${API}/${id}`;

    fetch(resource)
        .then (response => response.json())
        .then ((movie) => {

        const container = document.querySelector("#content");

        render(container, `<div>
        <h3>Modifica una nuova scheda</h3>
        <form id="create">

            <div class="row">
                <label for="title">Titolo:</label>
                <input type="text" id="title" name="title" value="${movie.title}">
            </div>

            <div class="row">
                <label for="poster">Poster:</label>
                <input type="text" id="poster" name="poster" value="${movie.poster}">
            </div>

            <div class="row">
                <label for="year">Anno:</label>
                <input type="number" min="1900" value="value="${movie.year}"" id="year" name="year">
            </div> 

            <div class="row">
                <label for="description">Descrizione:</label>
                <textarea id="description" name="description">${movie.description}</textarea>
            </div>  

            <button class="btn">MODIFICA SCHEDA</button> 
                               
        </form>

        <a href="#back"><button id= "#back" class="btn">TORNA ALLA HOME</button></a>
    </div>`);

    const form = document.querySelector("#create");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        
        const updateMovie = {
            title: event.target.title.value,
            poster: event.target.poster.value,
            year: parseInt(event.target.year.value),
            description: event.target.description.value
        };

        fetch (resource, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/JSON"
            },            
            body: JSON.stringify(updateMovie)
        })
            .then(response => response.json())
            .then(() => (location.hash = ""));
    });

    });

    };

export { edit }