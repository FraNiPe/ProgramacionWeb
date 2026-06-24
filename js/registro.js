
const form= document.getElementById("form_reg")
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const password = document.getElementById("contrasena");
const errorNombre = document.getElementById("error_nom");
const errorEmail = document.getElementById("error_email");
const errorPassword=document.getElementById("error_contra");
const btnReset=document.getElementById("reset");

function validarNombre(nombre){
    const regex = /^[a-zA-Z]+$/;
    return regex.test(nombre);
}

nombre.addEventListener("blur", () => {
    if(!validarNombre(nombre.value)){
        nombre.classList.add("error");
        errorNombre.textContent = "El nombre solo puede contener letras";
    }else{
        nombre.classList.remove("error");
        errorNombre.textContent = "";
    }
});
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
email.addEventListener("blur", () => {
    if(!validarEmail(email.value)){
        email.classList.add("error");
        errorEmail.textContent = "Correo electrónico inválido";
    }else{
        email.classList.remove("error");
        errorEmail.textContent = "";
    }
});
function validarPassword(password) {
    const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$!%=&*])[A-Za-z\d#$!%=&*]{8,12}$/;

    return regex.test(password);
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
nombre.addEventListener("focus", () => {
    nombre.classList.remove("error");
    errorNombre.textContent = "";
});

email.addEventListener("focus", () => {
    email.classList.remove("error");
    errorEmail.textContent = "";
});

password.addEventListener("focus", () => {
    password.classList.remove("error");
    errorPassword.textContent = "";
});

btnReset.addEventListener("click", ()=>{
    errorNombre.textContent = "";
    errorEmail.textContent = "";
    errorPassword.textContent = "";

    nombre.classList.remove("error");
    email.classList.remove("error");
    password.classList.remove("error");



});
form.addEventListener("submit", function(event){
    event.preventDefault();

    
    
    if(validarNombre(nombre.value.trim()) && validarEmail(email.value.trim()) &&  validarPassword(password.value.trim()) ){

    let usuarios = JSON.parse(localStorage.getItem("usuarios"))|| [];

    const existeEmail = usuarios.some(usuario => usuario.email.toLowerCase() === email.value.trim().toLowerCase()
    );
    const existeUsername= usuarios.some(usuario =>  usuario.nombre===nombre.value.trim());

    if(existeEmail){
        alert("Ya existe un usuario con ese correo electrónico");
        return;
    }else if(existeUsername){
            alert("Ya existe un usuario con ese nombre");
        return;

    }
    const nuevoUsuario={        
        nombre: nombre.value.trim(),
        email: email.value.trim(),
        password: password.value.trim()
    }
    usuarios.push(nuevoUsuario);
    localStorage.setItem( "usuarios", JSON.stringify(usuarios));

        alert("Registro exitoso");
        window.location.href = "../pages/login.html";

    }


});