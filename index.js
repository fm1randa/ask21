const express = require("express");             // estrutura básica do express
const app = express();        
const bodyParser = require("body-parser");
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');
// database

connection
    .authenticate()
    .then(() =>{
        console.log("Conexão feita com o banco de dados!");
    })
    .catch((msgErro) =>{
        console.log(msgErro);
    })

app.set('view engine', 'ejs'); // definindo o EJS
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false})); // body parser
app.use(bodyParser.json());


// rotas
app.get("/", (req, res) => {          
    Pergunta.findAll({ raw: true, order:[ // SELECT * FROM perguntas;
        ['id', 'DESC'] // ASC = Crescente || DESC = Decrescente
    ] }).then(perguntas => { 
        res.render("index", {
            perguntas
        });
    }); 
         
});

app.get("/perguntar", (req, res) =>{
    res.render("perguntar");
});

app.get("/pergunta/:id", (req, res) =>{
    var id = req.params.id;
    Pergunta.findOne({
        where: {id}
    }).then(pergunta => {
        if(pergunta != undefined){ // se achar pergunta

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [['id', 'DESC']]
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta,
                    respostas
                });
            })   
        }
        else{ 
            res.redirect("/");
        } 
    });
});

app.post("/salvarpergunta", (req, res) => {
    
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Pergunta.create({ // INSERT INTO
        titulo,
        descricao
    }).then(() => {
        res.redirect("/");
    });
});

app.post("/responder", (req, res) =>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;

    Resposta.create({
        corpo,
        perguntaId
    }).then(() =>{
        res.redirect(`/pergunta/${perguntaId}`);
    });
});

//- rotas


app.listen(3000, () => console.log("App rodando!"));
