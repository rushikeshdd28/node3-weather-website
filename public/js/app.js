const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value
    messageOne.textContent = 'Loading....'
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            }
            else{
                messageOne.textContent = data.forecast
                messageTwo.textContent = data.location
            }
        })
    })
    //console.log(location)
})