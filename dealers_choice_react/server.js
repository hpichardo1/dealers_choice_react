const express = require('express')
const app = express();
const {syncAndSeed, db, models: {Dealer, Car, Client} } = require('./db')
const PORT = 3000


app.get('/api/cars', async(req, res, next)=>{
  try {
    const response = await Car.findAll()
    res.send(response)
  }
  catch(e){
    console.log(e)
  }
})

app.get('/api/dealers', async(req, res, next)=>{
  try {
    const response = await Dealer.findAll()
    res.send(response)
  }
  catch(e){
    console.log(e)
  }
})

app.get('/api/clients', async(req, res, next)=>{
  try {
    const response = await Client.findAll()
    res.send(response)
  }
  catch(e){
    console.log(e)
  }
})


const init = async()=>{
  try {
    await db.sync({force: true})
    await syncAndSeed();
    await app.listen(PORT, ()=>{
      console.log(`listening on port ${PORT}`)
    })
  }
  catch(e){
    console.log(e)
  }
}

init();




