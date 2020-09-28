const {Schema, model} = require('mongoose');

const EquipeSchema = new Schema({
    equipeName:String,
    email:String,
    telefone:String,
    players:Array,

    pagamento:Boolean
});

module.exports = model('Equipe', EquipeSchema);