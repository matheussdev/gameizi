// global vars
var equipes;

var container = document.querySelector('.container')
var loading = document.querySelector('.loading')

function listarEquipes(equipes){
    //cria a dive para cada equipe
    let campoEquipe = document.createElement('div');
    campoEquipe.setAttribute('class', 'titulos')
    //cria a dive de nome de equipe
    let equipeName = document.createElement('div');
    equipeName.innerHTML="EQUIPES"
    //cria a dive de pagamento
    let divPagamento = document.createElement('div');
    divPagamento.setAttribute('class','pagamento')
    divPagamento.innerHTML="PAGAMENTO"
    campoEquipe.appendChild(equipeName);
    campoEquipe.appendChild(divPagamento);
    container.appendChild(campoEquipe)
    for(let equipe in equipes){
        console.log(equipes[equipe])
        //cria a dive para cada equipe
        let campoEquipe = document.createElement('div');
        campoEquipe.setAttribute('class', 'equipes')
        //cria a dive de nome de equipe
        let equipeName = document.createElement('div');
        equipeName.innerHTML=(Number(equipe)+1)+". " + equipes[equipe].equipeName
        //cria a dive de pagamento
        let divPagamento = document.createElement('div');
        divPagamento.setAttribute('class','pagamento')
        //se o pagamento for true
        if(equipes[equipe].pagamento==true){
            divPagamento.innerHTML='<img src="../assets/verified.svg" alt="" width="25px"></img>'
        }else{
            divPagamento.innerHTML='pendente'
        }

        // renderização
        campoEquipe.appendChild(equipeName);
        campoEquipe.appendChild(divPagamento);
        container.appendChild(campoEquipe)
    }

}
function popup(display){
    loading.style.display=display
}


var xhr = new XMLHttpRequest();
xhr['open']('GET','https://gameizi.com.br/ligalol/equipesapi');
xhr.send();
xhr.onprogress = function (){
   popup("block")
}
xhr.onload = function(){
    if(xhr.status!=200){
        console.error("falha a conectar ao banco de dados")
        popup("block")
    }else{
        var data = JSON.parse(xhr.response)
        equipes = data;
        popup("none")
        listarEquipes(equipes)
    }
}