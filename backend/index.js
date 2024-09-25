const cors = require("cors");
const {app,server}=require("./Socket/server");
const express = require("express");

app.use(cors());
app.use(express.json());

server.listen(5000, () => {
    console.log("server is running on port 5000");
})