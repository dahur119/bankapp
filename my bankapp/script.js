'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2022-05-13T14:11:59.604Z",
    "2022-06-14T17:01:17.194Z",
    "2022-05-15T23:36:17.929Z",
    "2022-08-16T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2022-05-13T14:11:59.604Z",
    "2022-06-14T17:01:17.194Z",
    "2022-05-15T23:36:17.929Z",
    "2022-08-16T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2022-04-01T10:17:24.185Z",
    "2022-05-13T14:11:59.604Z",
    "2022-06-14T17:01:17.194Z",
    "2022-05-15T23:36:17.929Z",
    "2022-08-16T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2022-05-13T14:11:59.604Z",
    "2022-06-14T17:01:17.194Z",
    "2022-05-15T23:36:17.929Z",
    "2022-08-16T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--In');
const labelSumOut = document.querySelector('.summary__value--Out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login-input--user');
const inputLoginPin = document.querySelector('.login-pin--user');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// const movements = [5000, 3400, -150, -790, -3210, -1000, 8500, -30]

// const Euro = 1.1

//  const moves = movements.map(mov => {
//     return mov * Euro
// })
// console.log(moves)

const formateMovementDate= (date, locale) => {

    const calDayPassed = (date1, date2) => Math.abs(date2 - date1)/(1000 * 60 * 60 * 24);   
    const dayPassed = calDayPassed(new Date(), date )
    console.log(dayPassed)
    if(dayPassed === 0) return "Today";
    if(dayPassed === 1) return "yestreday";
    if(dayPassed === 7)return `${dayPassed} day ago`;
    
        // const day =  `${date.getDate()}`.padStart(2,0)s
        //  const month = `${date.getMonth()}`.padStart(2,0)
        //  const year = date.getFullYear()
        return new Intl.DateTimeFormat(locale).format(date)
        

    
             

}

const displayMovement = (acc, sort= false) =>{

    
    containerMovements.innerHTML = "";
    const movs = sort ? acc.movements.slice().sort((a,b)=> a-b) : acc.movements;
    movs.forEach((mov, i)=>{

        const type = mov > 0 ? 'deposit' : 'withdraw'

        const date = new Date(acc.movementsDates[i])
        const displayDate = formateMovementDate(date, acc.locale)

        const html = `
        <div class="movements__row">
        <div class="movements__type movement__type--${type}">${i +1} ${type}
            <div class="movement__date">${displayDate}</div>
            <div class="movement_value">${mov.toFixed(2)}</div>
        </div>
         </div>   
        `;

        containerMovements.insertAdjacentHTML('afterbegin',html)
    
    })
}


const calPorintBal = function(acc){
    acc.balance = acc.movements.reduce((arr, acc)=> arr + acc, 0)
    labelBalance.textContent = acc.balance.toFixed(2)

}; 


const calDisplaySummary = (acc) =>{
    const income = acc.movements.filter(mov => mov > 0).reduce((arr, acc) => arr + acc, 0);
    labelSumIn.textContent = income.toFixed(2);


    const outGoingn= acc.movements.filter(mov=>mov < 0).reduce((arr,acc) => arr+ acc, 0);
    labelSumOut.textContent = `${Math.abs(outGoingn.toFixed(2))}`

    const interest = acc.movements.filter(mov => mov > 0).map(deposit => deposit * acc.interestRate/100)
    .filter((int, i, arr) => int >=1).reduce((arr, int)=> arr + int, 0);
    labelSumInterest.textContent = `${Math.abs(interest.toFixed(2))}`


}


const createUsername = function(accs){ 
    accs.forEach(acc =>{
        acc.username =  acc.owner
        .toLowerCase().split(' ')
        .map(mov=> mov[0])
        .join('')
    })
   
    
   
}
createUsername(accounts)

const updateUi = function(acc){
    displayMovement(acc)

        // display balance 
        calPorintBal(acc)

        // display summary
        calDisplaySummary(acc)

}

let currentAccount;

// currentAccount = account1
// updateUi(currentAccount)
// containerApp.style.opacity = 100;




btnLogin.addEventListener("click", (e)=>{

    // prevent the form from submitting 
    e.preventDefault()
    
    currentAccount=accounts.find((acc)=> acc.username === inputLoginUsername.value)
  

    if(currentAccount && currentAccount.pin === Number(inputLoginPin.value)){
        

        // display welcome in the Ul
        labelWelcome.textContent = `welcome Back${currentAccount.owner.split(" ")[0]}`
        containerApp.style.opacity = 100;
        const news = new Date();
        const options = {
            hour: "numeric",
            minute: "numeric",
            day:"numeric",
            month:"numeric",
            year:"numeric",
            // weekday:"long"

        }
        const locale = navigator.language
        console.log(locale)
        labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(news)
      
        inputCloseUsername.value = '';
        inputLoginPin.value = '';

        inputLoginPin.blur();

        // dispaly movement
        updateUi(currentAccount)
    };
    
} )

