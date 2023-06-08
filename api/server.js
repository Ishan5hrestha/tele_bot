const express = require('express');


const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: true}));


const port = 3000;

app.listen( port, ()=>{
    console.log('Listen on port '+ port);
});

const callRouter = async (req, res)=>{
    console.log("req", req);
    console.log("res", res.body);

    const from = res.body.from;
    const to = res.body.to;

    const untrackedWallets = getUntrackedWallets();
    if(!untrackedWallets.includes(from)){
        
    }

    if(!untrackedWallets.includes(to)){

    }
    res.json({success: "thanku!"})

    
}

app.post('/*', callRouter);
