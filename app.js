const express = require('express');
const os = require('os');

const app = express();

let counter = 0;

app.get('/', (req, res) => {
    counter++;

    res.send(`
        <h1>DevOps Project</h1>
        <h2>Timestamp:</h2>
        ${new Date()}

        <h2>Container ID:</h2>
        ${os.hostname()}

        <h2>Visitors:</h2>
        ${counter}
    `);
});

app.get('/health',(req,res)=>{
    res.send("Healthy");
})

app.listen(3000,()=>{
    console.log("Running");
});