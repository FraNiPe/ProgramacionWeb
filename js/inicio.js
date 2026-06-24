import {LIBROS} from "./libros.js";

export const grillas = document.querySelectorAll(".products-grid");
const subtitulos = document.querySelectorAll(".section-header");
const seccionesSuperiores = document.querySelectorAll(".hero-section, .promo-section");

// -- funcion tarjetas --//

export function crearNodoProducto (libro){
    const article = document.createElement("article");
    article.classList.add("product-card");

    const imgBox = document.createElement("div");
    imgBox.classList.add("product-img-box");

    imgBox.innerHTML = `
        <button class="card-fav-btn" aria-label="Añadir a favoritos">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M15.8333 11.6667C17.075 10.45 18.3333 8.99167 18.3333 7.08333C18.3333 5.86776 17.8504 4.70197 16.9909 3.84243C16.1313 2.98289 14.9655 2.5 13.75 2.5C12.2833 2.5 11.25 2.91667 9.99996 4.16667C8.74996 2.91667 7.71663 2.5 6.24996 2.5C5.03438 2.5 3.86859 2.98289 3.00905 3.84243C2.14951 4.70197 1.66663 5.86776 1.66663 7.08333C1.66663 9 2.91663 10.4583 4.16663 11.6667L9.99996 17.5L15.8333 11.6667Z" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <img src="${libro.portada}" alt="Portada de ${libro.titulo}">
        <div class="product-card-overlay">
            <div class="overlay-content">
                <h4>Sinopsis</h4>
                <p class="review-text">${libro.sinopsis}</p>
                <a href="#" class="btn-read-more">Ver más</a>
            </div>
        </div>
    `;

    const infoBox = document.createElement("div");
    infoBox.classList.add("product-info");

    const ratingSpan = document.createElement("span");
    ratingSpan.classList.add("rating");
    ratingSpan.innerText = libro.rating;

    const tituloH3 = document.createElement("h3");
    tituloH3.innerText = libro.titulo;

    const authorSpan = document.createElement("span");
    authorSpan.classList.add("author");
    authorSpan.innerText = libro.autor;

    const pagesSpan = document.createElement("span");
    pagesSpan.classList.add("pages");
    pagesSpan.innerText = `${libro.paginas} páginas`;

    infoBox.appendChild(ratingSpan);
    infoBox.appendChild(tituloH3);
    infoBox.appendChild(authorSpan);
    infoBox.appendChild(pagesSpan);

    article.appendChild(imgBox);
    article.appendChild(infoBox);

    return article;
}

export function renderizarInicio (){
    if (grillas.length >= 3){
        const lote1 = LIBROS.slice(0, 4);
        const lote2 = LIBROS.slice(4, 8);
        const lote3 = LIBROS.slice(8,12);

    lote1.forEach(libro => grillas[0].appendChild(crearNodoProducto(libro)));
    lote2.forEach(libro => grillas[1].appendChild(crearNodoProducto(libro)));
    lote3.forEach(libro => grillas [2].appendChild(crearNodoProducto(libro)));
    }
}

// -- funcion barra de búsqueda --//

function renderizarBusqueda (resultados){
    grillas.forEach(grilla => {
        while (grilla.firstChild){
            grilla.removeChild(grilla.firstChild);
        }
    });

    if (resultados === "vaciar"){
        subtitulos.forEach(sub => sub.style.display = "");
        seccionesSuperiores.forEach(sec => sec.style.display = "");
        renderizarInicio();
        return;
    }

    subtitulos.forEach(sub => sub.style.display = "none");
    seccionesSuperiores.forEach(sec => sec.style.display = "none");
    

    if (resultados.length === 0){
        const mensajeError = document.createElement("p");
        mensajeError.innerText = "Libro no encontrado";
        mensajeError.classList.add("mensaje-vacio");
        grillas [0].appendChild(mensajeError);
        return;
    }

    resultados.forEach(libro => {
        grillas[0].appendChild(crearNodoProducto(libro));
    });

}

document.addEventListener("keyup", (e) => {
    
    if (e.target.matches("#buscador")){
        const textoBuscado = e.target.value.toLowerCase();

        if (textoBuscado === ""){
        renderizarBusqueda("vaciar");
        return;
    }

    const librosFiltrados = LIBROS.filter(item => {
        return item.titulo.toLowerCase().includes(textoBuscado) ||
                item.autor.toLowerCase().includes(textoBuscado);
    });

    renderizarBusqueda(librosFiltrados);
    }
});

document.addEventListener("change", (e) => {

    if (e.target.matches("#orden-libros")){
        const ordenElegido = e.target.value;

        if(ordenElegido === "inicio"){
            renderizarBusqueda("vaciar");
            return;
        }
    
    let librosOrdenados = [...LIBROS];

    if (ordenElegido=== "titulo-az"){
        librosOrdenados.sort((a,b) => a.titulo.localeCompare(b.titulo));

    } else if (ordenElegido === "titulo-za"){
        librosOrdenados.sort((a,b) => b.titulo.localeCompare(a.titulo)); 
    } else if (ordenElegido === "autor-az"){
        librosOrdenados.sort((a,b) => a.autor.localeCompare (b.autor));
    } else if (ordenElegido === "autor-za"){
        librosOrdenados.sort((a,b) => b.autor.localeCompare(a.autor));
    }

    renderizarBusqueda(librosOrdenados);
    }

})


document.addEventListener("DOMContentLoaded", () => {
    if (grillas.length > 0) {
        renderizarInicio();
    }
});
    