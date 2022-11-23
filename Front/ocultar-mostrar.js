let pesquisar = document.getElementById('pesquisar');
let todosVoos = document.querySelector('todosVoos');
let pesquisarClass = document.querySelector('.pesquisar');


pesquisar.addEventListener('click', ()=>{
    todosVoos.style.dispaly = 'none';
    pesquisarClass.style.display = 'block';
})