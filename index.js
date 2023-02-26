var port = 15010; //por facilidade a porta ficara aq em cima

const express = require('express');//express p/ quando for fazer requisao criar rotas,
// express ta dentro da variavel express, ex: no php pegavamos depois do ?
const bodyParser = require('body-parser');//quando chega  a requisicao o body parser pega o texto json e transforma em objeto
const app = express();//puxo as funcoes da variavel para o app
const path = require('path');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());//quando vem alguma coisa p/ o corpo, requisicao. Ele vai usar o bodyParser para Json

var cadastro ={
	vendedor:[
    	{
        	id:1,
        	nome: "Vanessa Mendes Fontura",
         	almoco: "12:00 - 13:00",
        	Whatsapp:"(43)99999-9999",
        	email: "vanessa@gmail.com",
        	ferias: "nao"
		},
    	{
        	id:2,
        	nome: "Ademir Medeiros dos Santos",
        	almoco:"13:00 - 14:00",
        	Whatsapp:"(43)99999-9999",
       		email: "ademir@gmail.com",
        	ferias: "nao"
        
		},
    	{
        	id:3,
        	nome: "Rafaela Lima de Souza",
        	almoco:"11:30 - 12:30",
            Whatsapp:"(43)99999-9999",
        	email: "rafaela@gmail.com",
        	ferias: "nao"
        
		},
  		{
        	id:4,
        	nome: "Joao Pires",
        	almoco:"12:30 - 13:30",
            Whatsapp:"(43)99999-9999",
        	email: "joao@gmail.com",
        	ferias: "nao"
        	
		},
    ]
};    	  	
// Show all sellers, // Mostrar todos os vendedores
 
// GET ==== PEGAR AS COISAS ============


//requisicao get é quando clico no site e aperto enter
//quando a requis. for /vendedores vou ter o corpo da req e a resposta
app.get('/vendedores', (req, res) => {//essa funcao retorna alg, poderia simplesmemnte escrever algo
	
	//pega o objeto vendedor e transforma em texto para responder p/ usuario
	res.json(cadastro);
});

//Quando a requis. for / ele vai pega so a resposta do sistema
//pega texto e transforma em objeto

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/frente.html'));
	//res.json({nome:"Sistema de vendedores",funcao:"Cadastrar vendedores"});
});//esse json vem do body-parser, q pega o conteudo da requisicao e transforma em json, e pegar o conteudo em json e transforma em texto


//list one seller

//aq é quando digito o suportelab e pesquiso .../15010/vendedor/5 por exemplo, 5 é o id
app.get('/vendedor/:id', (req,res) =>{//requisicao vem com o id
	if(isNaN(req.params.id)){//se n e num da um erro 404, agora se e num vo tratar ele(o id)
    	res.sendStatus(404);
    }else{//parseInt= transforma um texto e inteiro(numero), pois lembrando q ele vem em json(texto) e meu id eh um numero
    	var id = parseInt(req.params.id);//pego a requisicao, o param e o id e vou transformar em id
		var oneMember = cadastro.vendedor.find(m => m.id == id);//procura pelo id do meu objeto vendedores, se id for igual ao q veio escrito
    	//find eh funcao do array objeto q procura o id
    	res.sendStatus = 200;//resposta de 200 q eh ok
    	res.json(oneMember);//transforma os dados do objeto da varia.Onemember em texto em formato json e responde na tela 
		
		//ou seja, ex: vi que tenho o id 5, como veio em texto json transformei ele em numero, retornei q deu certo status 200 e agora volto a transformar em json pra devolver pro sistema
      }
});
		


//============ POST = ENVIAR AS COISAS ===============

//a requisicao que vai chegar tem que vir com os dados
//create a new seller
app.post('/vendedor', (req,res) => {//nao consigo enviar vendedor pelo navegdor, uso o xml http request, q tem a funcao put pra enviar os dados
	//a req que vai chegar deve vir com o corpo dos dados req.body
	var {id, nome, almoco,Whatsapp,email,ferias} = req.body;//tudo que eu mandar como variavel vai para o corpo da requisicao req.body
	console.log(id, nome, almoco,Whatsapp,email,ferias);

	cadastro.vendedor.push({//empurrando, inserindo um novo elemento I(push)
    	id,
    	nome,
    	almoco,
    	Whatsapp,	
    	email,
    	ferias
    });
	res.sendStatus(200);//tudo ok
});

//edit a seller
app.put('/vendedor/:id', (req, res) => {
	if(isNaN(req.params.id)){//verifica se nao e um num
	    res.sendStatus(400);
    }else{
    	//se e num, entao transforma em numero proque veio em texto 
    	var id = parseInt(req.params.id);
    	//procura se no objeto cadastro existe o id digitado
    	var vendedor = cadastro.vendedor.find(m => m.id === id);
    	//vai editar se existi o numero
    	if(vendedor !=undefined){
        	//pega os valores
        	var {id,nome,almoco,Whatsapp,email,ferias} = req.body;
        }
    	//se for indefinido altera todos os dados:
		//se for diferente de nao ter nada
    	if(vendedor.id !=undefined){
        	vendedor.id = id;
        }
    	if(vendedor.nome !=undefined){
        	vendedor.nome = nome;
        }
    	if(vendedor.almoco !=undefined){
        	vendedor.almoco = almoco;
        }
    	if(vendedor.Whatsapp !=undefined){
        	vendedor.Whatsapp = Whatsapp;
        }
    	if(vendedor.email !=undefined){
        	vendedor.email = email;
        }
    	if(vendedor.ferias !=undefined){
        	vendedor.ferias = ferias;
        }
    
		res.sendStatus(200);
    }
            
});

//Delete a seller

//coloco qual o vendedor e qual o id que vou deletar, deve ser um numero
app.delete('/vendedor/:id', (req, res) => {
	//verifica se nao eh um numero
	if(isNaN(req.params.id)){
		res.sendStatus(400);//nao eh num, mostra respost c/ erro 
	}else{//pega o valor que veio do numero, e faz o parseInt 
		var id = parseInt(req.params.id);
		//vai analisar/ procurar pelo findIndex a identificao se tem o vendedor
		var index = cadastro.vendedor.findIndex(m => m.id === id);
		//se tiver faz o splice(emendar) do indice/ vetor do objeto e vai remover uma posicao e depois vai responder com o status 200
		cadastro.vendedor.splice(index,1);
		res.sendStatus(200);
	}
});

app.listen(port, () => {
	console.log(`Server connected to port: ${port}`);
});