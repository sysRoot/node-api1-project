// implement your API here
const api = require('./server')

console.log(api)

const port = process.env.PORT || 5050

api.listen(port, console.log(`Listening on port ${port}`));