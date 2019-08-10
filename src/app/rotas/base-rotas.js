const BaseControlador = require("../controladores/BaseControlador");
const baseControlador = new BaseControlador();



module.exports = (app) => {
    
    app.get(BaseControlador.rotas().home, baseControlador.home());
    
    app.route(BaseControlador.rotas().login)
    .get(baseControlador.login())
    .post(baseControlador.efetuaLogin());
};