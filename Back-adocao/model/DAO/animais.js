
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

const insertAnimais = async (dadosAnimais) => {
    try {

        //Validação para verificar se a data de falecimento é vazia
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

        // Executando o script SQL para inserir o ator
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
        console.log('lá');
            return false

    } catch (error) {
        console.log('acolá', error);
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


module.exports = {
    selectAnimais,
    insertAnimais,
    selectLastId
}