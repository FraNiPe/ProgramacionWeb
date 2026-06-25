document.addEventListener("click", (e) => {
    
    const linkPerfil = e.target.closest("#link-perfil");

    if (linkPerfil) {
        e.preventDefault(); 

        const usuarioLogueado = sessionStorage.getItem("usuarioLogueado");
        const estamosEnPages = window.location.pathname.includes("/pages/");
        const prefijo = estamosEnPages ? "" : "pages/";

        if (usuarioLogueado) {
            window.location.href = prefijo + "perfil.html";
        } else {
            window.location.href = prefijo + "login.html";
        }
    }
});