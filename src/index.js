const express = require("express");
const translate = require("translate-google");
const cors = require("cors");
const app = express();

const post =  process.env.PORT || 3000 ;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.post("/translate" , async (req, res)=>{
    try{
        const {message, from , to} = req.body;

        if(!message || !from || !to){
            console.log("here")
            throw new Error("message, from and to is required");
        }
    
        const result = await  translate(message , {from: from , to,to});

        res.status(200).json(
                {
                message:message,
                result:result,
                from:from,
                to:to
                 }
        );

    }
    catch(err){
        console.log(err)
        res.status(400).json(err.message)
    }
});


app.listen(post,()=>{
    console.log(`server is run ....${port}`);
})