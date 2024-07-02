const express = require("express");

const app = express();

require("dotenv").config();

app.get("/", (req, res) => {
    res.send("ola mundo");
    }
);

app.listen(3000, () => {
    console.log(`Server is running on port ${process.env.PORTA}`);
    }
);


