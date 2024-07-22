const express = require("express");
require("dotenv").config();

const rotasUsuarios = require("./routes/rotasUsuarios");
const app = express();

app.use(express.json());




app.use(rotasUsuarios);








// config
app.listen(process.env.PORTA, () => {
    console.log(`Server is running on port ${process.env.PORTA}`);
    }
);


