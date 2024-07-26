const balance = document.getElementById('balance')
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')


// const dummyTransactions = [
//     {id:1, text: 'say gex', amount: -20},
//     {id:2, text: 'corn hub sub', amount: -50},
//     {id:3, text: 'slave sell', amount: +70},
//     {id:4, text: 'slave buy', amount: -30},
//     {id:5, text: 'sell organs', amount: +35}
// ]



let localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));


let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions: [];





// add transaction
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('please add a text TwT');
    } else{
        const transaction = {
            id: GenerateID(),
            text: text.value,
            amount: +amount.value
        }

        transactions.push(transaction);

        addTransacctionDOM(transaction);

        updateValues()

        updateLocalStorage();
    }
}

// Generate random ID
function GenerateID(){
    return Math.floor(Math.random() * 100000000)
}


// Add transactions to DOM list

function addTransacctionDOM(transaction){
    // Get sign
    const sign = transaction.amount < 0 ? '-':'+';
    //js use kore li element banabo 
    const item = document.createElement('li')

    // value plus ki minus shei hishab dekhe amra oi element er class add korbo.
    item.classList.add(transaction.amount < 0? 'minus' : 'plus')

    // amra jei list element banailam oita item namer ekta datatype e rakhsi ar oi datatype e amra dynamic vabe text + value add korbo with the use of (`` ebong ${})
    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}taka</span><button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;
    // amra jei dynamic vabe text + amount add korlam item var e sheita amra ekhon list div er vetor e append korbo
    list.appendChild(item);
}


// Update the balance income & expense
function updateValues(){
    // amounts var e amra transactions(er vetor dummytransactions ase) k map korbo j& oi map er vetor ekta arrow function use korbo jeno each transaction theke amount ta niye ekta array pai.
    const amounts = transactions.map(transaction => transaction.amount)
    
    // to check j amra amounts e new array paisi kina
    // console.log("amounts er array: ")
    // console.log(amounts)

    // ebar amount total korbo
    // total amount pawar jonno amra reduce method use korsi and tofixed use korsi jeno last e duita decimal number pai(reduce method bojar jonno read my note)
    const total = amounts.reduce((acc, item) => (acc+=item),0).toFixed(0);
    // lets check j total hoise kina
    // console.log(total)


    // ebar income ta ber korbo
    const income = amounts
                .filter(item => item > 0)
                .reduce((acc,item)=> (acc += item), 0)
                .toFixed(0)
    // income check korbo
    // console.log(income)

    // ebar expense ber korbo
    const expense = (amounts
    .filter(item => item < 0)
    .reduce((acc,item)=>(acc += item),0) * -1).toFixed(0);

    // expense check korbo
    // console.log(expense)

    balance.innerText = `${total}taka`;
    money_plus.innerText = `${income}taka`;
    money_minus.innerText = `${expense}taka`

}


// remove transaction by ID
function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();

    init();
}


// update local storage transactions
function updateLocalStorage(){
    localStorage.setItem('transactions', JSON.stringify(transactions))
}




// Init app
function init(){
    // clear korbo list ta
    list.innerHTML = '';

    // transactions er vetor amra dummytransactions store korsilam oi gula amra foreach loop through kore single single transaction e nawar try korbo
    transactions.forEach(addTransacctionDOM)


    // updatevalue function k call
    updateValues();
}

init()



form.addEventListener('submit', addTransaction)

