//global vars
var jogadoresTime =[]

//elementos do html
const inputJogador = document.querySelector('input[name="jogador"]');
const inputJogadores = document.querySelector('input[name="players"]');
const botaoAdicionar = document.querySelector('#addplayer');
const containerPlayers = document.querySelector('.listaParticipantes');
const botaoEnviar = document.querySelector('button.cadastrar')
const inputEquipeName = document.querySelector('input[name="equipeName"]');
const inputemail = document.querySelector('input[name="email"]');
const inputTelefone = document.querySelector('input[name="telefone"]');
const form = document.querySelector('input[name="formulario1"]');
const alertaName =document.querySelector(".alertaName");
const alertaEmail =document.querySelector(".alertaEmail");
const alertaNumero =document.querySelector(".alertaNumero");
const alertaPlayer =document.querySelector(".alertaPlayer");


//pega section do loadscrean
var divLoadScreen = document.querySelector('.loadscreen')



//troca o display do load screen
function loadScreen(display){
    divLoadScreen.style.display=display
}


hiddenLista()

//oculta a lista caso não tenha menbro na equipe
function hiddenLista(){
    if(jogadoresTime.length==0){
        containerPlayers.style.display='none';
    }else{
        containerPlayers.style.display='block';
    }
}



//imprime a lista de players na tela
function imprimirPlayer(){
    for(let jogador in jogadoresTime){
        const liElement = document. createElement('li');
        const remover = document.createElement('span');
        remover.setAttribute('data-id', jogador)
        remover.addEventListener('click',removePlayer)
        remover.innerHTML="X"
        liElement.innerHTML= (Number(jogador)+1) +". "+ jogadoresTime[jogador]
        liElement.appendChild(remover)
        containerPlayers.appendChild(liElement)
    }
}
function removePlayer(){
    idPlayer = event.target.dataset.id
    console.log(idPlayer)
    jogadoresTime.splice(idPlayer, 1)
    containerPlayers.innerHTML=''
    inputJogadores.value=jogadoresTime
    imprimirPlayer()    
    hiddenLista()
}
botaoAdicionar.onclick= function validaPlayer(){
    let passa=true
    for(jogador of jogadoresTime){
        if(inputJogador.value===jogador){
            passa=false
        }
    }
    if(passa){
        addPlayers()
    }else{
        alertaPlayer.innerHTML="Jogador Já Adicionado!"
    }
}


function addPlayers(){
    let jogador = inputJogador.value
    if(jogador==""){
        //alerta
        alertaPlayer.innerHTML='Adicione um Jogador'
    }else if(jogador.length<3 || jogador.length>16){
        //alerta
        alertaPlayer.innerHTML='Nickname Inválido'
    }else if(jogadoresTime.length<5){
        jogadoresTime.push(jogador)
        containerPlayers.innerHTML=''
        imprimirPlayer()
        inputJogador.value=''
        inputJogadores.value=jogadoresTime
        alertaPlayer.innerHTML=""
    }if(jogadoresTime.length==5){
        // alerta
        alertaPlayer.innerHTML='Atingiu o Numero Máximo de Players'
    }
    hiddenLista()
}
inputJogador.onblur=()=>{
    console.log("ok")
    if(inputJogador.value.length==0){
        alertaPlayer.innerHTML=""
    }
}





//faz validação dos inputs
var inputs 
function verifyCampos(equipes){
    inputs = true
    alertaPlayer.innerHTML=""
    alertaName.innerHTML=""
    alertaNumero.innerHTML=""
    alertaEmail.innerHTML=""
    if(inputEquipeName.value.length<2){
        inputs=false
        console.log("error equipe")
        alertaName.innerHTML="Nome da equipe muito curto"
    }
    if(inputemail.value.length<6){
        inputs=false
        console.log("error email")
        alertaEmail.innerHTML="Digite um e-mail válido"

    }
    if(inputTelefone.value.length<9){
        inputs=false
        console.log("error telefone")
        alertaNumero.innerHTML="Telefone Inválido"

    }
    if(jogadoresTime.length<5){
        inputs = false;
        console.log('erro de players')
        alertaPlayer.innerHTML="Mínimo 5 jogadores por equipe!"

    }
    loadScreen("none")
}

var cont
function verify(equipes){
    cont = false
    // VERIFICA SE JA EXISTE O NOME DA EQUIPE
    //SE SIM CONT == TRUE
    for(let equipe of equipes){
        if (equipe.equipeName===inputEquipeName.value){
                cont= true
        }
    }
    if(cont===true){
        console.log('nome já existe')
        alertaName.innerHTML="Esta Equipe Já Existe"
    }
                    // document.formulario1.submit()

} 

botaoEnviar.onclick = function requisicao(){
    var xhr = new XMLHttpRequest();
    xhr['open']('GET','https://gameizi.com.br/ligalol/equipesapi');
    xhr.send();
    xhr.onprogress = function (){
        loadScreen("flex")
    }
    xhr.onload = function(){
        if(xhr.status!=200){
            console.error("falha a conectar ao banco de dados")
            loadScreen("flex")
        }else{
            var data = JSON.parse(xhr.response)
            var equipes = data;
            verifyCampos(equipes)
            if (inputs){
                verify(equipes);
            }if(inputs && cont===false){
                loadScreen('flex');
                console.warn("tudo ok!")
                document.formulario1.submit()

            }
            // loadScreen('none');
            
        }
    }
}