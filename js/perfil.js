document.addEventListener("DOMContentLoaded", () => {
    const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");

    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", () => {
            sessionStorage.removeItem("usuarioLogueado");
            alert("¡Has cerrado sesión con éxito!");
            
            window.location.href = "../index.html"; 
        });
    }
});