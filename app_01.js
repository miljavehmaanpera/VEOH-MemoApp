const http = require("http");

//luodaan serveriobjekti
const server = http.createServer( (req, res)=>{
    console.log(req);
});

//laitetaan käyntii ja kuuntelemaan porttia 8080
server.listen(8080);