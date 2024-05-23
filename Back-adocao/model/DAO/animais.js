
const {PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient() //inicia função para não precisar chamar prismaClient para toda requisição

//select dados BD
const selectAnimais = async function(){
    try{

        let sql = 'selct * from tbl_animais'

        let resultadoAnimais = await prisma.$queryRawUnsafe(sql)

        return resultadoAnimais
    }catch(error){
        return false
    }
}

const insertAnimais = async (dadosAnimais) => {
    try {

        let sql

        //Validação para verificar se a data de falecimento é vazia
        if (dadosAnimais.raca == null ||
            dadosAnimais.raca == undefined ||
            dadosAnimais.raca == '' ||
            dadosAnimais.setor == null ||
            dadosAnimais.setor == undefined ||
            dadosAnimais.setor == '' 
        ) {
            sql = `insert into tbl_animais (
                                         nome, 
                                         raca, 
                                         idade, 
                                         setor
                                        ) values (
                                                  '${dadosAtor.nome}', 
                                                  '${dadosAtor.raca}', 
                                                  '${dadosAtor.idade}',
                                                  '${dadosAtor.setor}', 
                                                )`
        } else {
            sql = `insert into tbl_animais (
                nome, 
                raca, 
                idade, 
                setor
               ) values (
                         '${dadosAtor.nome}', 
                         '${dadosAtor.raca}', 
                         '${dadosAtor.idade}',
                         '${dadosAtor.setor}', 
                       )`
        }

        // Executando o script SQL para inserir o ator
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    selectAnimais,
    insertAnimais
}