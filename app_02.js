const http = require("http");

//luodaan serveriobjekti
const server = http.createServer( (req, res)=>{
    const url = req.url;
    const method = req.method;
    console.log(`HTTP request received: url=${url}, method=${method}`);
});

//laitetaan käyntii ja kuuntelemaan porttia 8080
server.listen(8080);