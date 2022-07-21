console.log('client side javaa')

 

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value

    console.log(location)

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?adress=' + location).then((response)=>{
    response.text().then((data)=>{
        
        if(data.includes('error')){
            // messageOne.textContent = data.split(':')[1].replaceAll(`"`, '').replace(`}`, '')
            // messageOne.textContent = console.log(JSON.parse(data))
            // console.log(JSON.parse(data))
            const dataJson = JSON.parse(data)
            messageOne.textContent = dataJson.error

        }else{
            
            messageOne.textContent = data
        }
    })
})


})


//////BOJANOVO RESENJE
// const err = (err)=>{
//     console.log(err)
// }
// fetch('/weather?adress=subotica').then((res)=> res.text() 
//     ).then(res=>{
//     console.log(res)
// }).catch(err)