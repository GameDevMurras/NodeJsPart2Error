const LivroControlador = require("./LivroControlador");
const templates = require("../views/templates");

class BaseControlador
{
    static rotas() {
        return {
            home: '/',
            login: '/login'
        };
    }


    home()
    {
        return function(req, resp) 
        {
            console.log("Vá pra Home");
            resp.marko(templates.base.home);
        }
    }

    login()
    {
        return function(req, resp)
        {
            resp.marko(templates.base.login);
        }
    }

    efetuaLogin()
    {
        return function(req, resp, next)
        {
            console.log(`Efetuando login com: ${JSON.stringify(req.body)}`);
            
           const passport = req.passport;
            

           passport.authenticate('local', (erro, usuario, info) =>
           {
               if(info)
               {
                   return resp.marko(templates.base.login);
               }

               if(erro)
               {
                   return next(erro);
               }

               req.login(usuario, (erro)=>
               {
                   return next(erro);
               });

               console.log("Até aqui funciona! O problema é a instrução abaixo");
              
               return resp.redirect(LivroControlador.rotas().lista);    
               

              
            })(req, resp, next);
        }
    };

}

module.exports = BaseControlador;



