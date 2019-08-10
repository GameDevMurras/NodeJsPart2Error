const {check} = require('express-validator/check');

class Livro
{
    static validacao()
    {
        return [
            
            check("titulo").isLength({min:5}).withMessage("O título deve ter, no mínimo 5 caracteres!"),
            check("preco").isCurrency().withMessage("O preço deve ter um valor monetário válido!")
        ];
    }
}

module.exports = Livro;