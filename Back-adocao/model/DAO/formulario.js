const {PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient() //inicia função para não precisar chamar prismaClient para toda requisição

//select dados BD
const selectFormulario = async function(){
    try{

        let sql = 'select * from tbl_formulario_adocao'

        let resultadoFormulario = await prisma.$queryRawUnsafe(sql)

        return resultadoFormulario
    }catch(error){
        return false
    }
}

const selectFormularioById = async function(id){
    try{

        let sql = `select * from tbl_formulario_adocao where id = ${id}`

        let resultadoFormulario = await prisma.$queryRawUnsafe(sql)

        return resultadoFormulario
    }catch(error){
        return false
    }
}

const insertFormulario = async (dadosFormulario) => {
    try {

            sql = `insert into tbl_formulario_adocao (
                                         nome_usuario, 
                                         raca_de_preferencia, 
                                         porte, 
                                         idade_minima,
                                         resgatado_ou_nao
                                        ) values (
                                                  '${dadosFormulario.nome_usuario}', 
                                                  '${dadosFormulario.raca_de_preferencia}', 
                                                  '${dadosFormulario.porte}',
                                                  '${dadosFormulario.idade_minima}',
                                                  '${dadosFormulario.resgatado_ou_nao}'                        
                                                );`


        // Executando o script SQL para inserir no formulario
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

        let sql = 'select cast(last_insert_id() as decimal) as id from tbl_formulario_adocao limit 1;'

        let resultadoFormulario = await prisma.$queryRawUnsafe(sql)

        return resultadoFormulario
    }catch(error){
        return false
    }
}

const updateFormulario = async function (id, dadosFormularioUpdate) {

    console.log(error)
    try {
        let sql = `UPDATE tbl_formulario_adocao SET `
        const keys = Object.keys(dadosFormularioUpdate)

        keys.forEach((key, index) => {
            sql += `${key} = '${dadosFormularioUpdate[key]}'`
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

const deleteFormulario = async function (id) {
    
    try {
        let sql = `delete from tbl_formulario_adocao where id = ${id};`

        let result = await prisma.$queryRawUnsafe(sql)
        
        return result
    } catch (error) {
        return false
    }
}

module.exports = {
    selectFormulario,
    selectFormularioById,
    insertFormulario,
    selectLastId,
    updateFormulario,
    deleteFormulario
}