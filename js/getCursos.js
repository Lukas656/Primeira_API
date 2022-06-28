const cursosE = document.getElementById('cursos');

async function consultaCursos (){
  const retorno =   await fetch('http://localhost:3030/cursos')

  const cursos = await retorno.json()
  
  console.log(cursos)
}

consultaCursos();