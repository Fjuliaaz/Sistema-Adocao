const animaisDAO = require('../model/DAO/animais')

const message = require('../modulo/config')

const getAnimais = async function () {
    try {

        let animaisJson = {}
        let dadosAnimais = await animaisDAO.selectAnimais()

        if (dadosAnimais) {

            if (dadosAnimais.length > 0) {
                animaisJson.animais = dadosAnimais
                animaisJson.quantidade = dadosAnimais.length
                animaisJson.status_code = 200

                return animaisJson
            } else {
                console.log('Algo deu errado no processamento de dodos')
            }
        }

    } catch (error) {
        console.log(error)
    }
}

const setInserirNovoAnimal = async (dadosAnimais, contentType) => {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {
            let statusValidated = false
            let novoAnimalJSON = {}

            if (dadosAnimais.raca == '' || dadosAnimais.raca == undefined || dadosAnimais.raca == null || dadosAnimais.raca.length > 100 ||
                dadosAnimais.setor == '' || dadosAnimais.setor == undefined || dadosAnimais.setor == null || dadosAnimais.setor.length > 20
            ) {
                console.log(dadosAnimais);
                return message.ERROR_REQUIRED_FIELDS//400

            } else {

                //Validação para verificar se nome e idade tem um conteúdo válido

                if (dadosAnimais.nome != '' &&
                    dadosAnimais.nome != null &&
                    dadosAnimais.nome != undefined &&
                    dadosAnimais.idade != '' &&
                    dadosAnimais.idade != null &&
                    dadosAnimais.idade != undefined

                ) {
                    //Verifica a qtde de caracter
                    if (dadosAnimais.nome.length > 50 && isNaN(dadosAnimais.idade)) {
                        console.log("olá");
                        return message.ERROR_REQUIRED_FIELDS//400
                    } else {
                        statusValidated = true //validação para liberar a inserção dos dados no DAO
                    }

                } else {
                    statusValidated = true  
                }

                //se a variável for verdadeira, podemos encaminhar os dados para o DAO
                if (statusValidated) {

                    //encaminha os dados para o DAO inserir
                    let novoAnimal = await animaisDAO.insertAnimais(dadosAnimais)

                    if (novoAnimal) {

                        let id = await animaisDAO.selectLastId()

                        //Cria o JSON de retorno com informações de requisição e os dados novos
                        novoAnimalJSON.status = message.SUCESS_CREATED_ITEM.status
                        novoAnimalJSON.status_code = message.SUCESS_CREATED_ITEM.status_code
                        novoAnimalJSON.message = message.SUCESS_CREATED_ITEM.message
                        novoAnimalJSON.id = id[0].id
                        novoAnimalJSON.animais = dadosAnimais


                        console.log(novoAnimal, dadosAnimais, id[0].id)
                        return novoAnimalJSON //201

                    } else {
                        console.log(novoAnimal, dadosAnimais);
                        return message.ERROR_INTERNAL_SERVER_DB //500
                    }
                }

            }

        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }

    } catch (error) {
        console.log("Erro na controller:", error); // Adiciona log para verificar erros na controller
        return message.ERROR_INTERNAL_SERVER //500 erro na camada da controller
    }

}

const setAtualizarNovoAnimal = async function (idAnimais, dadosAnimaisUpdate, content) {
    if (String(content).toLowerCase() == 'application/json') {
        
        let updateAnimaisJson = {}
        try {
            const validaId = await animaisDAO.selectAnimaisById(idAnimais)
            
            if (validaId) {
                const AnimalAtualizado = await animaisDAO.updateAnimais(idAnimais, dadosAnimaisUpdate)
                
                if (AnimalAtualizado) {
                    updateAnimaisJson.id = validaId
                    updateAnimaisJson.status = message.SUCESS_UPTADE_ITEM.status
                    updateAnimaisJson.status_code = message.SUCESS_UPTADE_ITEM.status_code
                    updateAnimaisJson.message = message.SUCESS_UPTADE_ITEM.message
                    updateAnimaisJson.animais = AnimalAtualizado

                    console.log(updateAnimaisJson);

                    return updateAnimaisJson
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            } else {
                return message.ERROR_NOT_FOUND
            }

        } catch (error) {
            return message.ERROR_UPDATED_ITEM
        }
    } else {
        return message.ERROR_CONTENT_TYPE
    }
}

const setExcluirAnimais = async function (id) {
    let deleteAnimaisJson ={}
    
    try {
        const validaId = await animaisDAO.selectAnimaisById(id)
        
        if (validaId) {
            const apagarAnimais = await animaisDAO.deleteAnimais(id)
            
            if (apagarAnimais) {
                deleteAnimaisJson.status = message.SUCESS_DELETE_ITEM.status
                deleteAnimaisJson.status_code = message.SUCESS_DELETE_ITEM.status_code
                deleteAnimaisJson.message = message.SUCESS_DELETE_ITEM.message
                deleteAnimaisJson.id = validaId

                return deleteAnimaisJson
            } else {
                return message.ERROR_INTERNAL_SERVER_DB
            }
        } else {
            return message.ERROR_NOT_FOUND
        }

    } catch (error) {
        return message.ERROR_UPDATED_ITEM
    }
}

module.exports = {
    getAnimais,
    setInserirNovoAnimal,
    setAtualizarNovoAnimal,
    setExcluirAnimais
}