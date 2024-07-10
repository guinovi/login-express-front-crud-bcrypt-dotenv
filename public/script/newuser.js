// Expresiones regulares
const userRegex = /^[a-zA-Z0-9._-]{4,}$/;
const passRegex = /^[a-zA-Z0-9._-]{4,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

document.getElementById('formNewUser').addEventListener('submit', (e)=>{
    e.preventDefault();
    const newname = document.getElementById('newname').value;
    const errorMessageName = document.getElementById('errorMessageName');
    const lastname = document.getElementById('lastname').value;
    const errorMessageLastname = document.getElementById('errorMessageLastname');
    const newMail = document.getElementById('newMail').value;
    const errorMessageMail = document.getElementById('errorMessageMail');
    const newUser = document.getElementById('newUser').value;
    const errorMessageUser = document.getElementById('errorMessageUser');
    const newPass = document.getElementById('newPass').value;
    const errorMessagePass = document.getElementById('errorMessagePass');
    const errorMessage = document.getElementById('errorMessage');

    if(!nameRegex.test(newname)){
        errorMessageName.textContent = 'Nombre Invalido';
        return;
    }
    errorMessageName.textContent = '';
    if(!nameRegex.test(lastname)){
        errorMessageLastname.textContent = 'Apellido Invalido';
        return;
    }
    errorMessageLastname.textContent = '';
    if(!emailRegex.test(newMail)){
        errorMessageMail.textContent = 'Correo Invalido';
        return;
    }
    errorMessageMail.textContent = '';
    if(!userRegex.test(newUser)){
        errorMessageUser.textContent = 'Usuario Invalido';
        return;
    }
    errorMessageUser.textContent = '';
    if(!passRegex.test(newPass)){
        errorMessagePass.textContent = 'Contraseña Invalida';
        return;
    }
    errorMessagePass.textContent = '';

    fetch('/adduser',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            newname,
            lastname,
            newMail,
            newUser,
        newPass
        })
    })
    .then(response => response)
    .then(data =>{
        if(data.status === 409){
            errorMessageUser.textContent = 'El email o Usuario ya se encuentra registrado'
            return;
        }
        if(data.status === 500){
            errorMessage.textContent = 'Error al Registrar el Usuario'
            return;
        }
        if(data.status === 200){
            errorMessage.style.color = 'green'
            errorMessage.textContent = 'Usuario Registrado Exitosamente'
            document.getElementById('formNewUser').reset();
            return;
        }
    })
    .catch(err =>{
        console.log('ERROR: '+err)
    })



})
