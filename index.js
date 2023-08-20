const display=document.querySelector('.output-field');
const CounteR=document.querySelector('.counter');
const slideBar=document.querySelector('.slider');
const uppercase=document.querySelector('#UpperCase');
const lowercase=document.querySelector('#LowerCase');
const number=document.querySelector('#Numbers');
const symbol=document.querySelector('#Symbols');
const indicator=document.querySelector('#indicator');
const Genpassword=document.querySelector('.generatE-button');
const allchecks=document.querySelectorAll('input[type=checkbox')
const copyButton=document.querySelector('.fa-copy ');


 let symbols='~`!@#$%^&*()_+-[]"<>?/\|';
let password="";
let passwordlength=10;
let length=slideBar.value;
let color='white'
let checkcount=0;
// Call handleSlider initially
handleSlider();


function handleSlider(){
        slideBar.value=passwordlength;
        CounteR.innerText=passwordlength;
        display.innerHTML=password;
        // indicator.style.backgroundColor=color;
        indicator.classList.add('white');
        
    }
    
    function setIdicator(color){
        indicator.style.backgroundColor=color;
    }
    
    
//     document.addEventListener('DOMContentLoaded', function () {
//         // CounteR.innerHTML = passwordlength;
// });



function getRandomInt(min, max) {

  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getRandomnumber(){
        return getRandomInt(0,9);
}

function getRandomupper(){
        return   String.fromCharCode(getRandomInt(65,90));
    }
    
    function getRandomlower(){
        
        return   String.fromCharCode(getRandomInt(97,122));
}
    
function getRandomsymbol() {
    if (symbol.checked) {
        let index = getRandomInt(0, symbols.length);
        return symbols.charAt(index);
    } else {
        // Return a default character if symbols checkbox is not checked
        return '@'; // You can change this to any default character you like
    }
}






function calindicator(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSymb=false;

    if(uppercase.checked) hasUpper=true ;
    if(lowercase.checked) hasLower=true;
    if(number.checked) hasNum=true;
    if(symbol.checked) hasSymb=true;


    if(hasUpper && hasLower && (hasNum||hasSymb) && passwordlength>=8){
        setIdicator('green');
        indicator.classList.add('green');
        indicator.classList.remove('red');
        indicator.classList.remove('orange');
        indicator.classList.remove('white');
    }

    else if(hasUpper && (hasNum||hasSymb) && passwordlength>=6)
    {
        setIdicator('orange');
        indicator.classList.add('orange');
        indicator.classList.remove('red');
        indicator.classList.remove('green');
        indicator.classList.remove('white');
        
    }
    else{
        setIdicator('red');
        indicator.classList.add('red');
        indicator.classList.remove('green');
        indicator.classList.remove('orange');
        indicator.classList.remove('white');
    }

}
async function copy() {
    try {
        await navigator.clipboard.writeText(display.value); // Fix the typo here
        copyButton.classList.add('fa-bounce');
    } catch (e) {
        alert("Couldn't copy");
    }

    setTimeout(() => {
        copyButton.classList.remove('fa-bounce');
    }, 700);
}


slideBar.addEventListener('input',(e)=>{
    passwordlength=e.target.value;
    handleSlider();
})

copyButton.addEventListener('click',()=>{
    if(display.value)
    copy();
})

function  handlecheckboxchange(){
    checkcount=0;
    allchecks.forEach((checkbox)=>{
        if(checkbox.checked)
        checkcount++;
    })
    if(passwordlength<checkcount){
        passwordlength=checkcount;
        handleSlider();
    }
}

allchecks.forEach ((checkbox) =>{
    checkbox.addEventListener('change', handlecheckboxchange);
})

Genpassword.addEventListener('click', () => {
    if (checkcount === 0) {
        console.log("No checkboxes are checked.");
        return;
    }

    password = ""; // Reset the password

    let funcArr = [];

    if (uppercase.checked) {
        funcArr.push(getRandomupper);
    }

    if (lowercase.checked) {
        funcArr.push(getRandomlower);
    }

    if (number.checked) {
        funcArr.push(getRandomnumber);
    }

    if (symbol.checked) {
        funcArr.push(getRandomsymbol);
    }

    console.log("Generating password...");

    while (password.length < passwordlength) {
        let randmindex = getRandomInt(0, funcArr.length - 1); // Ensure randmindex is within the bounds of funcArr
        if (funcArr[randmindex] && typeof funcArr[randmindex] === 'function') {
            password += funcArr[randmindex]();
        }
    }

    console.log("Generated password:", password);

    display.value = password;
    calindicator();
});
