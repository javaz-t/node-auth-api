const express =require('express');
const router = express.Router();

router.use('/', (req, res, next) => {
    console.log('Hello express js ');
     res.send('<body> <h1> Hello Express </h1> <form action="/add-product" method="POST"> <button type="submit">Send</button> </form></body>');
});

module.exports =router;