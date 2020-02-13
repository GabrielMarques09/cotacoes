console.log('JS na app')

const cotacoesForm = document.querySelector('form')
const mainMensage = document.querySelector('h3')
const price = document.querySelector('.price')
const priceOpen = document.querySelector('.price_open')
const dayHigh = document.querySelector('.day_high')
const dayLow = document.querySelector('.day_low')

cotacoesForm.addEventListener('submit', (event) => {
    mainMensage.innerText = 'buscando...'
    event.preventDefault()
    const ativo = document.querySelector('input').value
    if (!ativo) {
        mainMensage.innerText = 'O ativo deve ser informado !'
        price.innerHTML = null
        priceOpen.innerHTML = null
        dayHigh.innerHTML = null
        dayLow.innerHTML = null
        alert('O ativo deve ser informado')
        return;
    }

    fetch(`/cotacoes?ativo=${ativo}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                mainMensage.innerText = `Erro ${data.error.message} código ${data.error.code}`
                price.innerHTML = null
                priceOpen.innerHTML = null
                dayHigh.innerHTML = null
                dayLow.innerHTML = null
                alert(`Erro ${data.error.message} código ${data.error.code}`)
                console.log(`Erro ${data.error.message} código ${data.error.code}`)
            } else {
                mainMensage.innerText = data.symbol
                price.innerHTML = `Preço: ${data.price}`
                priceOpen.innerHTML = `Preço Abertura: ${data.price_open}`
                dayHigh.innerHTML = `Alta do dia: ${data.day_high}`
                dayLow.innerHTML = `Baixa do dia: ${data.day_low}`
                console.log(data.symbol)
                console.log(data.price_open)
                console.log(data)
            }
        })
    })

})