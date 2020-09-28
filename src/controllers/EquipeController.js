const Equipe = require('../models/Equipe');
const express = require('express')
const path = require('path');
const { Query } = require('mongoose');
const { json } = require('body-parser');
const server = express()
class EquipeController{

    async index(req, res){
       
        const equipes = await Equipe.find();
        var equipeapi = res.json(equipes)
        return equipeapi
    }

    async store(req, res){
        console.log(req.body); 
        
        const {equipeName, email, telefone, players, pagamento} = req.body;
        
        let equipeEmail = await Equipe.findOne({email});
        let equipeNameT = await Equipe.findOne({equipeName});
        if(!equipeEmail || !equipeNameT){
            const equipe = await Equipe.create(
            {
                equipeName,
                email,
                telefone,
                players,
                pagamento
            });
        }
        return res.redirect('/ligalol/pagamento')
    }

}

module.exports = new EquipeController();   