btnLoan.addEventListener("click", (e)=>{
    e.preventDefault()
    const amount = inputLoanAmount.value;
    
    if(amount > 0  && currentAccount.movements.some(mov => mov >= amount *0.1  )){

        currentAccount.movements.push(amount)

        updateUi(currentAccount)
    }
    inputLoanAmount.value = ""
})

btnTransfer.addEventListener("click", (e)=>{
    e.preventDefault();
    

    const amount = Math.floor(inputTransferAmount.value);
    const reciverAcc = accounts.find(acc=> acc.username === inputTransferTo.value)
    console.log(amount, reciverAcc)
    inputTransferAmount.value = "";
    inputTransferTo.value = "";

    if(amount > 0 && reciverAcc && currentAccount.balance >= amount && reciverAcc?.username !== currentAccount.username){
        // doing transfer
        currentAccount.movements.push(-amount)
        reciverAcc.movements.push(amount)

        // add transfer date 
        currentAccount.movementsDates.push(new Date())
        reciverAcc.movementsDates.push(new Date())


        updateUi(currentAccount)
        
        

    }
    


})

btnLoan.addEventListener("click", (e)=>{
    e.preventDefault()

    if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value)=== currentAccount.pin){
        
        const index = accounts.findIndex(acc => acc.username === currentAccount.username)
        console.log(index)

        // deleting user
        accounts.splice(index, 1)

        //add loan
        currentAccount.movementsDates.push(new Date().toISOString)

        containerApp.style.opacity = 0;


    }
   
     
})
let sorted = false;
btnSort.addEventListener("click", (e)=>{ 
    e.preventDefault
    displayMovement(currentAccount.movements, !sorted)
    sorted = !sorted
})
// let sum = 0
// const accountMovement= accounts.map(acc => acc.movements).flat().reduce((arr, acc)=> arr + acc, 0)
// console.log(accountMovement)



// international number formattings

const number = 3690798.00
console.log(new Intl.NumberFormat("en-us").format(number))
console.log(new Intl.NumberFormat("de-GB").format(number))
console.log(new Intl.NumberFormat(navigator.language).format(number))


// // sort
// //ascending order
// movements.sort((a,b)=>{
//     if(a >b){
//         return 1
//     }else{
//         (b < a)
//         return -1
//     }
// })
// console.log(movements)

// descending order
// movements.sort((a,b)=>{
//     if(a < b) return -1
//     if(b < a) return 1

// })
// console.log(movements)

// check for equality
// console.log(movemental.includes(-790))


// // check for condition
// const con = movemental.some(ev => ev > 0)
// console.log(con)
// for(const mov of movemental){
//     sum += mov
// }
// console.log(sum)

// getting maximum
// const max = movemental.reduce((arr, acc)=>{
//     if(arr > acc){
//         return arr
//     }else{
//         return acc
//     }
    

// }, movemental[0])
// console.log(max)

const account = accounts.find(acc => acc.owner === "Sarah Smith")
console.log(account)

// const balance = movemental.reduce((acc, cur, i , arr)=>{
//     console.log(`iteration ${i}: ${cur}`)
//     return acc + cur
// }, 0)
// console.log(balance)

// let balance2 = 0
// for (const bal of movemental) {
//     balance2 += bal
// }
// console.log(balance2)
// const deposited = movemental.filter(mov =>{
//     return mov > 0
// })
// console.log(deposited)



// for(const mov of movemental) if(mov > 0) depositor.push(mov)
// console.log(depositor)


// const movesDescription = movements.map((mov,i , arr)=>{
//     `Movement is ${i +1}: ${mov >= 0 ? 'deposited'  :"withdraw"}`

// console.log(movesDescription)

console.log(Math.sqrt(25))
console.log(Math.max(5, 18,19,4,7))
console.log(Math.min(2,17,9,0))

// to find the radius
console.log(Math.PI * Number.parseFloat("10px") *2)

// to generate random number
console.log(Math.trunc(Math.random() * 6)+1)

const randomInt = (min, max)=>Math.trunc(Math.random() * (min-max) +1)
console.log(randomInt(20, 40))

// rounding number 

console.log(Math.round(23.3))
console.log(Math.round(23.9))

// floor can be used both negative and positive number compared to trunc

// console.log(Math.floor(-23.7))
// console.log(Math.floor(23.9))


console.log(5%2)
console.log(6%2)

const isEven = n => n % 2 === 0;
console.log(isEven(2))
console.log(isEven(8))
console.log(isEven(9))


// date 
const future = new Date()
console.log(future.getFullYear())
console.log(future.getHours())
console.log(future.getMonth())
console.log(future.getMinutes())

future.setFullYear(2024)

console.log(future)

const sure = new Date(2037,10,19, 15, 13)
console.log(sure)

//substraction of two date

const calDayPassed = (date1, date2) => Math.abs(date2 - date1) /(1000 * 60 * 60 * 24)
const day1= calDayPassed(new Date(2037,3,14),new Date(2037, 3, 24))
console.log(day1)