const express=require('express');
const port=8000;

const app=express();

app.set("view engine","ejs");
app.set("views","./view");

app.use(express.urlencoded({extended:false}))

app.get('/',function(req,res){
    return res.render('home',{
        title:"title"
    })
})

app.post('/payment',function(req,res){
    console.log(req.body);
})


app.listen(port,function(err){
    if(err){

    }
    console.log(`server up on port ${port}`);
})