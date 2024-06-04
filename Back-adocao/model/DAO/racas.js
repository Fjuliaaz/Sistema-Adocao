const {PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient() //inicia função para não precisar chamar prismaClient para toda requisição

//select dados BD
const selectRacas = async function(){
    try{

        let sql = 'select * from tbl_racas'

        let resultadoRacas = await prisma.$queryRawUnsafe(sql)

        return resultadoRacas
    }catch(error){
        return false
    }
}

const selectRacasById = async function(id){
    try{

        let sql = `select * from tbl_animais where id = ${id}`

        let resultadoRacas = await prisma.$queryRawUnsafe(sql)

        return resultadoRacas
    }catch(error){
        return false
    }
}

const insertRaca = async (dadosRacas) => {
    try {

        //Validação para verificar se nome e expectativa de vida é vazia
        if (dadosRacas.nome != null ||
            dadosRacas.nome != undefined ||
            dadosRacas.nome != '' ||
            dadosRacas.expectativa_de_vida != null ||
            dadosRacas.expectativa_de_vida != undefined ||
            dadosRacas.expectativa_de_vida != '' 
        ) {
            sql = `insert into tbl_racas (
                                         nome, 
                                         descricao, 
                                         expectativa_de_vida, 
                                         cor,
                                         popularidade,
                                         problemas_de_saude_comuns
                                        ) values (
                                                  '${dadosRacas.nome}', 
                                                  '${dadosRacas.descricao}', 
                                                  '${dadosRacas.expectativa_de_vida}',
                                                  '${dadosRacas.cor}',
                                                  '${dadosRacas.popularidade}',
                                                  '${dadosRacas.problemas_de_saude_comuns}' 
                        
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

        let sql = 'select cast(last_insert_id() as decimal) as id from tbl_racas limit 1;'

        let resultadoRacas = await prisma.$queryRawUnsafe(sql)

        return resultadoRacas
    }catch(error){
        return false
    }
}

const updateRacas = async function (id, dadosRacasUpdate) {

    console.log(error)
    try {
        let sql = `UPDATE tbl_animais SET `
        const keys = Object.keys(dadosRacasUpdate)

        keys.forEach((key, index) => {
            sql += `${key} = '${dadosRacasUpdate[key]}'`
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

const deleteRacas = async function (id) {
    
    try {
        let sql = `delete from tbl_racas where id = ${id};`

        let result = await prisma.$queryRawUnsafe(sql)
        
        return result
    } catch (error) {
        return false
    }
}

module.exports = {
    selectRacas,
    selectRacasById,
    insertRaca,
    selectLastId,
    updateRacas,
    deleteRacas
}