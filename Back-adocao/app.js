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

const controllerAnimais = require('./controller/controller_animais.js')

app.get('/v1/petShop/selectAnimais', cors(), async(request,response,next) => {    //cors autoriza as chamadas acima,

    let dadosAnimais = await controllerAnimais.getAnimais()

    if(dadosAnimais){
        response.json(dadosAnimais),
        response.status(200)
    }else{
        response.json({message: "Nenhum registro encontrado"})
        response.status(404)
    }
}) 

console.log('API funcinando e aguardando requisições')
