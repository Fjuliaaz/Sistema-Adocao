const cadastroDAO = require('../model/DAO/cadastro')

const message = require('../modulo/config')

const getCadastro = async function () {
    try {

        let cadastroJson = {}
        let dadosCadastro = await cadastroDAO.selectCadastro()

        if (cadastroDAO) {

            if (dadosCadastro.length > 0) {
                cadastroJson.informacoes = dadosCadastro
                cadastroJson.quantidade = dadosCadastro.length
                cadastroJson.status_code = 200

                return cadastroJson
            } else {
                console.log('Algo deu errado no processamento de dodos')
            }
        }

    } catch (error) {
        console.log(error)
    }
}

const setInserirNovoCadastro = async (dadosCadastro, contentType) => {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {
            let statusValidated = false
            let novaCadastroJSON = {}

            if (dadosCadastro.nome == '' ||dadosCadastro.nome == undefined ||
               dadosCadastro.nome == null     ||dadosCadastro.nome.length > 100 ||
               dadosCadastro.email == ''      ||dadosCadastro.email == undefined ||
               dadosCadastro.email == null    ||dadosCadastro.email.length > 100 ||
               dadosCadastro.endereco == ''   ||dadosCadastro.endereco == undefined ||
               dadosCadastro.endereco == null ||dadosCadastro.endereco.length > 100||
               dadosCadastro.telefone == ''   ||dadosCadastro.telefone == undefined ||
               dadosCadastro.telefone == null ||dadosCadastro.telefone.length > 20||
               dadosCadastro.cpf == ''        ||dadosCadastro.cpf == undefined ||
               dadosCadastro.cpf == null      ||dadosCadastro.cpf.length > 15  ||
               dadosCadastro.rg == ''         ||dadosCadastro.rg == undefined ||
               dadosCadastro.rg == null       ||dadosCadastro.rg.length > 15
            ) {
                console.log("campos errados",dadosCadastro);
                return message.ERROR_REQUIRED_FIELDS//400

            } else {

                //Validação para verificar se nome endereço e email tem um conteúdo válido

                if (dadosCadastro.nome != '' &&
                   dadosCadastro.nome != null &&
                   dadosCadastro.nome != undefined &&
                   dadosCadastro.endereco != '' &&
                   dadosCadastro.endereco != null &&
                   dadosCadastro.endereco != undefined &&
                   dadosCadastro.email != undefined &&
                   dadosCadastro.email != '' &&
                   dadosCadastro.email != null 

                ) {
                    //Verifica a qtde de caracter
                    if (dadosCadastro.nome.length > 50 && isNaN(dadosCadastro.endereco)) {
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
                    let novoCadastro = await cadastroDAO.insertCadastro(dadosCadastro)

                    if (novoCadastro) {

                        let id = await cadastroDAO.selectLastId()

                        //Cria o JSON de retorno com informações de requisição e os dados novos
                        novaCadastroJSON.status = message.SUCESS_CREATED_ITEM.status
                        novaCadastroJSON.status_code = message.SUCESS_CREATED_ITEM.status_code
                        novaCadastroJSON.message = message.SUCESS_CREATED_ITEM.message
                        novaCadastroJSON.id = id[0].id
                        novaCadastroJSON.animais =dadosCadastro


                        console.log(novoCadastro,dadosCadastro, id[0].id)
                        return novaCadastroJSON //201

                    } else {
                        console.log(novoCadastro,dadosCadastro);
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

const setAtualizarnovoCadastro = async function (idCadastro,dadosCadastroUpdate, content) {
    if (String(content).toLowerCase() == 'application/json') {

        let updatecadastroJson = {}
        try {
            const validaId = await cadastroDAO.selectRacasById(idCadastro)

            if (validaId) {
                const cadastoAtualizado = await racasDAO.updateRacas(idRacas,dadosCadastroUpdate)

                if (cadastoAtualizado) {
                    updatecadastroJson.id = validaId
                    updatecadastroJson.status = message.SUCESS_UPTADE_ITEM.status
                    updatecadastroJson.status_code = message.SUCESS_UPTADE_ITEM.status_code
                    updatecadastroJson.message = message.SUCESS_UPTADE_ITEM.message
                    updatecadastroJson.nome = cadastoAtualizado

                    console.log(updatecadastroJson);

                    return updatecadastroJson
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

const setExcluirCadastro = async function (id) {
    let deletecadastroJson = {}

    try {
        const validaId = await cadastroDAO.selectCadastroById(id)

        if (validaId) {
            const ApagarCadastro = await cadastroDAO.deleteCadastro(id)

            if (ApagarCadastro) {
                deletecadastroJson.status = message.SUCESS_DELETE_ITEM.status
                deletecadastroJson.status_code = message.SUCESS_DELETE_ITEM.status_code
                deletecadastroJson.message = message.SUCESS_DELETE_ITEM.message
                deletecadastroJson.id = validaId

                return deletecadastroJson
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
    getCadastro,
    setAtualizarnovoCadastro,
    setInserirNovoCadastro,
    setExcluirCadastro
}