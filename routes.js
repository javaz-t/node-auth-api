const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method=req.method;
    if (url === '/') {
        res.write('<body><form action="/messege" method="POST"> <input type="text" name="message" /> <button type="submit">Send</button> </form></body>');
        return res.end();
    }
    if (url === '/messege') {
        const body=[];
        req.on('data',(chunk)=>{
           console.log(chunk); //<Buffer 6d 65 73 73 61 67 65 3d 61 61 62 62 63 63 64 64>
           body.push(chunk);
        });
        req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody); //message=aabbccdd
            const message = parsedBody.split("=")[1]; //aabbccdd
          fs.writeFileSync("mssage.txt", message);

        })
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();

    }
    res.setHeader("Content-Type", "text-html")

    res.write("<h1>Hello form node .Js </h1>");
    res.end();
}

module.exports =  requestHandler;
