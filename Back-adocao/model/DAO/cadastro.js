const {PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient() //inicia função para não precisar chamar prismaClient para toda requisição

//select dados BD
const selectCadastro = async function(){
    try{

        let sql = 'select * from tbl_cadastro'

        let resultadoCadastro = await prisma.$queryRawUnsafe(sql)

        return resultadoCadastro
    }catch(error){
        return false
    }
}

const selectCadastroById = async function(id){
    try{

        let sql = `select * from tbl_cadastro where id = ${id}`

        let resultadoCadastro = await prisma.$queryRawUnsafe(sql)

        return resultadoCadastro
    }catch(error){
        return false
    }
}

const insertCadastro = async (dadosCadastro) => {
    try {

        //Validação para verificar se nome email e endereço de vida é vazia
        if (dadosCadastro.nome != null ||
            dadosCadastro.nome != undefined ||
            dadosCadastro.nome != '' ||
            dadosCadastro.email != null ||
            dadosCadastro.email != undefined ||
            dadosCadastro.email != '' ||
            dadosCadastro.endereco != null ||
            dadosCadastro.endereco != undefined ||
            dadosCadastro.endereco != '' 
        ) {
            sql = `insert into tbl_cadastro (
                                         nome, 
                                         email, 
                                         endereco, 
                                         telefone,
                                         cpf,
                                         rg
                                        ) values (
                                                  '${dadosCadastro.nome}', 
                                                  '${dadosCadastro.email}', 
                                                  '${dadosCadastro.endereco}',
                                                  '${dadosCadastro.telefone}',
                                                  '${dadosCadastro.cpf}',
                                                  '${dadosCadastro.rg}' 
                        
                                                );`
        } else {
            console.log('aqui');
            return false
        }

        // Executando o script SQL para inserir raças
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
    
            return false

    } catch (error) {
        console.log( error);
        return false
    }
}


const selectLastId = async function(){
    try{

        let sql = 'select cast(last_insert_id() as decimal) as id from tbl_cadastro limit 1;'

        let resultadoCadastro = await prisma.$queryRawUnsafe(sql)

        return resultadoCadastro
    }catch(error){
        return false
    }
}

const updateCadastro = async function (id, dadosCadastroUpdate) {

    console.log(error)
    try {
        let sql = `UPDATE tbl_cadastro SET `
        const keys = Object.keys(dadosCadastroUpdate)

        keys.forEach((key, index) => {
            sql += `${key} = '${dadosCadastroUpdate[key]}'`
            if (index !== keys.length - 1) {
                sql += `, `
            }
        })

        sql += ` WHERE id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        return result
    } catch (error) {
        console.log(error)
        return false
    }

}

const deleteCadastro = async function (id) {
    
    try {
        let sql = `delete from tbl_cadastro where id = ${id};`

        let result = await prisma.$queryRawUnsafe(sql)
        
        return result
    } catch (error) {
        return false
    }
}

module.exports = {
    selectCadastro,
    selectCadastroById,
    insertCadastro,
    selectLastId,
    updateCadastro,
    deleteCadastro
}