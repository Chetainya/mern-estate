const express = require("express");

const app = express();

app.get('/' , (req , res) => {
    return res.send("Hello from server")
})

app.listen(3000 , () => console.log("Server running on PORT:3000"));