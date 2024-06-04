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

// --------------------------------   Animais  -------------------------------

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

app.put('/v1/petShop/updateAnimais/:id', cors(), bodyParserJson, async function (request, response, next) {

        let idAnimais = request.params.id
        let contentType = request.headers['content-type']
        let dadosAnimaisUpdate = request.body
    
        let resultDados = await controllerAnimais.setAtualizarNovoAnimal(idAnimais, dadosAnimaisUpdate, contentType)
    
        console.log(idAnimais, dadosAnimaisUpdate,resultDados);
        response.status(resultDados.status_code)
        response.json(resultDados)
 })

 app.delete('/v1/petShop/deleteAnimais/:id', cors(), bodyParserJson, async function (request, response, next) {

    let idAnimais = request.params.id

    let resultDados = await controllerAnimais.setExcluirAnimais(idAnimais)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

// --------------------------------   Raças -------------------------------

const controllerRacas = require('./Back-adocao/controller//controller_racas.js')

app.get('/v1/petShop/selectRacas', cors(), async(request,response,next) => {    //cors autoriza as chamadas acima

    let dadosRacas = await controllerRacas.getRacas()

    if(dadosRacas){
        response.json(dadosRacas),
        response.status(200)
    }else{
        console.log('aqui no app ')
        response.json({message: "Nenhum registro encontrado"})
        response.status(404)
    }
}) 

app.post('/v1/petShop/postRacas', cors(), bodyParserJson, async function (request, response,next ){


        let contentType = request.headers['content-type'];
    
        let dadosBody = request.body;
        let resultDadosNovaRaca = await controllerRacas.setInserirNovaRaca(dadosBody, contentType);
    
        response.status(resultDadosNovaRaca.status_code);
        response.json(resultDadosNovaRaca);
    
    } )

app.put('/v1/petShop/updateRacas/:id', cors(), bodyParserJson, async function (request, response, next) {

        let idRacas = request.params.id
        let contentType = request.headers['content-type']
        let dadosRacasUpdate = request.body
    
        let resultDados = await controllerRacas.setAtualizarNovaRaca(idRacas, dadosRacasUpdate, contentType)
    
        console.log(idRacas, dadosRacasUpdate,resultDados);
        response.status(resultDados.status_code)
        response.json(resultDados)
 })

 app.delete('/v1/petShop/deleteRacas/:id', cors(), bodyParserJson, async function (request, response, next) {

    let idRacas = request.params.id

    let resultDados = await controllerRacas.setExcluirRacas(idRacas)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

console.log('API funcinando e aguardando requisições')
app.listen(8080, () => {})


// --------------------------------   Cadastro   -------------------------------

const controllerCadastro = require('./Back-adocao/controller/controller_cadastro.js')

app.get('/v1/petShop/selectCadastro', cors(), async(request,response,next) => {    //cors autoriza as chamadas acima

    let dadosCadastro = await controllerCadastro.getCadastro()

    if(dadosCadastro){
        response.json(dadosCadastro),
        response.status(200)
    }else{
        console.log('aqui no app ')
        response.json({message: "Nenhum registro encontrado"})
        response.status(404)
    }
}) 

app.post('/v1/petShop/postCadastro', cors(), bodyParserJson, async function (request, response,next ){


        let contentType = request.headers['content-type'];
    
        let dadosBody = request.body;
        let resultDadosNovoCadastro = await controllerCadastro.setInserirNovoCadastro(dadosBody, contentType);
    
        response.status(resultDadosNovoCadastro.status_code);
        response.json(resultDadosNovoCadastro);
    
    } )

app.put('/v1/petShop/updateCaastro/:id', cors(), bodyParserJson, async function (request, response, next) {

        let idRacas = request.params.id
        let contentType = request.headers['content-type']
        let dadosCadastroUpdate = request.body
    
        let resultDados = await controllerCadastro.setAtualizarnovoCadastro(idCadastro, dadosCadastroUpdate, contentType)
    
        console.log(idCadastro, dadosCadastroUpdate,resultDados);
        response.status(resultDados.status_code)
        response.json(resultDados)
 })

 app.delete('/v1/petShop/deleteCadastro/:id', cors(), bodyParserJson, async function (request, response, next) {

    let idCadastro = request.params.id

    let resultDados = await controllerCadastro.setExcluirCadastro(idCadastro)

    response.status(resultDados.status_code)
    response.json(resultDados)
})


// --------------------------------   Formulario  -------------------------------


const controllerFormulario = require('./Back-adocao/controller/controller_formulario.js')

app.get('/v1/petShop/selectFormulario', cors(), async(request,response,next) => {    //cors autoriza as chamadas acima

    let dadosFormulario = await controllerFormulario.getFormulario()

    if(dadosFormulario){
        response.json(dadosFormulario),
        response.status(200)
    }else{
        console.log('aqui no app ')
        response.json({message: "Nenhum registro encontrado"})
        response.status(404)
    }
}) 

app.post('/v1/petShop/postFormulario', cors(), bodyParserJson, async function (request, response,next ){


        let contentType = request.headers['content-type'];
    
        let dadosBody = request.body;
        let resultDadosNovoFormulario = await controllerFormulario.setInserirNovoFormulario(dadosBody, contentType);
    
        response.status(resultDadosNovoFormulario.status_code);
        response.json(resultDadosNovoFormulario);
    
    } )

app.put('/v1/petShop/updateFormulario/:id', cors(), bodyParserJson, async function (request, response, next) {

        let idFormulario = request.params.id
        let contentType = request.headers['content-type']
        let dadosFormularioUpdate = request.body
    
        let resultDados = await controllerFormulario.setAtualizarnovoFormulario(idFormulario, dadosFormularioUpdate, contentType)
    
        console.log(idFormulario, dadosFormularioUpdate,resultDados);
        response.status(resultDados.status_code)
        response.json(resultDados)
 })

 app.delete('/v1/petShop/deleteFormulario/:id', cors(), bodyParserJson, async function (request, response, next) {

    let idFormulario = request.params.id

    let resultDados = await controllerFormulario.setExcluirFormulario(idFormulario)

    response.status(resultDados.status_code)
    response.json(resultDados)
})