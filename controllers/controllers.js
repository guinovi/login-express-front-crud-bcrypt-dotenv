const express = require('express');
const path = require('path');
const db = require(path.join(__dirname, '..', '/db', 'db'));
const bcrypt = require('bcrypt');

const app = express();

/* bcrypt.hash('Admin', 10, function(err, hash) {
    console.log(hash)
}); */

/* bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
    // result == true
});
 */
const getLogin = (req,res) =>{
    res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
}

const postLogin = (req, res)=>{
    const {userInput, passInput} = req.body;
    db.query('SELECT username, pass FROM users where username =?', [userInput], (err, result)=>{
        if (err) {
            console.log(err.stack);
            res.status(500).send('Error al obtener usuario');
            return;
        }
        if(result.length === 0){
            console.log('Usuario no encontrado')
            res.status(404).send('Usuario no encontrado');
            return
        }
        bcrypt.compare(passInput, result[0].pass, (err, result) => {
            if(err){
                console.log(err.stack)
                res.status(500).send('Error al comparar contraseñas');
                return;
            }
            if(result){
                console.log('Contraseña correcta');
                res.status(200).send('ingreso exitoso Usuario:' +userInput);
                return;
            }else{
                res.status(401).send('Contraseña incorrecta');
            }
        
        })

    })
}


const postAddUser = (req, res) => {
    const {newname,lastname,newMail,newUser,newPass } = req.body;
    bcrypt.hash(newPass, 10, (err, hash) => {
        if(err){
            console.log(err);
            res.status(500).send('Error en el servidor');
            return;
        }
        if(hash){
            db.query('INSERT INTO users (name, lastname, email, username, pass) values (?, ?, ?, ?, ?)',[newname, lastname, newMail, newUser, hash], (err, results)=>{
                if(err.errno === 1062){
                    res.status(409).send('Email o usuario ya registrados');
                    return;
                }
                if (err) {
                    console.log(err);
                    res.status(500).send('Error en el servidor');
                    return;
                }
                res.status(200).send('Usuario Registrado')
            })
        }
    }) 
}


const postForgot = (req, res) => {
    const {user, email, pass} = req.body;
    db.query('SELECT * FROM users WHERE username =? AND email =?', [user, email], (err, result)=>{
        if(err){
            console.log(err);
            res.status(500).send('Error en el servidor');
            return;
        }
        if(result.length === 0){
            console.log('Usuario o email incorrectos')
            res.status(404).send('Usuario o email incorrectos');
            return
        }
        const userId = result[0].userId;
        bcrypt.hash(pass, 10, (err, hash) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error al encriptar la nueva contraseña');
                return;
            }
            db.query('UPDATE users SET pass = ? WHERE userId = ?', [hash, userId], (err, result) => {
                if (err) {
                    console.log('Error en query pass'+err);
                    res.status(500).send('Error al actualizar la contraseña');
                    return;
                }
                res.status(200).send('Contraseña actualizada');
            });
        });
    });
}
    



module.exports = {
    getLogin,
    postLogin,
    postAddUser,
    postForgot,
};