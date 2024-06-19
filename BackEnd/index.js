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
    const {category, search} = req.query;
    try{
        const where = {};
        if(category !== null) {
            where.boardCategory = category;
        }
        if(search !== null) {
            where.title = {contains: search, mode: 'insensitive'};
        };
        const board = await prisma.board.findMany({
            where: where,
        });
        res.status(200).json(board);
    } catch (error) {
        res.status(500).json({"Error:": error});
    }
});

app.get('/boards/:id', async(req, res) => {
    const {id} = req.params
    try{
        const board = await prisma.board.findUnique(
            {where: {id: parseInt(id)}, }
        )
        res.status(200).json(board);
    } catch (error) {
        console.error("Error:", error);
    }
})

app.delete('/boards/:id', async(req, res) => {
    const {id} = req.params;

    try{
        const deletedBoard = await prisma.board.delete({
            where: {id: parseInt(id)}
        });
        res.status(200).json(deletedBoard);
    } catch (error) {
        console.error("Error:", error);
    }
})


const server = app.listen(PORT, () =>{
    console.log(`Server is running at port ${PORT}`)
})
