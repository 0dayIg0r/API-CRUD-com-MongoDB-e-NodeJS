const router = require('express').Router()
const Person = require('../models/Person')


// API Routes
router.post('/', async (req, res) => {
    const { name, salary, approved } = req.body

    if (!name) {
        res.status(422).json({ error: 'Preencha seu nome' })
        return
    }
    if (!salary) {
        res.status(422).json({ error: 'Qual seu salário?' })
        return
    }


    const person = {
        name,
        salary,
        approved
    }

    try {
        await Person.create(person)
        res.status(201).json({ message: 'Inserido' })
    } catch (e) {
        res.status(500).send('O correu um erro, tente mais tarde')
    }
})

// Read
router.get('/', async (req, res) => {
    try {
        const people = await Person.find()
        res.status(200).json({ message: people })
    } catch (e) {
        res.status(500).json({ e: e.message  })
    }
})

// Filter by id 
router.get('/:id', async (req, res) => {
    const  id  = req.params.id

    try {
        const person = await Person.findOne({ _id: id })
        res.status(200).json(person)

        if(!person){
            res.status(422).json({message: 'Usuário não encontrado'})
            return
        }

    } catch (e) {
        res.status(500).json({ e: e.message  })
    }
})

// Update (PUT, PATCH)
router.patch('/:id', async (req, res) =>{
    const  id  = req.params.id
    const { name, salary, approved } = req.body

   
    const person = {
        name,
        salary,
        approved
    }
    try {
        const updatedPerson = await Person.updateOne({_id: id})

        if(updatedPerson.matchedCount === 0){
            res.status(422).json({message: 'Usuário não encontrado'})
        }

        res.status(200).json(person)
    
    } catch (e) {
        res.status(500).json({ e: e.message })
    }
})


// Delete
router.delete('/:id', async (req, res)=>{
    const id = req.params.id

    const person = await Person.findOne({ _id: id })
   

    if(!person){
        res.status(422).json({message: 'Usuário não encontrado'})
        return
    }
    try {
       await Person.deleteOne({_id: id})
        res.status(200).json({message:' Usuário removido'})
    } catch (e) {
        res.status(500).json({ e: 'Usuário não encontrado' })
    }
})
module.exports = router