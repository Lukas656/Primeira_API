const express = require('express');
const cors = require('cors');
const {
    criarCurso,
    listarCursos,
    alterarCursos,
    deletarcurso,
} = require('./src/controller');


// cria novo app express // cria um novo objeto express ao chamar express()
const app = express();
// habilita cors
app.use(cors());
// habilita o body nas chamadas
app.use(express.json());


// Retornar Todos os cursos
app.get('/cursos', // quero criar uma rota em: http://localhost:3030/cursos
    (request, response) => listarCursos(request, response),
  );

// Criar nono curso
app.post('/cursos', // quero criar uma rota em: http://localhost:3030/cursos
    (request, response) => criarCurso(request, response),
  );

// Atualizar um curso
app.patch('/cursos', // quero criar uma rota em: http://localhost:3030/cursos
    (request, response) => alterarCursos(request, response),
  );

//Deletar um curso
app.delete('/cursos', // quero criar uma rota em: http://localhost:3030/cursos
    (request, response) => deletarcurso(request, response),
  );



// Rodar o Servirdor e mostarar mensagem
app.listen(process.env.port || 3030);
console.log(cursos)
console.log("Servirdor Rodando port: http://localhost:3030/cursos")