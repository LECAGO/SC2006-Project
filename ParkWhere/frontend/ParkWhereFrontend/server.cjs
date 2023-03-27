const corsAnywhere = require('cors-anywhere');

const host = 'localhost';
const port = 8080;

corsAnywhere.createServer({
  originWhitelist: [],
}).listen(port, host, () => {
  console.log(`CORS Anywhere server running on ${host}:${port}`);
});