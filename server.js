const http = require("http");

const server = http.createServer((req, res) => {

  // CORS HEADERS (IMPORTANT)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Hello from EC2 API!" }));
  }

});

server.listen(80, () => {
  console.log("Server running on port 80");
});
