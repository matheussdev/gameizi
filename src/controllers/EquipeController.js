const Equipe = require('../models/Equipe');
const express = require('express')
const path = require('path');
const { Query } = require('mongoose');
const { json } = require('body-parser');
const server = express()
const nodemailer = require('nodemailer')
require('dotenv').config()
const user = "contato@gameizi.com.br"
const pass = process.env.DATABASE_EMAILPASS



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

        const transporter = nodemailer.createTransport(
            {
              host:"smtp.umbler.com",
              port:587,
              auth:{user,pass}
            }
        )
        
        console.log(req.body.email);
        transporter.sendMail({
            from:user,
            to:user +", "+ req.body.email,
            replyTo:req.body.email,
            subject:"Falta pouco para a sua inscrição!",
            text:"você realizou sua insvrição no evendo LigaLol!<br>em até 24 horas seu pagamento será confirmado para adiantar o processo envie o comprovante para o numero (99) 9 99194-7191"
            
          }).then(info=>{
            res.send("info")
          })
        
        
        return res.redirect('/ligalol/pagamento')
    }

}

module.exports = new EquipeController();   