const { alterarConteudoArquivo, lerConteudoArquivo } = require('./modulos/arquivo');

const caminhoArquivoDb = `${process.cwd()}/src/dados.json`;

const criarCurso = async (req, res) => {
  try {
    const novoCurso = { id: req.body.id, nome: req.body.nome  };

    // validacao do body
    if (!novoCurso.nome || !novoCurso.id) {
      res.status(400).json({ message: 'Insira o numero de identificação e Nome do curso' });
      return;}

    const conteudoArquivo = await lerConteudoArquivo(caminhoArquivoDb); // retorna conteudo COMO STRING
    const conteudoConvertidoEmObjeto = JSON.parse(conteudoArquivo); // converte string em objeto

    // verifica se o id ja existe no 'banco'
    if (conteudoConvertidoEmObjeto.cursos.find(curso => curso.id === novoCurso.id)) {
      res.status(400).json({ message: 'Código de identificação já cadastrado' });
      return;
    }
    conteudoConvertidoEmObjeto.cursos.push(novoCurso);

    const conteudoConvertidoEmString = JSON.stringify(conteudoConvertidoEmObjeto);

    await alterarConteudoArquivo(caminhoArquivoDb, conteudoConvertidoEmString);

    // status 200 = SUCESSO
    res.status(200).json({ message: 'Curso criado com sucesso' });
  } catch (error) {
    console.error('Deu erro ao criar Curso', error);
    // STATUS 500 = ERRO INTERNO NO SERVIDOR
    res.status(500).json({ message: 'Erro ao criar Curso' });
  }
};

const listarCursos = async (_, res) => {
    try {
      const conteudoArquivo = await lerConteudoArquivo(caminhoArquivoDb); // retorna conteudo COMO STRING
      const conteudoConvertidoEmObjeto = JSON.parse(conteudoArquivo); // converte string em objeto
  
      // status 200 = SUCESSO
      res.status(200).json({ cursos: conteudoConvertidoEmObjeto.cursos});
    } catch (error) {
      console.error('Deu erro ao listar cursos', error);
      // STATUS 500 = ERRO INTERNO NO SERVIDOR
      res.status(500).json({ message: 'Erro ao listar Cursos' });
    }
  };

  const alterarCursos = async (req, res) => {
    try {
      const idCurso = req.body.id; // lê id dos params da URL
      const novoCurso = req.body; // usa o body da chamada como novoCurso
  
      // validacao
  
      const conteudoArquivo = await lerConteudoArquivo(caminhoArquivoDb); // retorna conteudo COMO STRING
      const conteudoConvertidoEmObjeto = JSON.parse(conteudoArquivo); // converte string em objeto
  
      let indice;
  
      const curso = conteudoConvertidoEmObjeto.cursos.find((curso, findIndex) => {
        if (curso.id === idCurso) indice = findIndex;
  
        return curso.id === idCurso;
      });
  
      if (curso) {
        conteudoConvertidoEmObjeto.cursos[indice] = {
          ...curso, // copia o objeto curso
          ...novoCurso, // copia o objeto novoCurso
          // caso tenham propriedades iguais/comuns entre os dois obj,
          // é obedecida a ordem, com novoCurso sobrescrevendo as de curso
        };
      }
  
      const conteudoConvertidoEmString = JSON.stringify(conteudoConvertidoEmObjeto);
  
      await alterarConteudoArquivo(caminhoArquivoDb, conteudoConvertidoEmString);
  
      // status 200 = SUCESSO
      res.status(200).json({ message: 'Curso alterado com sucesso' });
    } catch (error) {
      console.error('Deu erro ao alterar curso', error);
      // STATUS 500 = ERRO INTERNO NO SERVIDOR
      res.status(500).json({ message: 'Erro ao alterar Curso' });
    }
  };

  const deletarcurso = async (req, res) => {
    try {
      const idCurso = req.body.id; // lê id dos params da URL
  
      const conteudoArquivo = await lerConteudoArquivo(caminhoArquivoDb); // retorna conteudo COMO STRING
      const conteudoConvertidoEmObjeto = JSON.parse(conteudoArquivo); // converte string em objeto
  
      let cursoIndex;
      for (let i = 0; i < conteudoConvertidoEmObjeto.cursos.length; i += 1) {
        if (conteudoConvertidoEmObjeto.cursos[i].id === idCurso) {
          cursoIndex = i;
          break;
        }
      }
  
      if (!cursoIndex && cursoIndex !== 0) { // verifica se é diferente de 0 pois o primeiro indice seria TRUE para !cursoIndex
        res.status(400).json({ message: 'id nao encontrado' });
      } else {
        conteudoConvertidoEmObjeto.cursos.splice(cursoIndex, 1); // remove do arr um item a partir de cursoIndex
        const conteudoConvertidoEmString = JSON.stringify(conteudoConvertidoEmObjeto);
  
        await alterarConteudoArquivo(caminhoArquivoDb, conteudoConvertidoEmString);
  
        // status 200 = SUCESSO
        res.status(200).json({ message: `Curso ${idCurso} removido com sucesso` });
      }
    } catch (error) {
      console.error('Deu erro ao remover curso', error);
      // STATUS 500 = ERRO INTERNO NO SERVIDOR
      res.status(500).json({ message: 'Erro ao remover curso' });
    }
  };

module.exports = {
  criarCurso,
  listarCursos,
  alterarCursos,
  deletarcurso,
};