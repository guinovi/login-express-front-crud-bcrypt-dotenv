const userRegex = /^[a-zA-Z0-9._-]{4,}$/;
const passRegex = /^[a-zA-Z0-9._-]{4,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

document.getElementById('fromForgot').addEventListener('submit',(e)=>{
    e.preventDefault()
    const user = document.getElementById('user').value;
    const errorMessageUser = document.getElementById('errorMessageUser');
    const email = document.getElementById('email').value;
    const errorMessageMail = document.getElementById('errorMessageMail');
    const pass = document.getElementById('pass').value;
    const errorMessagePass = document.getElementById('errorMessagePass');
    const errorMessage = document.getElementById('errorMessage');

    if(!userRegex.test(user)){
        errorMessageUser.textContent = 'Usuario Invalido';
        return;
    }
    if(!emailRegex.test(email)){
        errorMessageMail.textContent = 'Correo Invalido';
        return;
    }
    if(!passRegex.test(pass)){
        errorMessagePass.textContent = 'Contraseña Invalida';
        return;
    }

    fetch('/forgot',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user, email, pass})
    } )
    .then(response => response)
    .then(data =>{
        if(data.status === 500){
            errorMessage.textContent = 'Error en el servidor';
            return;
        }
        if(data.status === 404){
            errorMessage.textContent = 'Usuario y/o Email no encontrado';
            return;
        }
        if(data.status === 200){
            errorMessage.style.color = 'green'
            errorMessage.textContent = 'Contraseña actualizada';
            document.getElementById('fromForgot').reset();
            return;
        }
    })

})
