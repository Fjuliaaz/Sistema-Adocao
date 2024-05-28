
const {PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient() //inicia função para não precisar chamar prismaClient para toda requisição

//select dados BD
const selectAnimais = async function(){
    try{

        let sql = 'select * from tbl_animais'

        let resultadoAnimais = await prisma.$queryRawUnsafe(sql)

        return resultadoAnimais
    }catch(error){
        return false
    }
}

const selectAnimaisById = async function(id){
    try{

        let sql = `select * from tbl_animais where id = ${id}`

        let resultadoAnimais = await prisma.$queryRawUnsafe(sql)

        return resultadoAnimais
    }catch(error){
        return false
    }
}

const insertAnimais = async (dadosAnimais) => {
    try {

        //Validação para verificar se nome e idade é vazia
        if (dadosAnimais.nome != null ||
            dadosAnimais.nome != undefined ||
            dadosAnimais.nome != '' ||
            dadosAnimais.idade != null ||
            dadosAnimais.idade != undefined ||
            dadosAnimais.idade != '' 
        ) {
            sql = `insert into tbl_animais (
                                         nome, 
                                         raca, 
                                         idade, 
                                         setor
                                        ) values (
                                                  '${dadosAnimais.nome}', 
                                                  '${dadosAnimais.raca}', 
                                                  '${dadosAnimais.idade}',
                                                  '${dadosAnimais.setor}' 
                        
                                                );`
        } else {
            console.log('aqui');
            return false
        }

        // Executando o script SQL para inserir animais
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

        let sql = 'select cast(last_insert_id() as decimal) as id from tbl_animais limit 1;'

        let resultadoAnimais = await prisma.$queryRawUnsafe(sql)

        return resultadoAnimais
    }catch(error){
        return false
    }
}

const updateAnimais = async function (id, dadosAnimaisUpdate) {

    console.log(error)
    try {
        let sql = `UPDATE tbl_animais SET `
        const keys = Object.keys(dadosAnimaisUpdate)

        keys.forEach((key, index) => {
            sql += `${key} = '${dadosAnimaisUpdate[key]}'`
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

const deleteAnimais = async function (id) {
    
    try {
        let sql = `delete from tbl_animais where id = ${id};`

        let result = await prisma.$queryRawUnsafe(sql)
        
        return result
    } catch (error) {
        return false
    }
}

module.exports = {
    selectAnimais,
    selectAnimaisById,
    insertAnimais,
    selectLastId,
    updateAnimais,
    deleteAnimais
}