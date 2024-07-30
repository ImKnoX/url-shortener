const express = require('express')
const morgan = require('morgan')
const path = require('path')
const helmet = require('helmet');
const { getOneSlug, createSlug } = require('./services/url.services');

require('dotenv').config()
const port = process.env.PORT || 3000;

const app = express()
app.enable('trust proxy')

app.use(helmet());
app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

const notFoundPath = path.join(__dirname, 'public/404.html');

app.get('/', async(req, res) => {
    res.render('index')
})

app.post('/', async(req, res, next) => {
    const { url } = req.body;
    try {
        const newData = await createSlug({ url })     
        res.json(newData)
    } catch (error) {
        next(error)
    }
})

app.get('/:slug', async(req, res, next) => {
    const { slug } = req.params;
    const results = await getOneSlug(slug)
    try {
      if(slug) {
        return res.redirect(results.url)
      }
      return res.status(404).sendFile(notFoundPath)
    } catch (error) {
        return res.status(404).sendFile(notFoundPath)
    }
})

app.listen(port, (err) => {
    if(err) {
        throw err
    } else {
        console.log(`App is listening at http://localhost:${port}`)
    }
})