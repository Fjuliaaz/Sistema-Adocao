const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
//simplificar a chamada das dependencias baixadas, para subir no servidor


//para criar os andpoints
const app = express()

const bodyParserJson =bodyParser.json()

app.use(bodyParserJson)

app.use((request,response,next) => {
    response.header('Access-Control-Allow-Origin', '*')  //definindo as origens permitidas para realizar o acesso no back
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE') //metodos permitidos para uso 

    app.use(cors())

    next() //continuar executando api, esperando as requisições
})

const controllerAnimais = require('./Back-adocao/controller/controller_animais.js')

app.get('/v1/petShop/selectAnimais', cors(), async(request,response,next) => {    //cors autoriza as chamadas acima,

    let dadosAnimais = await controllerAnimais.getAnimais()

    if(dadosAnimais){
        response.json(dadosAnimais),
        response.status(200)
    }else{
        console.log('fonseca estupida')
        response.json({message: "Nenhum registro encontrado"})
        response.status(404)
    }
}) 

app.post('/v1/petShop/postAnimais', cors(), bodyParserJson, async function (request, response,next ){


        let contentType = request.headers['content-type'];
    
        let dadosBody = request.body;
        let resultDadosNovoAnimal = await controllerAnimais.setInserirNovoAnimal(dadosBody, contentType);
    
        response.status(resultDadosNovoAnimal.status_code);
        response.json(resultDadosNovoAnimal);
    
    } )

console.log('API funcinando e aguardando requisições')
app.listen(8080, () => {})
