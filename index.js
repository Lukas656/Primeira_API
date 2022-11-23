const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const app = express();

const port = 3030;
app.use(bodyParser.json())
app.use(cors())




async function getCollection() {
    // conexão com o banco de dados
    const uri = "mongodb://localhost:27017";
    const voo = new MongoClient(uri);
    await voo.connect();
    const db = voo.db("primeiroDB");
    return db.collection("Voos");
};


//  Pegar os Dados
app.get('/get', async (req, res) => {
    const voosCollection = await getCollection();
    const voos = await voosCollection.find().toArray();
    console.log(voos)
    res.send(voos)
});


//  Pegar um dado pelo ID
app.get('/get/:id', async (req, res) => {
    async function getVoo(vooId) {
        const voosCollection = await getCollection();
        const voos = await voosCollection.find({ vooId: parseInt(vooId) }).toArray();
        return voos
    }
    const voos = await getVoo(req.params.id);
    console.log(voos)
    res.send(voos)
});

//  enviar (Criar) dados para o servidor.
app.post('/post', async (req, res) => {
    async function addVoo(voo) {
        const voosCollection = await getCollection();
        const voos = voosCollection.insertOne(voo);
        return voos
    }
    const voos = await addVoo(req.body);
    console.log(voos)
    res.send(voos)
});

// Put: Atualiza os Dados do BD
app.put('/put', async (req, res) => {
    const voosCollection = await getCollection();
    // Logica
    let corpo = req.body;
    console.log(corpo);

    let filtro = { vooId: corpo.vooId };
    console.log(filtro);
    let mod = { $set: { origem: corpo.origem, destino: corpo.destino } }
    await voosCollection.updateOne(filtro, mod)
    res.send("Voo atualizado !!")

})


app.delete('/delete', async (req, res) => {
    const voosCollection = await getCollection();
    // Logica
    let corpo = req.body;
    console.log(corpo);

    let filtro = { vooId: corpo.vooId };
    console.log(filtro);
    await voosCollection.deleteOne(filtro)
    res.send("Voo deletado !!")
})

app.listen(port, () => {
    console.log(`Rodando na porta: http://localhost:${port}`)
});