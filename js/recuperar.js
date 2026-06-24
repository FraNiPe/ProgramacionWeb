const form = document.getElementById("form_recuperar");
const usuario = document.getElementById("usuario");
const password = document.getElementById("password");
const repetir = document.getElementById("repetir");
const errorUsuario = document.getElementById("error_usuario");
const errorPassword = document.getElementById("error_password");
const errorRepetir = document.getElementById("error_repetir");

let usuariosRegistrados=JSON.parse(localStorage.getItem("usuarios"))|| [];

function validarUser(){
    const userValido=usuariosRegistrados.some(u=>u.nombre===usuario.value.trim()||u.email===usuario.value.trim());
    return userValido;

}
usuario.addEventListener("blur", ()=>{
    if(!validarUser()){
        usuario.classList.add("error");
        errorUsuario.textContent="Nombre de Usuario o Email inválido";

    }else{
        usuario.classList.remove("error");
        errorUsuario.textContent="";

    }
})
usuario.addEventListener("focus", ()=>{
    usuario.classList.remove("error");
    errorUsuario.textContent="";

})

password.addEventListener("focus", () => {
    password.classList.remove("error");
    errorPassword.textContent = "";
});

repetir.addEventListener("focus", () => {
    repetir.classList.remove("error");
    errorRepetir.textContent = "";
});

function validarPassword(pass) {
    const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$!%=&*])[A-Za-z\d#$!%=&*]{8,12}$/;

    return regex.test(pass);
}
password.addEventListener("blur", () => {
    if(!validarPassword(password.value)){
        password.classList.add("error");
        errorPassword.textContent = "Debe contener un mínimo de 8 caracteres y máximo de 12 caracteres, al menos una minúscula, una mayúscula, un número y un caracter especial (#, $, !, % o =)";
    }else{
        password.classList.remove("error");
        errorPassword.textContent = "";
    }
});
function passIguales(){
    return password.value.trim()===repetir.value.trim();
}
repetir.addEventListener("blur", () => {
    if(!passIguales()){
        repetir.classList.add("error");
        errorRepetir.textContent = "Contraseñas distintas";
    }else{
        repetir.classList.remove("error");
        errorRepetir.textContent = "";
    }
});

form.addEventListener("submit", (e)=>{
    e.preventDefault();

    if(validarUser() && validarPassword(password.value.trim())&& passIguales()){
        const indice = usuariosRegistrados.findIndex(
            u =>
            u.nombre === usuario.value.trim() ||
            u.email === usuario.value.trim()
        );

        usuariosRegistrados[indice].password =password.value.trim();

        localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));
        alert("Contraseña cambiada exitosamente");
        window.location.href = "../pages/login.html";
    }else{
        alert("Datos incorrectos");
    }


})