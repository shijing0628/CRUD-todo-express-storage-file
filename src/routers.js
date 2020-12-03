const express = require('express')
const router = express.Router()
const dbhandler = require('./db')

router.get('/item', async (req, res) => {
 try {
  const getItems = await dbhandler.getAllItems()
  return res.status(200).json({ getItems })
 } catch (err) {
  console.error(err)
  return next(err)
 }

})


router.get('/item/:id', async (req, res) => {
 try {
  let getItem = await dbhandler.getItemById(Number(req.params.id))
  console.log(getItem)
  if (!getItem) {
   return res.status(403).json({ message: `entry ${req.params.id} not found.` })
  } else {
   return res.status(200).json({ getItem })
  }
 } catch (err) {
  console.error(err)
  return next(err)
 }
})


router.post('/item', async (req, res) => {
 try {
  const { id, name, Description, isComplete } = req.body;
  let newItem = {
   id,
   name,
   Description,
   isComplete
  };

  await dbhandler.createItem(newItem)
  let allData = await dbhandler.getAllItems()
  return res.status(201).json({ allData })
 } catch (err) {
  console.error(err)
  return next(err)
 }
})

router.put('/item/:id', async (req, res) => {
 try {
  const { id, name, Description, isComplete } = req.body;
  const getItem = await dbhandler.getItemById(Number(req.params.id))
  if (!getItem) {
   return res.status(403).json({ message: `entry ${req.params.id} not found.` })
  } else {
   let updateItem = {
    id,
    name,
    Description,
    isComplete
   }
   await dbhandler.updateItem(updateItem)
   return res.status(200).json({ updateItem })
  }
 } catch (err) {
  console.error(err)
  return next(err)
 }
})


router.patch('/item/:id', async (req, res) => {
 try {

  const getItems = await dbhandler.getAllItems()
  const itemIndex = await getItems.findIndex(item => item.id == Number(req.params.id))

  const { name, Description } = req.body

  if (itemIndex == -1) {
   return res.status(404).json({ error: `entry ${req.params.id} not found` })
  }
  else {
   if (name && Description) {
    getItems[itemIndex].name = name
    getItems[itemIndex].Description = Description

    await dbhandler.updateItem(getItems[itemIndex])
    return res.status(200).json(getItems[itemIndex])
   }
   else {
    return res.status(400).json({ error: 'cannot update to an empty task' })
   }
  }
 } catch (err) {
  console.error(err)
  return next(err)
 }
})


router.delete('/item/:id', async (req, res) => {
 try {
  const id = Number(req.params.id)
  const getItems = await dbhandler.getAllItems()
  const itemIndex = await getItems.findIndex(item => item.id == id)

  if (itemIndex === -1) {
   return res.status(404).json({ error: `${id} not found` })
  } else {
   await dbhandler.removeItem(id)
   return res.status(200).json({ message: `item ${id} is deleted.` })
  }

 } catch (err) {
  console.error(err)
  return next(err)
 }
})




module.exports = router