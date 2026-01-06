let transactions = JSON.parse(localStorage.getItem('transactions'))?? [];

const Elements ={
    balance: document.querySelector('#balance'),
    plus: document.querySelector('#money-plus'),
    minus: document.querySelector('#money-minus'),
    list: document.querySelector('#list'),
    form: document.querySelector('#form'),
    text: document.querySelector('#text'),
    amount: document.querySelector('#amount'),
    loadBtn: document.querySelector('#load-data')
};

const RenderUI = ()=>{
    Elements.list.innerHTML = transactions.length ?
    transactions.map(({id, text, amount})=>{
        const IsIncome = amount > 0;
        return `
        <li class= "${IsIncome ? 'plus': 'minus'}">
        ${text}<span>${IsIncome ? '+': '-'}$${Math.abs(amount).toFixed(2)}</span>
        <button class = "delete-btn" data-id="${id}">x</button>
        </li>
        `
    }).join('')
    :`<p>No Transactions Yet....</p>`
    updateCalculations();
}
const updateCalculations = ()=>{
    const amounts = transactions.map(t=>t.amount);
    const totals = amounts.reduce((acc, curr)=>{
        curr > 0 ? acc.income+=curr : acc.expense+=curr;
        acc.total+=curr;
        return acc;
    },{total:0, income: 0, expense: 0});

    Elements.balance.textContent = `$${totals.total.toFixed(2)}`;
    Elements.plus.textContent = `$${totals.income.toFixed(2)}`;
    Elements.minus.textContent = `$${Math.abs(totals.expense).toFixed(2)}`;
    
    localStorage.setItem('transactions' , JSON.stringify(transactions));
}
const handle = (e)=>{
    e.preventDefault();
    const {value: text} = Elements.text;
    const {value : amt} = Elements.amount;

    if(!text.trim() || !amt.trim()) return alert('Ayyeeeeeeee Kutya! Koi Values To Daal!');

    const newTransactions = {
        id: crypto.randomUUID(),
        text : text,
        amount : Number(amt),
    }
    transactions = [...transactions, newTransactions];
    Elements.form.reset();
    RenderUI();
}
Elements.list.addEventListener("click",({target})=>{
    if(target.classList.contains('delete-btn')){
        const id = target.dataset.id;
        transactions = transactions.filter(t=> t.id !==id);
        RenderUI();
    } 
});
const loadSampleData = async () => {
    try {
        
        const originalText = Elements.loadBtn.textContent;
        Elements.loadBtn.textContent = "Loading Data...";
        Elements.loadBtn.disabled = true;

        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        if (!response.ok) throw new Error("Network issue!");

        const data = await response.json();

        const apiItems = data.slice(0, 3).map(post => ({
            id: crypto.randomUUID(),
            text: post.title.split(' ')[0].toUpperCase(), 
            amount: Math.floor(Math.random() * 500) + 50 
        }));

        transactions = [...transactions, ...apiItems];
        
        RenderUI();
        Elements.loadBtn.textContent = originalText;
        Elements.loadBtn.disabled = false;

    } catch (error) {
        alert("Error loading data: " + error.message);
        Elements.loadBtn.textContent = "Try Again";
        Elements.loadBtn.disabled = false;
    }
};


Elements.list.addEventListener("click", ({target}) => {
    if (target.classList.contains('delete-btn')) {
        const id = target.dataset.id;
        transactions = transactions.filter(t => t.id !== id);
        RenderUI();
    } 
});
Elements.form.addEventListener('submit',handle);
if(Elements.loadBtn) Elements.loadBtn.addEventListener('click', loadSampleData);
document.addEventListener('DOMContentLoaded', RenderUI);