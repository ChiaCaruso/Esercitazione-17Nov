import { render, API } from "../js/utility.js";

const view = (id = 0) => {

    fetch(`${API}/${id}`)
        .then (response => response.json())
        .then ((movie) => {
            const container = document.querySelector("#content");
            render(container, `
                        <article>
                            <div id="article-img">
                                <img src="${movie.poster}">                             
                            </div>
                            <div id="article-text">  
                                <h2>${movie.title}</h2>
                                <br>
                                <p>${movie.year}</p>
                                <br>

                                <br>
                                <p>${movie.description}</p>
                                <br>                                                      
                            </div>    
                        </article>

                        <a href="#" id="back" class="btn">TORNA ALLA HOME</a>
                        `);

        });

    }
  
    

export { view }