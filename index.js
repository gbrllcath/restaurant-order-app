import { menuArray } from '/data.js'

const orderCard = document.getElementById('order-card')
const orderForm = document.getElementById('order-form')
const orderConfirmation = document.getElementById('order-confirmation')
const orderArray = []

// Event Listeners
document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        handleAddClick(e.target.dataset.add)
    }

    if(e.target.dataset.remove){
        handleRemoveBtn(e.target.dataset.remove)
    }

    if(e.target.dataset.complete){
        handleCompleteOrderBtn(e.target.dataset.complete)
    }

})

orderForm.addEventListener('submit', function(e){
    e.preventDefault()

    document.getElementsByClassName('modal-overlay')[0].style.display = 'none'
    orderConfirmation.style.display = 'flex'
    orderCard.style.display = 'none'

    const customerName = document.getElementById('name').value
    document.getElementById('confirmation-text').textContent = `Thanks, ${customerName}! Your order is being processed.`
    
})



// Handle Clicks
function handleAddClick(itemId){
    const targetItem = menuArray.filter(function(item){
        return item.id === Number(itemId)
    })[0]

    orderArray.push(targetItem)

    document.getElementById('ordered-items').innerHTML = renderOrder(orderArray)
    calculateTotalPrice(orderArray)
    updateOrderCard()

}

function handleRemoveBtn(index){
    orderArray.splice(index, 1)

    document.getElementById('ordered-items').innerHTML = renderOrder(orderArray)
    calculateTotalPrice(orderArray)
    updateOrderCard()

}

function handleCompleteOrderBtn(){
    document.getElementsByClassName('modal-overlay')[0].style.display = 'flex'
}


// Calculations
function calculateTotalPrice(orderArray){
    let totalPrice = 0

    for(let i = 0; i < orderArray.length; i++){
        totalPrice += orderArray[i].price
    }

    document.getElementById('total-price').textContent = `$${totalPrice}`
}


// Render menu items
function getMenuHtml(menuArr){
    
    return menuArr.map(function(item){
        return `<div class="food-item">
        <span class="food-img">${item.emoji}</span>
        <div class="menu-text">
        <h3 class="food-name">${item.name}</h3>
        <p class="food-description">${item.ingredients.join(', ')}</p>
        <p class="price">$${item.price}</p>
        </div>
        <button data-add="${item.id}" class="add-btn">+</button>
        </div>`
    }).join('')
    
}

// Render ordered items
function renderOrder(orderArray){
    return orderArray.map(function(item, index){
        return `<div class="order-list">
        <div class="order-item">
        <h3>${item.name}</h3>
        <button data-remove="${index}" class="remove-btn">remove</button>
        </div>
        <p class="price">$${item.price}</p>
        </div>`
    }).join('')
}

// Show and hide ordered items
function updateOrderCard(){
    if (orderArray.length > 0) {
        orderCard.style.display = 'block'
    } else {
        orderCard.style.display = 'none'
    }}



document.getElementById('menu-items').innerHTML = getMenuHtml(menuArray)