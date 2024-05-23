const animaisDAO = require('../model/DAO/animais')

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

    }
}

const setInserirNovoAnimal = async (dadosAnimais, contentType) => {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {
            let statusValidated = false
            let novoAnimalJSON = {}

            if (dadosAnimais.nome == '' || dadosAnimais.nome == undefined || dadosAnimais.nome == null || dadosAnimais.nome.length > 100 ||
                dadosAnimais.raca == '' || dadosAnimais.raca == undefined || dadosAnimais.raca.length > 100 ||
                dadosAnimais.idade == '' || dadosAnimais.idade == undefined || dadosAnimais.idade == null ||
                dadosAnimais.setor == '' || dadosAnimais.setor == undefined || dadosAnimais.setor == null || dadosAnimais.setor.length != 100

            ) {
                return message.ERROR_REQUIRED_FIELDS//400

            } else {

                //Validação para verificar se a data de relancameno tem um conteúdo válido

                if (dadosAnimais.raca != '' &&
                    dadosAnimais.raca != null &&
                    dadosAnimais.raca != undefined &&
                    dadosAnimais.setor != '' &&
                    dadosAnimais.setor != null &&
                    dadosAnimais.setor != undefined

                ) {
                    //Verifica a qtde de caracter
                    if (dadosAnimais.raca.length != 100) {
                        return message.ERROR_REQUIRED_FIELDS//400
                    } else {
                        statusValidated = true //validação para liberar a inserção dos dados no DAO
                    }

                } else {
                    statusValidated = true  //validação para liberar a inserção dos dados no DAO
                }

                //se a variável for verdadeira, podemos encaminhar os dados para o DAO
                if (statusValidated) {

                    //encaminha os dados para o DAO inserir
                    let novoAnimal = await animaisDAO.insertAnimais(dadosAnimais)

                    if (novoAnimal) {

                        let id = await atoresDAO.selectId()

                        //Cria o JSON de retorno com informações de requisição e os dados novos
                        novoAnimalJSON.status = message.SUCCESS_CREATED_ITEM.status
                        novoAnimalJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        novoAnimalJSON.message = message.SUCCESS_CREATED_ITEM.message
                        novoAnimalJSON.id = parseInt(id)
                        novoAnimalJSON.animais = dadosAnimais

                        return novoAnimalJSON //201

                    } else {
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

module.export = {
    getAnimais,
    setInserirNovoAnimal
}