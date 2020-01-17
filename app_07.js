// delete napit tehty ja äät ja ööt laitettu toimimaan

const http = require("http");
const fs = require("fs");

const notes = []; // lisätään tähän myöhemmin kaikki mitä netissä on boksiin kirjoitettu


//luodaan serveriobjekti
const server = http.createServer( (req, res)=>{
    const url = req.url;
    const method = req.method;
    console.log(`HTTP request received: url=${url}, method=${method}`);
//huom eri hipsut että voidaan käyttää dollarimerkkejä ja kirjoittaa noin

    if(url === "/"){
        //tässä eri hipsut kun halutaan kirjoittaa monelle riville
        // utf-8 -rivin lisäksi alempana myös yksi rivi muutos, joka piti tehdä ääkkösiä varten
        res.write(`
        <html>
        <head><title> MemoApp </title>
        <meta http-equiv="Content-Type", content="text/html;charset=UTF-8">
        </head>
        <body>
        `);

        notes.forEach((value, index)=>{
            res.write(`<div> note: ${value}, index: ${index} 
                <form action="delete-note" method="POST">
                <input type="hidden" name="index" value="${index}">
                <button type="submit"> Delete </button>
                </form>
            </div>`);
        });

        res.write(` 
            <form action="add-note" method="POST">
                <input type="text" name="note">
                <button type="submit"> Add note </button>
            </form>

            <form action="delete-note" method="POST">
                <input type="number" name="index">
                <button type="submit"> Delete note </button>
            </form>

        </body>
        
        </html>
        `);
        res.statusCode=200; //tarkoittaa että status on "ok"
        res.end();
        return;
    }

    else if(url === '/delete-note'){
        console.log("/delete-note");

        const chunks = []; // tähän otetaan talteen datapalat
        //lisätään kuuntelija joka kuuntelee aina kun dataa tulee
        req.on("data", (chunk)=>{
            chunks.push(chunk);
        });//kuunnellaan niin kauan kun tavaraa tulee

        req.on("end", ()=>{
            const body = Buffer.concat(chunks).toString();
            const index = body.split("=")[1]; 
            notes.splice(index,1); 

            res.statusCode = 303; //redirect - uudelleenohjaus
            res.setHeader("Location", "/"); //uudelleenohjataan juureen sen jälkeen kun onkirjoittanut boksiin jotain ja lähettänyt sen
            res.end();
            
        });
        return;
    }

    else if(url === '/add-note'){
        console.log("/add-note");
        const chunks = []; // tähän otetaan talteen datapalat
        //lisätään kuuntelija joka kuuntelee aina kun dataa tulee
        req.on("data", (chunk)=>{
            chunks.push(chunk);
        });

        req.on("end", ()=>{
            const body = Buffer.concat(chunks).toString();
            const decoded_body = decodeURIComponent(body); //tämä utf-8 lisäksi, että ää ja ööö toimii
            const note = decoded_body.split("=")[1]; 
            notes.push(note);

            res.statusCode = 303; //redirect - uudelleenohjaus
            res.setHeader("Location", "/"); //uudelleenohjataan juureen sen jälkeen kun onkirjoittanut boksiin jotain ja lähettänyt sen
            res.end();
        });
        return;
    }

    else if(url === "/favicon.ico"){
        fs.readFile("./favicon.ico", (err, data)=>{
            res.write(data);
            res.end();
        });
        return;
    }

    //jos kirjoitetaan nettiin sellainen osoite, jota ei löydy
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