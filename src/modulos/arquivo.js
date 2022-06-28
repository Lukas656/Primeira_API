const fs = require('fs/promises');

const lerConteudoArquivo = (caminho) => {
  return fs.readFile(caminho);
};

const alterarConteudoArquivo = (caminho, novoConteudo) => {
  return fs.writeFile(caminho, novoConteudo);
};

module.exports = {
  lerConteudoArquivo,
  alterarConteudoArquivo,
}