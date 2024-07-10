// Expresiones regulares
const userRegex = /^[a-zA-Z0-9._-]{4,}$/;
const passRegex = /^[a-zA-Z0-9._-]{4,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

document.getElementById('formLogin').addEventListener('submit', (e)=> {
    e.preventDefault()
    const userInput = document.getElementById('userInput').value;
    const errorMessageUser = document.getElementById('errorMessageUser');
    const passInput = document.getElementById('passInput').value;
    const errorMessagePass = document.getElementById('errorMessagePass');
    const errorMessage = document.getElementById('errorMessage');
    if(!userRegex.test(userInput)){
        errorMessageUser.textContent = 'Usuario Invalido';
        return;
    }else{
        errorMessageUser.textContent = '';
    }
    if(!passRegex.test(passInput)){
        errorMessagePass.textContent = 'Contraseña Invalida';
        return;
    }else{
        errorMessagePass.textContent = '';
    }

    fetch('/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userInput, passInput})
    })
    .then(response => response)
    .then(data => {        
        if(data.status === 500){
            errorMessage.textContent = 'Error en el Servidor';
            return;
        }
        if(data.status === 404){
            errorMessage.textContent = 'Usuario y/o Contraseña no coinciden';
            return;
        }
        if(data.status === 401){
            errorMessage.textContent = 'Usuario y/o Contraseña no coinciden';
            return;
        }
        if(data.status === 200){
            console.log(data)
            errorMessage.style.color = 'green';
            errorMessage.textContent = 'Ingreso Exitoso';
            document.getElementById('formLogin').reset();
            return;
        }
    })
    .catch(error =>{
        console.error('Error:', error)
    })
})
