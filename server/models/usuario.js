const mongoose=require('mongoose');
const Schema= mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE','USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}
let usuarioSchema= new Schema({
    nombre: {
        type: String,
        required:[true,'El nombre es necesario']
    },
    email:{
        type:String,
        unique: true,
        required:[true,'El correo es necesario']
    },
    password:{
        type:String,
        require:[true,'La contraseña es obligatoria']
    },
    img:{ 
        type: String,
        required: false

    },
    role:{
      type:String,
      default: 'USER_ROLE',
      enum: rolesValidos
    },
    estado:{
        type:Boolean,
        default: true
    }, 
    google: {
        type:Boolean,
        default:false
    } 
},{versionKey:false});

usuarioSchema.methods.toJSON = function(){
    let user= this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

usuarioSchema.plugin(uniqueValidator,{message: '{PATH} debe de ser único'});
const Usuario = mongoose.model('Usuario',usuarioSchema);
module.exports= Usuario;
// module.exports= mongoose.model('Usuario',usuarioSchema);