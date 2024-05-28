const express = require("express");
const app = express();

const PORT = 5000;
app.get('/',(req,res)=>{
    res.send('Hello chatting app');
})

app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`);
})