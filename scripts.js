/* GAS API URL */

const GAS_URL = "YOUR_GOOGLE_APP_SCRIPT_URL";


/* 切換步驟 */

function showStep(step){

$(".step").removeClass("active");

$(step).addClass("active");

}


/* Step 控制 */

$("#next1").click(()=>showStep("#step2"));

$("#back1").click(()=>showStep("#step1"));

$("#next2").click(()=>showStep("#step3"));

$("#back2").click(()=>showStep("#step2"));



/* 星星評分 */

function starRating(score){

let stars="";

for(let i=1;i<=5;i++){

if(i<=score){

stars+="<span class='star filled'>⭐</span>";

}else{

stars+="<span class='star'>☆</span>";

}

}

return stars;

}


/* 結果資料 */

let resultData={};



/* 問卷提交 */

$("#healthForm").submit(function(e){

e.preventDefault();

let b=0;
let calcium=0;
let gut=0;

if($("#fatigue").is(":checked")) b+=2;

if($("#insomnia").is(":checked")) b+=1;

if($("#cramp").is(":checked")) calcium+=2;

if($("#constipation").is(":checked")) gut+=3;

b=Math.min(b,5);
calcium=Math.min(calcium,5);
gut=Math.min(gut,5);

let weight=$("#weight").val();
let height=$("#height").val();

let bmi="--";

if(weight && height){

bmi=(weight / Math.pow(height/100,2)).toFixed(1);

}


/* 保存結果 */

resultData={

name:$("#name").val(),
bmi:bmi,
b:b,
calcium:calcium,
gut:gut

};


/* 顯示結果 */

$("#result").html(`

<div class="result-card">

<div class="score">BMI ${bmi}</div>

</div>

<div class="result-card">

B群需求

<div class="stars">

${starRating(b)}

</div>

</div>

<div class="result-card">

鈣需求

<div class="stars">

${starRating(calcium)}

</div>

</div>

<div class="result-card">

腸道需求

<div class="stars">

${starRating(gut)}

</div>

</div>

`);

showStep("#step4");

});



/* 寄送 Email */

$("#sendEmailBtn").click(function(){

const email=$("#emailInput").val();

if(!email){

alert("請輸入Email");

return;

}

fetch(GAS_URL,{

method:"POST",

body:JSON.stringify({

action:"sendMail",

email:email,

result:resultData

})

})

.then(res=>res.text())

.then(()=>{

$("#emailStatus").html("✔ 報告已寄出");

});

});