import { LIBROS } from "./libros.js";

const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuarioLogueado"));

if (!usuarioLogueado) {
    window.location.href = "../pages/login.html";
}

const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");

if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", () => {
        sessionStorage.removeItem("usuarioLogueado");
        alert("¡Has cerrado sesión con éxito!");
        window.location.href = "../index.html";
    });
}

// Datos dinamicos
const fotoPerfil = document.querySelector(".foto-perfil");
if (fotoPerfil) {
    fotoPerfil.textContent = usuarioLogueado.nombre.charAt(0).toUpperCase();
}

const nombrePerfil = document.querySelector(".barra-lateral h2");
const aliasPerfil  = document.querySelector(".barra-lateral p");

if (nombrePerfil) nombrePerfil.textContent = usuarioLogueado.nombre;
if (aliasPerfil)  aliasPerfil.textContent  = "@" + usuarioLogueado.nombre.toLowerCase().replace(/\s+/g, "_");

//Favoritos
const claveFavoritos = "favoritos_" + usuarioLogueado.nombre;

function obtenerFavoritos() {
    const guardados = localStorage.getItem(claveFavoritos);
    return guardados ? JSON.parse(guardados) : [];
}

function guardarFavoritos(ids) {
    localStorage.setItem(claveFavoritos, JSON.stringify(ids));
}

function obtenerLibrosFaveados() {
    const ids = obtenerFavoritos();
    return LIBROS.filter(libro => ids.includes(libro.id));
}

function toggleFavorito(idLibro) {
    let ids          = obtenerFavoritos();
    const esFavorito = ids.includes(idLibro);

    if (esFavorito) {
        ids = ids.filter(id => id !== idLibro);
    } else {
        ids.push(idLibro);
    }

    guardarFavoritos(ids);

    
    generarGrillaLibros();
    actualizarContador();
    actualizarBarraLateral();
}

// Pintar libros faveados
function generarGrillaLibros() {
    const librosFaveados = obtenerLibrosFaveados();
    const grilla         = document.querySelector(".grilla-libros");

    if (!grilla) return;

    grilla.innerHTML = "";

    
    if (librosFaveados.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "Todavía no tenés libros guardados.";
        mensaje.classList.add("mensaje-vacio");
        grilla.appendChild(mensaje);
        return;
    }

    librosFaveados.forEach(libro => {
        const carta = document.createElement("div");
        carta.classList.add("carta-libro");

        carta.innerHTML = `
            <div class="imagen-libro">
                <img src="../${libro.portada}" alt="Portada de ${libro.titulo}">
                <div class="favorito activo" data-id="${libro.id}">
                    <a href="#">♥</a>
                </div>
            </div>
            <div class="info-libro">
                <h3>${libro.titulo}</h3>
                <p>${libro.autor}</p>
                <button>leer más</button>
            </div>
        `;

        
        const enlaceCorazon = carta.querySelector(".favorito a");
        enlaceCorazon.addEventListener("click", (e) => {
            e.preventDefault();
            toggleFavorito(libro.id);
        });

        grilla.appendChild(carta);
    });
}

function actualizarContador() {
    const ids      = obtenerFavoritos();
    const contador = document.querySelector(".titulo span");
    if (contador) {
        contador.textContent = ids.length + " libros";
    }
}


function actualizarBarraLateral() {
    const librosFaveados = obtenerLibrosFaveados();
    const autoresUnicos = [...new Set(librosFaveados.map(libro => libro.autor))];

    const listaAutores = document.querySelector(".autores ul");
    if (listaAutores) {
        listaAutores.innerHTML = "";

        if (autoresUnicos.length === 0) {
            const li = document.createElement("li");
            li.textContent = "Sin autores todavía";
            listaAutores.appendChild(li);
        } else {
            autoresUnicos.forEach(autor => {
                const li = document.createElement("li");
                li.innerHTML = `<a href="#">${autor}</a>`;
                listaAutores.appendChild(li);
            });
        }
    }

    const contenedorEtiquetas = document.querySelector(".etiquetas");
    if (contenedorEtiquetas) {
        contenedorEtiquetas.innerHTML = "";

        if (librosFaveados.length === 0) {
            const span = document.createElement("span");
            span.textContent = "Sin géneros todavía";
            contenedorEtiquetas.appendChild(span);
        } else {
           
            const generosUnicos = [...new Set(
                librosFaveados
                    .filter(libro => libro.genero)
                    .map(libro => libro.genero)
            )];

            if (generosUnicos.length === 0) {
                const span = document.createElement("span");
                span.textContent = "Agregá géneros en libros.js";
                contenedorEtiquetas.appendChild(span);
            } else {
                generosUnicos.forEach(genero => {
                    const span = document.createElement("span");
                    span.innerHTML = `<a href="#">${genero}</a>`;
                    contenedorEtiquetas.appendChild(span);
                });
            }
        }
    }
}

//Inicio 
document.addEventListener("DOMContentLoaded", () => {
    generarGrillaLibros();
    actualizarContador();
    actualizarBarraLateral();
});
