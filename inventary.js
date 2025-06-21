import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import router from './routes/routes.js'

const inventary = express()
inventary.use(express.json()) 
inventary.use(express.static('public'))
inventary.use('/apinv', router)


mongoose.connect(process.env.MONGO_CNX)
  .then(() => console.log('Connected to BD'))
  .catch(err => console.error('Error al conectar',err));
  
inventary.listen(process.env.PORT, () => {
    console.log(`Listening the port ${process.env.PORT}`);
})


