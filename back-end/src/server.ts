import { randomUUID } from 'crypto';
import express from 'express'
import { v5 as uuid } from 'uuid';
import cors from 'cors';

const app = express()
app.use(express.json())
app.use(cors())

// Métodos HTTP -> GET | POST | PUT | DELETE

// Tipos de parâmetros

// Query Params => Utilizado para filtros na requisição [paginação] [ GET ]
// Route Params => Utilizado para identificar um recurso em uma rota [ GET/PUT/PATCH/DELETE]
// Request Body => Utilizado para mandar informações no corpo da requisição

interface User {
    id: string,
    name: string,
    email: string
}

const users: User[] = [];

app.get('/users', (request, response) => {
    return response.json(users)
})

app.post('/users', (request, response) => {
    const { name, email } = request.body
    const user = { id: randomUUID(), name, email }
    users.push(user)
    return response.json({ "msg": "Criando usuário", "usuario": user })
})

app.put('/users/:id', (request, response) => {
    const { id } = request.params
    const { name, email } = request.body

    const userIndex = users.findIndex((user) => user.id === id)
    if (userIndex < 0) {
        return response.status(404).json({ "erro": "Usuário não encontrado" })
    }
    const user = { id, name, email }
    users[userIndex] = user
    return response.json({ user })
})


app.delete('/users/:id', (request, response) => {
    const { id } = request.params
    const userIndex = users.findIndex((user) => user.id === id)
    if (userIndex < 0) {
        return response.status(404).json({ "erro": "Usuário não encontrado" })
    }
    users.splice(userIndex, 1)
    return response.status(204).send();
})

app.listen("3333", () => {
    console.log('Back-end started!')
})
