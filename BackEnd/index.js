const express = require ('express');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(cors());
const PORT = 3000;

app.post('/boards', async (req, res) => {
    const {imgUrl, title, boardCategory, description, author} = req.body;
    const newBoard = await prisma.board.create({
        data: {imgUrl, title, boardCategory, description, author}
    })
    res.status(200).json(newBoard);
})

app.get('/boards', async(req, res) => {
    const board = await prisma.board.findMany()
    res.status(200).json(board);
})

app.get('/boards/:id', async(req, res) => {
    const {id} = req.params
    const board = await prisma.board.findUnique(
        {where: {id: parseInt(id)}, }
    )
    res.status(200).json(board);
})


const server = app.listen(PORT, () =>{
    console.log(`Server is running at port ${PORT}`)
})
