const express = require('express');


const app =express();



app.use(express.static(path.join(__dirname,'public')));

app.get('/api', function (req,res){

    
}); 



const PORT = process.env.PORT || 3000;

app.listen( PORT, () =>  console.log(`server started  on port ${PORT}`))