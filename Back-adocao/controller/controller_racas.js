const racasDAO = require('../model/DAO/racas')

const message = require('../modulo/config')

const getRacas = async function () {
    try {

        let racasJson = {}
        let dadosRacas = await racasDAO.selectRacas()

        if (racasDAO) {

            if (dadosRacas.length > 0) {
                racasJson.nomes = dadosRacas
                racasJson.quantexpectativa_de_vida = dadosRacas.length
                racasJson.status_code = 200

                return racasJson
            } else {
                console.log('Algo deu errado no processamento de dodos')
            }
        }

    } catch (error) {
        console.log(error)
    }
}

const setInserirNovaRaca = async (dadosRacas, contentType) => {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {
            let statusValidated = false
            let novaRacaJSON = {}

            if (dadosRacas.nome == '' || dadosRacas.nome == undefined ||
                dadosRacas.nome == null || dadosRacas.nome.length > 100 ||
                dadosRacas.descricao == '' || dadosRacas.descricao == undefined ||
                dadosRacas.descricao == null || dadosRacas.descricao.length > 250 ||
                dadosRacas.expectativa_de_vida == '' || dadosRacas.expectativa_de_vida == undefined ||
                dadosRacas.expectativa_de_vida == null || dadosRacas.expectativa_de_vida.length > 100||
                dadosRacas.cor == '' || dadosRacas.cor == undefined ||
                dadosRacas.cor == null || dadosRacas.cor.length > 100 ||
                dadosRacas.popularidade == '' || dadosRacas.popularidade == undefined ||
                dadosRacas.popularidade == null || dadosRacas.popularidade.length > 100 ||
                dadosRacas.problemas_de_saude_comuns == '' || dadosRacas.problemas_de_saude_comuns == undefined ||
                dadosRacas.problemas_de_saude_comuns == null || dadosRacas.problemas_de_saude_comuns.length > 100
            ) {
                console.log("campos errados", dadosRacas);
                return message.ERROR_REQUIRED_FIELDS//400

            } else {

                //Validação para verificar se nome e expectativa de vida tem um conteúdo válido

                if (dadosRacas.nome != '' &&
                    dadosRacas.nome != null &&
                    dadosRacas.nome != undefined &&
                    dadosRacas.expectativa_de_vida != '' &&
                    dadosRacas.expectativa_de_vida != null &&
                    dadosRacas.expectativa_de_vida != undefined

                ) {
                    //Verifica a qtde de caracter
                    if (dadosRacas.nome.length > 50 && isNaN(dadosRacas.expectativa_de_vida)) {
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
                    let novaRaca = await racasDAO.insertRaca(dadosRacas)

                    if (novaRaca) {

                        let id = await racasDAO.selectLastId()

                        //Cria o JSON de retorno com informações de requisição e os dados novos
                        novaRacaJSON.status = message.SUCESS_CREATED_ITEM.status
                        novaRacaJSON.status_code = message.SUCESS_CREATED_ITEM.status_code
                        novaRacaJSON.message = message.SUCESS_CREATED_ITEM.message
                        novaRacaJSON.id = id[0].id
                        novaRacaJSON.animais = dadosRacas


                        console.log(novaRaca, dadosRacas, id[0].id)
                        return novaRacaJSON //201

                    } else {
                        console.log(novaRaca, dadosRacas);
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

const setAtualizarnovaRaca = async function (idRacas, dadosRacasUpdate, content) {
    if (String(content).toLowerCase() == 'application/json') {

        let updateRacasJson = {}
        try {
            const validaId = await racasDAO.selectRacasById(idRacas)

            if (validaId) {
                const racaAtualizado = await racasDAO.updateRacas(idRacas, dadosRacasUpdate)

                if (racaAtualizado) {
                    updateRacasJson.id = validaId
                    updateRacasJson.status = message.SUCESS_UPTADE_ITEM.status
                    updateRacasJson.status_code = message.SUCESS_UPTADE_ITEM.status_code
                    updateRacasJson.message = message.SUCESS_UPTADE_ITEM.message
                    updateRacasJson.nome = racaAtualizado

                    console.log(updateRacasJson);

                    return updateRacasJson
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

const setExcluirRacas = async function (id) {
    let deleteRacasJson = {}

    try {
        const validaId = await racasDAO.selectRacasById(id)

        if (validaId) {
            const ApagarRacas = await racasDAO.deleteRacas(id)

            if (ApagarRacas) {
                deleteRacasJson.status = message.SUCESS_DELETE_ITEM.status
                deleteRacasJson.status_code = message.SUCESS_DELETE_ITEM.status_code
                deleteRacasJson.message = message.SUCESS_DELETE_ITEM.message
                deleteRacasJson.id = validaId

                return deleteRacasJson
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
    getRacas,
    setAtualizarnovaRaca,
    setInserirNovaRaca,
    setExcluirRacas
}