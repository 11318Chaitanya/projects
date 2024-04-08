const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')

const authroutes = require('./routes/auth');

const app = express();
const port = 5000;



app.use(cors())

app.use(express.json());

//Available routes
app.use('/api/auth', authroutes);
app.use('/api/notes', require('./routes/notes'));

// app.get('/', (req, res) => {
//   res.send('Hello World LoL!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

connectToMongo();