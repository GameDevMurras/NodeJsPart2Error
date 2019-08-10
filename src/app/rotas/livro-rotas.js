
const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');
const LivroControlador = require("../controladores/LivroControlador");
const livroControlador = new LivroControlador();

const Livro = require("../modelos/livro");

module.exports = (app) => {
    app.get(LivroControlador.rotas().lista, livroControlador.lista(db)); 

    app.route(LivroControlador.rotas().cadastro)
        .get(livroControlador.formularioCadastro())
        .post(Livro.validacao(), livroControlador.cadastra())
        .put(Livro.validacao(),livroControlador.edita());

    app.get(LivroControlador.rotas().edicao, livroControlador.formularioEdicao());
    app.delete(LivroControlador.rotas().delecao, livroControlador.remove());
};