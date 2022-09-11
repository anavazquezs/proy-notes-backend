const usersCrl = {};

const passport = require('passport');

const User = require('../models/User');

usersCrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

//Registro de usuario con un método básico
usersCrl.signup = async (req, res) => {
    const errors = [];
    const { name, email, password, confirm_password } = req.body;
    if(password != confirm_password) {
        errors.push({text: 'Passwords do not match'});
    };
    if(password.length < 4) {
        errors.push({text: 'Passwords must have at least 4 characters'});
    };
    if(errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            email,
            password,
            confirm_password,
        });
    } else {
        const emailUser = await User.findOne({email: email});
        if(emailUser) {
            req.flash('error_msg', 'The email is already in use');
            res.redirect('/users/signup');
        } else {
            const newUser = new User({name, email, password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'You are registered')
            res.redirect('/users/signin');
        }
    }
};

usersCrl.renderSignInForm = (req, res) => {
    res.render('users/signin');
};

//Para signin se usa otro método utilizando passport, que se usa para guardar una sesión en memoria y para chequear si el usuario tiene autorización para las vistas
usersCrl.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/notes',
    failureFlash: true,
});

usersCrl.logout = (req, res) => {
    req.logout(req.user, err => {
        if(err) return next(err);
        req.flash('success_msg', 'You are logged out');
        res.redirect('/users/signin');
    });
};

module.exports = usersCrl;