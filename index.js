const express = require('express');
const app=express();
const cors = require('cors');
const port= process.env.PORT || 3000;

// MiddleWare
app.use(cors())
app.use(express.json())

app.get('/', (req, res)=>{
res.send('Hello Boss This is Espresso Emporium Website Server')
})

app.listen(port, ()=>{
    console.log(`Espresso Emporium Server is Running On Port ${port}`)
})