const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cotacoes = require('./util/cotacao')


const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('views', viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Bem vindo ao sistema de cotações',
        author: 'Gabriel'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Sobre',
        author: 'Gabriel A'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Ajuda',
        author: 'Gabriel'
    })
})

app.get('/cotacoes', (req, res) => {
    if (!req.query.ativo) {
        return res.status(400).json({
            error: {
                message: 'O ativo deve ser informado',
                code: 400
            }
        })

    }

    const symbol = req.query.ativo.toUpperCase()

    cotacoes(symbol, (err, body) => {
        if (err) {
            return res.status(err.code).json({
                error: {
                    message: 'Ativo não encontrado',
                    code: err.code
                }
            })
        }
        console.log(body)
        res.status(200).json(body)
    })


})

app.get('/help/*', (req, res) => {
    //res.send('404')
    res.render('404', {
        title: '404',
        errorMessage: 'Página não encontrada',
        author: 'Gabriel'
    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Página não encontrada',
        author: 'Gabriel'
    })

})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server is up on port ${port}`)
})
