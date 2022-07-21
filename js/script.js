const cart = []
//Renderiza os produtos na vitrine
function listProducts(database) {
    document.querySelector('.cards').innerHTML = ''
    for (let i in database)
        document.querySelector('.cards').insertAdjacentHTML('beforeend', `
            <li id="${database[i].id}">
                <figure style="background-image: url(./img/${database[i].image});">
                    <div>
                        <span>${database[i].tag}</span>
                    </div>
                </figure>
                <section>
                    <h1>${database[i].title}</h1>
                    <p class="desc">${database[i].desc}</p>
                    <p class="price">R$${database[i].price.toFixed(2).toString().replace('.', ',')}</p>
                    <button onclick="addClick(event)">Adicionar ao carrinho</button>
                </section>
            </li>
            `)
}

listProducts(data)

//Renderiza os itens no carrinho
function listCart() {
    document.querySelector('.cart').innerHTML = ''
    let total = 0
    let quantidade = 0
    for (let i in cart) {
        let productPrice = cart[i].price.toFixed(2).toString().replace('.', ',')
        if (cart[i].count > 1) { productPrice += ' x' + cart[i].count }
        total += cart[i].price * cart[i].count
        quantidade += cart[i].count
        document.querySelector('.cart').insertAdjacentHTML('beforeend', `
        <li id="${cart[i].id}">
            <figure>
                <img src="./img/${cart[i].image}" alt="">
            </figure>
            <section>
                <h2>${cart[i].title}</h2>
                <p class="price">R$${productPrice}</p>
                <button onclick="removeClick(event)">Remover Produto</button>
            </section>
        </li>
    `)
    }
    qtd.innerText = quantidade
    val.innerText = 'R$' + total.toFixed(2).toString().replace('.', ',')
}

function addClick(event) {
    //Recebe o índice do produto selecionado
    let index = (event.target.parentNode.parentNode.id)
    
    //Localiza o produto no database
    const product = data.find(el => el.id == index)

    //Adiciona novo produto ao array do carrinho ou soma quantidade se já existir   
    let j = -1
    cart.forEach((el, i) => el.id == product.id ? j = i : false)
    if (j > -1)
        cart[j]['count']++
    else {
        product['count'] = 1
        cart.push(product)
    }

    //Lista o carrinho
    listCart()
}

function removeClick(event) {
    //Recebe o índice do produto selecionado
    let index = -1
    cart.forEach((el, i) => el.id == event.target.parentNode.parentNode.id ? index = i : false)

    //Remove os produtos conforme quantidade
    cart[index].count > 1 ? cart[index].count-- : cart.splice(index, 1)

    //Lista o carrinho
    listCart()
}

// Filtra para exibir os itens cuja tag é igual o título clicado
document.querySelector('.tagMenu').addEventListener('click', function (event) {
    if (event.target.tagName == 'A') {
        if (event.target.innerText == 'TODOS')
            listProducts(data)
        else
            listProducts(data.filter(el => el.tag.toUpperCase() == event.target.innerText))
    }
})

// Filtra o título do card conforme o texto digitado
function searchClick() {
   listProducts(data.filter(el => el.title.toLowerCase().includes(searchbox.value.toLowerCase())))
}