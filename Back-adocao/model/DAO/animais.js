
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

module.exports = {
    selectAnimais
}