const form_log= document.getElementById("form_login");
const user= document.getElementById("nombre");
const password= document.getElementById("contrasena");
const errorUser= document.getElementById("error_user");
const errorContra= document.getElementById("error_contra");

let usuariosRegistrados=JSON.parse(localStorage.getItem("usuarios"))|| [];

function validarAcceso(){
    const existeUser=usuariosRegistrados.some( usuario=> (usuario.nombre===user.value.trim()||usuario.email.toLowerCase() === user.value.trim().toLowerCase())&& usuario.password===password.value.trim())
    return existeUser;
}
function validarUser(){
    const userValido=usuariosRegistrados.some(usuario=>usuario.nombre===user.value.trim()||usuario.email.toLowerCase() === user.value.trim().toLowerCase());
    return userValido;
}

user.addEventListener("blur",()=> {
    if(!validarUser()){
        user.classList.add("error");
        errorUser.textContent="Nombre de Usuario o Email inválido";

    }else{
        user.classList.remove("error");
        errorUser.textContent = "";
    }
})
user.addEventListener("focus",()=> {
        user.classList.remove("error");
        errorUser.textContent="";

})
password.addEventListener("blur", () => {
    if (password.value.trim() === "") {
        password.classList.add("error");
        errorContra.textContent = "La contraseña no puede estar vacía";
    } else {
        password.classList.remove("error");
        errorContra.textContent = "";
    }
});

password.addEventListener("focus", () => {
    password.classList.remove("error");
    errorContra.textContent = "";
});

form_log.addEventListener("submit", (e) => {
    e.preventDefault();

    if (validarAcceso()) {

        const usuarioLogueado = usuariosRegistrados.find(usuario =>
            (usuario.nombre === user.value.trim() || usuario.email.toLowerCase() === user.value.trim().toLowerCase()) &&
            usuario.password === password.value.trim()
        );

        sessionStorage.setItem("usuarioLogueado", JSON.stringify(usuarioLogueado));

        window.location.href = "../pages/perfil.html";

    } else {
        alert("Nombre de Usuario y/o contraseña incorrecta");
    }
});