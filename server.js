const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const port = 3000

app.use(cors());
app.use(morgan('tiny'))
app.use(express.json())

app.get('/fail', (req, res, next) => {
    const a = null;
    console.log("fail")
    try {
        a.map()
    } catch(e) {
        const newError = new Error("Map failed :(")
        newError.status = 999;
        throw newError
    }
    res.send('Fail')
  })



app.post('/', (req, res) => {
    console.log(req.body);
    res.send({"world":"hello"})
  })

  app.use((req, res, next) => {
    const e = new Error("Not handled elsewhere")
    e.status = 404;
    next(e)
    
  })

// generic error handler
app.use((error, req, res, next) => {
    console.error(error.message, error.status)

    res.status(error.status).send({msg: error.message})
  })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})