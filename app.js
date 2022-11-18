const express = require('express')
const bodyParser = require('body-parser')
const date = require(__dirname + "/data.js")
const port = 3000
const app = express()

const items = []
const workItems = []

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.set('view engine','ejs')

app.get("/",(req,res) => {

    const day = date.getDate()

    res.render('lista',{listTitle:day,newListItems:items})
})

app.post("/",(req,res) => {
    
    const item = req.body.newItem
    
    if(req.body.list === "Lista"){
        workItems.push(item)
        res.redirect("/work")
    }else{
        items.push(item)
        res.redirect("/")
    }
      
})

app.get("/work",(req,res) => {
    res.render("lista",{listTitle:"Lista de Trabalho",newListItems:workItems})
})

app.get("/about",(req,res) => {
    res.render("about")
})



app.listen(port,() => {
    console.log(`O server foi iniciado na porta ${port} `)
})

