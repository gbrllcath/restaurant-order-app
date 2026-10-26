import { menuArray } from './data.js'

const orderCard = document.getElementById('order-card')
const orderForm = document.getElementById('order-form')
const orderConfirmation = document.getElementById('order-confirmation')
const modalOverlay = document.getElementById('modal-overlay')
const orderArray = []

// Event Listeners
document.addEventListener('click', function (e) {
    if (e.target.dataset.add) {
        handleAddClick(e.target.dataset.add)
    }

    if (e.target.dataset.minus) {
        handleMinusClick(e.target.dataset.minus)
    }

    if (e.target.dataset.complete) {
        handleCompleteOrderBtn()
    }

})

orderForm.addEventListener('submit', function (e) {
    e.preventDefault()

    modalOverlay.style.display = 'none'
    orderConfirmation.style.display = 'flex'

    const customerName = document.getElementById('name').value
    document.getElementById('confirmation-text').textContent = `Thanks, ${customerName}! Your order is being processed.`

    orderArray.length = 0
    orderForm.reset()
    render()

})



// Handle Clicks
function handleAddClick(itemId) {
    orderConfirmation.style.display = 'none'

    const targetMenuItem = menuArray.filter(function (item) {
        return item.id === Number(itemId)
    })[0]

    const existingOrderItem = orderArray.filter(function (item) {
        return item.id === targetMenuItem.id
    })[0]

    if (existingOrderItem) {
        existingOrderItem.quantity += 1
    } else {
        orderArray.push({
            id: targetMenuItem.id,
            name: targetMenuItem.name,
            price: targetMenuItem.price,
            quantity: 1
        })
    }

    render()
}

function handleMinusClick(itemId) {
    const orderIndex = orderArray.findIndex(function (item) {
        return item.id === Number(itemId)
    })

    if (orderIndex === -1) {
        return
    }

    orderArray[orderIndex].quantity -= 1

    if (orderArray[orderIndex].quantity === 0) {
        orderArray.splice(orderIndex, 1)
    }

    render()
}

function handleCompleteOrderBtn() {
    modalOverlay.style.display = 'flex'
}




// Calculations
function calculateTotalPrice() {
    let totalPrice = 0

    for (let i = 0; i < orderArray.length; i++) {
        totalPrice += orderArray[i].price * orderArray[i].quantity
    }

    return totalPrice
}


// Render menu and ordered items
function render() {
    renderMenu()
    renderOrder()
}

function renderMenu() {
    const menuHtml = menuArray.map(function (item) {
        const orderedItem = orderArray.find(function (orderItem) {
            return orderItem.id === item.id
        })
        
        let minusState = 'disabled'
        if (orderedItem) {
            minusState = ''
        }
        
        return `<div class="food-item">
        <span class="food-img">${item.emoji}</span>
        <div class="menu-text">
        <h3 class="food-name">${item.name}</h3>
        <p class="food-description">${item.ingredients.join(', ')}</p>
        <p class="price">$${item.price}</p>
        </div>    
        <button data-minus="${item.id}" class="minus-btn" ${minusState}>-</button>    
        <button data-add="${item.id}" class="add-btn">+</button>
        </div>`
    }).join('')
    
    document.getElementById('menu-items').innerHTML = menuHtml
}

function renderOrder() {
    const orderHtml = orderArray.map(function (item) {
        return `<div class="order-list">
        <p class="quantity">${item.quantity} x</p>
        <div class="order-item">
        <h3>${item.name}</h3>
        </div>    
        <p class="price">$${item.price * item.quantity}</p>
        </div>`
    }).join('')
    
    document.getElementById('ordered-items').innerHTML = orderHtml
    document.getElementById('total-price').textContent = `$${calculateTotalPrice()}`
    updateOrderCard()
}

// Show and hide ordered items
function updateOrderCard() {
    if (orderArray.length > 0) {
        orderCard.style.display = 'block'
    } else {
        orderCard.style.display = 'none'
    }
}

render()