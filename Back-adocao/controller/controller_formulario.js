const formularioDAO = require('../model/DAO/formulario')

const message = require('../modulo/config')

const getFormulario = async function () {
    try {

        let formularioJson = {}
        let dadosFormulario = await formularioDAO.selectFormulario()

        if (formularioDAO) {

            if (dadosFormulario.length > 0) {
                formularioJson.informacoes = dadosFormulario
                formularioJson.quantidade = dadosFormulario.length
                formularioJson.status_code = 200

                return formularioJson
            } else {
                console.log('Algo deu errado no processamento de dodos')
            }
        }

    } catch (error) {
        console.log(error)
    }
}

const setInserirNovoFormulario = async (dadosFormulario, contentType) => {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {
            let statusValidated = false
            let novaformularioJson = {}

            if (dadosFormulario.nome_usuario == ''                    ||dadosFormulario.nome_usuario == undefined ||
               dadosFormulario.nome_usuario == null                   ||dadosFormulario.nome_usuario.length > 100 ||
               dadosFormulario.raca_de_preferencia == ''      ||dadosFormulario.raca_de_preferencia == undefined ||
               dadosFormulario.raca_de_preferencia == null    ||dadosFormulario.raca_de_preferencia.length > 100 ||
               dadosFormulario.porte  == ''                   ||dadosFormulario.porte  == undefined ||
               dadosFormulario.porte  == null                 ||dadosFormulario.porte.length > 25||
               dadosFormulario.idade_minima == ''             ||dadosFormulario.idade_minima == undefined ||
               dadosFormulario.idade_minima == null           ||dadosFormulario.idade_minima.length > 2||
               dadosFormulario.resgatado_ou_nao == ''         ||dadosFormulario.resgatado_ou_nao == undefined ||
               dadosFormulario.resgatado_ou_nao == null       ||dadosFormulario.resgatado_ou_nao.length > 3
            ) {
                console.log("campos errados",dadosFormulario);
                return message.ERROR_REQUIRED_FIELDS//400

            } else {

                //Validação para verificar se nome_usuario, porte, idade minima e raca_de_preferencia tem um conteúdo válido

                if (dadosFormulario.nome_usuario != '' &&
                   dadosFormulario.nome_usuario != null &&
                   dadosFormulario.nome_usuario != undefined &&
                   dadosFormulario.porte  != '' &&
                   dadosFormulario.porte  != null &&
                   dadosFormulario.porte  != undefined &&
                   dadosFormulario.raca_de_preferencia != undefined &&
                   dadosFormulario.raca_de_preferencia != '' &&
                   dadosFormulario.raca_de_preferencia != null &&
                   dadosFormulario.idade_minima  != '' &&
                   dadosFormulario.idade_minima  != null &&
                   dadosFormulario.idade_minima  != undefined 

                ) {
                    //Verifica a qtde de caracter
                    if (dadosFormulario.nome_usuario.length > 50 && isNaN(dadosFormulario.porte )) {
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
                    let novoFormulario = await formularioDAO.insertFormulario(dadosFormulario)

                    if (novoFormulario) {

                        let id = await formularioDAO.selectLastId()

                        //Cria o JSON de retorno com informações de requisição e os dados novos
                        novaformularioJson.status = message.SUCESS_CREATED_ITEM.status
                        novaformularioJson.status_code = message.SUCESS_CREATED_ITEM.status_code
                        novaformularioJson.message = message.SUCESS_CREATED_ITEM.message
                        novaformularioJson.id = id[0].id
                        novaformularioJson.informacoes =dadosFormulario


                        console.log(novoFormulario,dadosFormulario, id[0].id)
                        return novaformularioJson //201

                    } else {
                        console.log(novoFormulario,dadosFormulario);
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

const setAtualizarnovoFormulario = async function (idFormulario,dadosFormularioUpdate, content) {
    if (String(content).toLowerCase() == 'application/json') {

        let updateformularioJson = {}
        try {
            const validaId = await formularioDAO.selectRacasById(idFormulario)

            if (validaId) {
                const formularioAtualizado = await formularioDAO.updateRacas(idRacas,dadosFormularioUpdate)

                if (formularioAtualizado) {
                    updateformularioJson.id = validaId
                    updateformularioJson.status = message.SUCESS_UPTADE_ITEM.status
                    updateformularioJson.status_code = message.SUCESS_UPTADE_ITEM.status_code
                    updateformularioJson.message = message.SUCESS_UPTADE_ITEM.message
                    updateformularioJson.nome_usuario = formularioAtualizadoAtualizado

                    console.log(updateformularioJson);

                    return updateformularioJson
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

const setExcluirFormulario = async function (id) {
    let deleteformularioJson = {}

    try {
        const validaId = await formularioDAO.selectFormularioById(id)

        if (validaId) {
            const ApagarFormulario = await formularioDAO.deleteFormulario(id)

            if (ApagarFormulario) {
                deleteformularioJson.status = message.SUCESS_DELETE_ITEM.status
                deleteformularioJson.status_code = message.SUCESS_DELETE_ITEM.status_code
                deleteformularioJson.message = message.SUCESS_DELETE_ITEM.message
                deleteformularioJson.id = validaId

                return deleteformularioJson
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
    getFormulario,
    setAtualizarnovoFormulario,
    setInserirNovoFormulario,
    setExcluirFormulario
}