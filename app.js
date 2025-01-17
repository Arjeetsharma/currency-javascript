const BASE_URL= "https://v6.exchangerate-api.com/v6/082f73d35e94ac3667538e22/pair/";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr =document.querySelector(".from select");
const toCurr =document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdowns){
    for (currcode in countryList ){
        let newOption = document.createElement("option");
newOption.innerText=currcode;
newOption.value=currcode;
if(select.name==="from" && currcode==="USD"){
    newOption.selected="selected";
}

  else if (select.name==="to" && currcode==="INR"){
        newOption.selected="selected";
  }
select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}


    const updateFlag=(element)=>{
        let currcode=element.value;
        let countryCode =countryList[currcode];
        let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
        let img=element.parentElement.querySelector("img");
        img.src = newSrc;
    };


    btn.addEventListener("click", async (evt)=>{
        evt.preventDefault(); 
        let amount=document.querySelector(".amount input");
        let amtval=amount.value;
        if(amtval ==="" || amtval<1){
            amtval =1;
            amount.value="1";
        }
        //console.log(fromCurr.value,toCurr.value);
const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}`;
let response = await fetch(URL);
let data = await response.json();
let rate = data.conversion_rate;

let finalAmount = amtval * rate;
msg.innerText=`${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

    });