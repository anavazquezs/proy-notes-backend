const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

//Encripta la contraseña y devuelve la contraseña cifrada
UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

//Compara los dos cifrados para que el usuario pueda loggearse con su contraseña y no necesite el valor de hash. Devuelve un booleano: true si la contraseña es correcta
UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


module.exports = model('User', UserSchema);