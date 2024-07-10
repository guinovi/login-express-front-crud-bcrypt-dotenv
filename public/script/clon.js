// Expresiones regulares
const userRegex = /^[a-zA-Z0-9._-]{4,}$/;
const passRegex = /^[a-zA-Z0-9._-]{4,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

document.getElementById('formLogin').addEventListener('submit', function(event) {
    event.preventDefault();

    const user = document.getElementById('user').value;
    const pass = document.getElementById('pass').value;
    const errorMessage = document.getElementById('errorMessage');
    const errorMessageUser = document.getElementById('errorMessageUser');
    const errorMessagePass = document.getElementById('errorMessagePass');

    // Validación de usuario
    if (!userRegex.test(user)) {
        errorMessageUser.textContent = 'El nombre de usuario no es válido. Debe tener al menos 4 caracteres, sin espacios, y solo puede contener ( . - _ )';
        return;
    }
    errorMessageUser.textContent = '';

    // Validación de contraseña
    if (!passRegex.test(pass)) {
        errorMessagePass.textContent = 'La contraseña no es válida. Debe tener al menos 4 caracteres, sin espacios, y solo puede contener ( . - _ )';
        return;
    }
    errorMessagePass.textContent = '';

    //FETCH
    fetch('/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user, pass })
    })
    .then(response => response)
    .then(data => {
        if (data.status === 200) {
            console.log('ingreso autorizado');
        } else {
            errorMessage.textContent = 'Usuario y/o contraseña no coinciden';
            return;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        errorMessage.textContent ='Usuario y/o contraseña no coinciden';
        return;
    });
   

});




document.getElementById('formNewUser').addEventListener('submit', (event)=>{
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    const newUser = document.getElementById('newUser').value
    const errorMessageUser = document.getElementById('errorMessageUser');
    const newPass = document.getElementById('newPass').value
    const errorMessagePass = document.getElementById('errorMessagePass');
    const newMail = document.getElementById('newMail').value
    const errorMessageMail = document.getElementById('errorMessageMail');

    // Validación de usuario
    if (!userRegex.test(newUser)) {
        errorMessageUser.textContent = 'El nombre de usuario no es válido. Debe tener al menos 4 caracteres, sin espacios, y solo puede contener( . - _ )';
        return;
    }
    errorMessageUser.textContent = '';

    // Validación de contraseña
    if (!passRegex.test(newPass)) {
        errorMessagePass.textContent = 'La contraseña no es válida. Debe tener al menos 4 caracteres, sin espacios, y solo puede contener( . - _ )';
        return;
    }
    errorMessagePass.textContent = '';

    // Validación de email
    if (!emailRegex.test(newMail)) {
        errorMessageMail.textContent = 'El email no es válido';
        return;
    }
    errorMessageMail.textContent = '';

    //FETCH
    fetch('/login/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newUser, newPass, newMail })
    })
   .then(response => response)
   .then(data => {
    if (data.status === 200) {
        console.log('Se agregó un Nuevo Usuario');
    } else {
        if (data.status === 409){
            console.log('ya existe el usuario')
            errorMessage.innerHTML = `Ya existe un usuario registrado con ese email <br> Pruebe Recuperar la contraseña`;
        }
    }
    })
    .catch(error => {
        console.error('Error:', error);
        errorMessage.textContent = 'El usuario y/o la contraseña no se crearon';
    });
})