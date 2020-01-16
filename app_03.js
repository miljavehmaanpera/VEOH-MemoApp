const http = require("http");

//luodaan serveriobjekti
const server = http.createServer( (req, res)=>{
    const url = req.url;
    const method = req.method;
    console.log(`HTTP request received: url=${url}, method=${method}`);
//huom eri hipsut

    if(url === "/"){
        res.write(`
        <html>
        <head><title> MemoApp </title></head>
        
        <body>
            <form action="add-note" method="POST">
                <input type="text" name="note">
                <button type="submit"> Add note </button>
            </form>
        </body>
        
        </html>
        `);
        res.statusCode=200; //tarkoittaa että status on "ok"
        res.end();
        return;
    }

    //jos kirjoitetaan nettiin sellainen osoite, jota ei löyty
    console.log(`${url} not found`);
    res.write(`
    
    <html>
        <head><title> MemoApp - 404 </title></head>
        
        <body>
            <h1>404 - page not found </h1>
        </body>
        
        </html>

    `);

    res.statusCode=404;//not found
    res.end();

});

//laitetaan käyntii ja kuuntelemaan porttia 8080
server.listen(8080);

// voidaan käydä aina kokeilemassa netissä, 
//osoitteeksi kirjoitetaan localhost:8080