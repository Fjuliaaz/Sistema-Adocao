const animaisDAO = require('../model/DAO/animais')

const getAnimais = async function(){
    try {
        
        let animaisJson = {}
        let dadosAnimais = await animaisDAO.selectAnimais()

        if(dadosAnimais){

            if(dadosAnimais.length > 0){
                animaisJson.animais = dadosAnimais
                animaisJson.quantidade = dadosAnimais.length
                animaisJson.status_code = 200 

                return animaisJson
            }else{
                console.log('Algo deu errado no processamento de dodos')
            }
        }

    } catch (error) {
        
    }
}