const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const EquipeController = require('./controllers/EquipeController');
const paymentMethod = require
const server = express();

server.use((req, res, next) => { //Cria um middleware onde todas as requests passam por ele 
  if ((req.headers["x-forwarded-proto"] || "").endsWith("http")) //Checa se o protocolo informado nos headers é HTTP 
      res.redirect(`https://${req.headers.host}${req.url}`); //Redireciona pra HTTPS 
  else //Se a requisição já é HTTPS 
      next(); //Não precisa redirecionar, passa para os próximos middlewares que servirão com o conteúdo desejado 
});

// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

// Configura credenciais
mercadopago.configure({
    access_token: 'TEST-4314794943615377-092215-612241a943faaedd9f7b24cf89c09399-649507325'
});

// Cria um objeto de preferência
let preference = {
  items: [
    {
      title: 'Inscrição ligalol ',
      unit_price: 100,
      quantity: 1,
    }
  ]
};

mercadopago.preferences.create(preference)
.then(function(response){
// Este valor substituirá a string "<%= global.id %>" no seu HTML
  global.id = response.body.id;
}).catch(function(error){
  console.log(error);
});


// banco
mongoose.connect('mongodb+srv://ligalol:AJOvskZ0Y9LfRJBt@ligalol.g0hj2.mongodb.net/ligalol?retryWrites=true&w=majority', {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
//configurar pasta public

server.use(express.static("public"))

//configurando o bodyparser
server.use(bodyParser.urlencoded({extended:true}))



//routes
server.get('/', (req,res) =>{
   return res.sendFile(__dirname + "/views/index.html")
})
server.get('/ligalol/informacoes', (req,res) =>{
    return res.sendFile(__dirname + "/views/info.html")
 })


server.get('/ligalol/cadastro', (req,res) =>{
    return res.sendFile(__dirname + "/views/cadastro.html")
})

server.post('/ligalol/cadastro', EquipeController.store);

server.get('/ligalol/pagamento', (req,res) =>{
    return res.sendFile(__dirname + "/views/pagamento.html")
})

server.get('/ligalol/equipesapi', EquipeController.index);
server.get('/ligalol/equipes', (req,res) =>{
    return res.sendFile(__dirname + "/views/equipes.html")
})



// ligar o seervidor 
server.listen(3000)

