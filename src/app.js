const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { query } = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

////////////////////////////////////////////////////////////////Define paths for Express Config/////////////////////////////////////////////////////////////////////////
const pathPublicDir = path.join(__dirname, '../public')
const pathViewsDir = path.join(__dirname, '../templates/views')
const pathPartialsDir = path.join(__dirname, '../templates/partials')

////////////////////////////////////////////////////////////////Setup handlebars engine and views location/////////////////////////////////////////////////////////////////////////
app.set('views', pathViewsDir)
app.set('view engine', 'hbs')
hbs.registerPartials(pathPartialsDir)


// app.set('views', path.join(__dirname, '../views'))/////////////prethodni nacin, tj alternativno resenje za pristupanje views folderu na razlicitim lokacijama///////////////////////////////////
app.use(express.static(pathPublicDir))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'radovanrasha'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About page',
        name: 'radovanrasha',
        year: '2022',
        lang: 'nodeJS'
    })
}
)

app.get('/help', (req, res)=>{
    res.render('help', {
        helpMess: 'this is normal help message that is supose to help u with all problems',
        title: 'Help page',
        name: 'radovanrasha'
    })
})




////////////////////////////////////////////////////STARI NACIN PRISTUPA STRANICAMA//////////////////////////////////////
// app.get('', (req, res)=>{          /////req je skracenica za request a res skracenica za response/////
//     res.send('<h1>Content</h1>')
// })

// app.get('/help', (req, res)=>{
//     res.send([{name: 'radovanrasha',
//         age: 23},{name: '1vvnv',
//         age: 24}])
// })

// app.get('/about', (req, res)=>{
//     res.send('<h1>LARGE HTML TITLE ABOUT</h1>')
// })

app.get('/weather', (req, res)=>{
    if(!req.query.adress){
        return res.send({
            error: 'please enter adress'
        })
    }

    geocode(req.query.adress, (error, {latitude , longitude, location} = {})=>{
        if(error){
            return res.send({
                error
            })
        }

    forecast(latitude, longitude, (error, data)=>{
        if(error){
            return res.send({
                error
            })
        }else{
            res.send(data)
        }
        
    })

    })

    
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        res.send({
            error: error
        })
    }else{
        console.log(req.query.search)
        res.send({
            products: []
        })
    }
    
    
})


app.get('/help/*', (req, res)=>{
    res.render('404page', {
        errorMess: 'You are trying to access to subdir of Help page but that page doesnt exist. Please enter valid URL or try using header',
        title: '404 PAGE FOR HELP',
        name: 'radovanrasha'
    })
})

app.get('*', (req, res)=>{
    res.render('404page', {
        errorMess: 'You are trying to access to page that doesnt exist. Please enter valid URL or try using header',
        title: '404 PAGE',
        name: 'radovanrasha'
    })
})

app.listen(port, ()=>{
    console.log('Server is up at port' + port)
})