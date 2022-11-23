async function sairVoo(){
      window.location.href = '../../../01-Login/pagina02.html'
}
// Chamar todos os Voos do banco de dados 
 async function listaVoos() {
   console.log("List VOOS");
   var response = await axios.get("http://localhost:3030/get")
   response.data.forEach(voo => {
     console.log(voo);
     document.getElementById('usersList').innerHTML +=
       ('<li>' + `Nº: ${voo.vooId}  Origem: ${voo.origem}  Destino: ${voo.destino} </li>`);
   });

 }
 listaVoos()



// Chamar um voo do banco de dados 
async function chamaVoos() {
  console.log("Chama Voos");
  let vooId = document.getElementById('busca').value;
  var response = await axios.get(`http://localhost:3030/get/${vooId}`);
  console.log(response); 
  response.data.forEach(voo => {
     console.log(voo);
     document.getElementById('voosList').innerHTML +=
       ('<li>' + `Nº: ${voo.vooId}  Origem: ${voo.origem}  Destino: ${voo.destino} </li>`);
  });
}
function refresh(){
  document.location.reload(true);
}





// Criar Voo
async function criarVoo() {
  console.log("ADD VOOS");
  let vooId = document.getElementById('vooId').value;
  let origem = document.getElementById('origem').value;
  let destino = document.getElementById('destino').value;

  vooId = parseInt(vooId)

  let newVoo = { vooId, origem, destino };

  let res = axios.post("http://localhost:3030/post", newVoo)
  let data = res.data;
  alert("Viagem marcada !!!")
  console.log(data);
}


// Alterar Voo
async function alterarVoo() {
  console.log("ADD VOOS");
  let newID = document.getElementById('newVoo').value;
  let newOrigem = document.getElementById('newOrigem').value;
  let newDestino = document.getElementById('newDestino').value;

  newID = parseInt(newID)
  let newVoo = { vooId: newID, origem: newOrigem, destino: newDestino };

  let res = axios.put("http://localhost:3030/put", newVoo)
  let data = res.data;


  alert("Viagem alterada !!!")
  console.log(data);
}

// Deletar Voo
async function deletaVoo() {
  let dellVoo = document.getElementById('dellVoo').value;
  dellVoo = parseInt(dellVoo);
  await axios.delete(`http://localhost:3030/delete`, {data: { vooId: dellVoo}});
  console.log("deleta voo");
  alert("Viagem deletada !!!")
}

