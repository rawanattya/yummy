/// <reference types="../@types/jquery"/>

/* ! ================ Start  sidebar  ================*/

//! Sidebar

$("#open").on("click", function () {
$('#nav').animate({height:'100%'},1000);
$('#sidebar').addClass('fixed-top');
$(".contactNav").animate({ width: "100%" }, 700);
  $("#open").addClass("d-none");
  $("#close").removeClass("d-none");
});

$("#close").on("click", function () {
  $('#nav').animate({height:'0'},1000);
  $('#sidebar').removeClass('fixed-top');
  $(".contactNav").animate({ width: "0" }, 1000);
  $("#close").addClass("d-none");
  $("#open").removeClass("d-none");
});

/* ! ================ end  sidebar  ================*/

/* ! ================ Start Descrabtion  ================*/
//! Global letibles
let rowDesc = document.getElementById("rowDesc");

async function GetDetalis(id) {
  $('.loading').removeClass('d-none');
  let response = await fetch(
  `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let data = await response.json();
  $('.loading').addClass('d-none');
  didpalyGetDetalis(data.meals[0]);
}

function didpalyGetDetalis(data) {
  let recipes=``;
  for(let i=1;i<20;i++){
    if(data[`strIngredient${i}`]){
      recipes+=`<span> ${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}</span>`
    }
  }

 let Tags=data.strTags?.split(",");
 if(!Tags)   Tags=[];
 let TagStr=``;
 for(let i=0;i<Tags.length;i++){
    TagStr+=`
    <span class="h6 soup">${Tags[i]}</span>
    `
 } 

  
  
  let cartonaDetalis = `
          <div class="col-md-4">
            <div class="img border rounded">
              <img class="w-100" src="${data.strMealThumb}" alt="" />
            </div>
            <h1>${data.strMeal}</h1>
          </div>
          <div class="col-md-8">
            <div class="desc my-2">
              <h2>Instructions</h2>
              <p>
                ${data.strInstructions}
              </p>
            </div>
            <div class="d-flex my-2">
              <span class="h3">Area :</span>
              <span class="h3">${data.strArea}</span>
            </div>
            <div class="d-flex my-2">
              <span class="h3">Category :</span>
              <span class="h3">${data.strCategory}</span>
            </div>
            <div class="d-flex my-2">
              <span class="h3">Recipes :</span>
            </div>
            <div class="recipes my-4 d-flex flex-wrap gap-4">
             ${recipes}
            </div>
            <h2 class="h3 ">Tags :</h2>
            <div class="d-flex m-2">
                 ${TagStr}
            </div>
            
            <div class="flex text-white mt-4">
              <a href='  ${data.strSource}' class="h6 source">Source</a>
              <a href='${data.strYoutube}'class="h6 Youtube">Youtube</a>
            </div>
          </div>
    
    
    `;
  rowDesc.innerHTML = cartonaDetalis;
}

/* ! ================ End Descrabtion  ================*/

/* ! ================ Start Home   ================*/
//! Global letibles
let rowData = document.getElementById("rowData");
// ? ==================== Function ====================

async function GetRandomData() {
  $(".loading").removeClass("d-none");
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s"
  );
  let data = await response.json();
  $(".loading").addClass("d-none");
  didpalyRandomData(data.meals);
}

let random;
function didpalyRandomData(data) {
  let cartona = ``;
  for (let i = 0; i < data.length; i++) {
    cartona += `
 <div  class="col-md-3 random">
            <div class="item card">
              <img class="w-100" src="${data[i].strMealThumb}" alt="" />
              <div id='${data[i].idMeal}' class="layer">
                <h3>${data[i].strMeal}</h3>
              </div>
            </div>
          </div>
`;
  }
  rowData.innerHTML = cartona;
   $('.random').on('click',function(e){
    $('#home').addClass('d-none');
    $('#Desc').removeClass('d-none');
    GetDetalis(e.target.id);
   })
   
}

GetRandomData();

/* ! ================ End Home   ================*/



/* ! ================ Start Seach  ================*/
//! Global letibles
let DataSearch = document.getElementById("DataSearch");
let search=document.getElementById('search');
let searchanchor=document.getElementById('searchanchor');
let searchhh=document.getElementById('searchhh');

$('#searchanchor').on('click',function(){
  $('#sidebar').removeClass('fixed-top');
  $('#Category').addClass('d-none');
  $('#search').addClass('d-none');
  $('#contact').addClass('d-none');
  $('#Meals').addClass('d-none');
  $('#Area').addClass('d-none');
  $('#Area2').addClass('d-none');
  $('#Integration').addClass('d-none');
  $('#Integration2').addClass('d-none');
  $("#open").removeClass("d-none");
  $("#close").addClass("d-none");
  $(".contactNav").animate({ width: "0" }, 1000);
  $('#home').addClass('d-none');
  $('#Desc').addClass('d-none');
  $('#search').removeClass('d-none');
}) 



async function SearchName(search){
  $(".loading").removeClass("d-none");
let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
let data=await response.json();
$(".loading").addClass("d-none");
data.meals ? displaydataSearchName(data.meals) : displaydataSearchName([]);
}


function displaydataSearchName(data){
let cartona=``;
for(let i=0;i<data.length;i++){
cartona+=`
       <div class="col-md-3 random">
          <div class="item card my-5">
            <img class="w-100" src="${data[i].strMealThumb}" alt="" />
            <div id='${data[i].idMeal}' class="layer">
              <h3 id='${data[i].idMeal}'>${data[i].strMeal}</h3>
            </div>
          </div>
        </div> 
`
}
  DataSearch.innerHTML=cartona;
  $('.random').on('click',function(e){
   $('#search').addClass('d-none');
   $('#Desc').removeClass('d-none');

   GetDetalis(e.target.id);
  })
}

//! Search By Name
async function SearchNameLitter(search){
search == ""  ? search= "a" : "";
$(".loading").removeClass("d-none");
let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`);
let data=await response.json();
$(".loading").addClass("d-none");
displaydataSearchName(data.meals);
}

searchhh.addEventListener('input',function(){
  let Sear=searchhh.value;
  $('#DataSearch').addClass('d-none');
  SearchName(Sear);
  $('#DataSearch').removeClass('d-none');
})

//!=============================================================
//! Search one character
let Sone=document.getElementById('Sone');
Sone.addEventListener('input',function(){
  let Sear=Sone.value;
  $('#DataSearch').addClass('d-none');
  SearchNameLitter(Sear);
  $('#DataSearch').removeClass('d-none');
})

/* ! ================ End Seach   ================*/

/* ! ================ Start Category  ================*/
//! Global letibles
let CategoryData = document.getElementById("CategoryData");
let Category=document.getElementById('Category');
let Categoryanchor=document.getElementById('Categoryanchor');
$('#Categoryanchor').on('click',function(){
  $('#sidebar').removeClass('fixed-top');
  $('#Category').addClass('d-none');
  $("#search").removeClass("d-none");
  $("#open").removeClass("d-none");
  $("#close").addClass("d-none");
  $('#home').addClass('d-none');
  $('#search').addClass('d-none');
  $('#contact').addClass('d-none');
  $('#Meals').addClass('d-none');
  $('#Area').addClass('d-none');
  $('#Area2').addClass('d-none');
  $('#Integration').addClass('d-none');
  $('#Integration2').addClass('d-none');
  $(".contactNav").animate({ width: "0" }, 1000);
  $('#Desc').addClass('d-none');
  $('#Category').removeClass('d-none');
}) 


async function CatData(){
  let response=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
  let data=await response.json();
  displaydataCategory(data.categories);
}

function displaydataCategory(data){
  if(!data) data=[];
    let cartona=``;
    for(let i=0;i<data.length;i++){
    cartona+=`
          <div class="col-md-4 randomm ">
        <div class="item">
          <img class="w-100" src="${data[i].strCategoryThumb}" alt="" />
          <div  class="layer card  ">
            <h3 >${data[i].strCategory}</h3>
            <p  class='${data[i].strCategory}'>${data[i].strCategoryDescription}</p>
          </div>
        </div>
      </div>
    `
    }
    CategoryData.innerHTML=cartona;

     $('.randomm').on('click',function(e){
      $('#Category').addClass('d-none')
      $('#Meals').removeClass('d-none')
      melsCaT(e.target.className);
      });
}

CatData();

let MealsDdata=document.getElementById('MealsDdata');

async function melsCaT(meal){
  $('.loading').removeClass('d-none');
  let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal}`);
  let data=await response.json();
  displayMeals(data.meals.slice(0,20));
  $('.loading').addClass('d-none');
}

function displayMeals(data){
  if(!data) data=[];
  let cartona=``;
 
    for(let i=0;i<data.length;i++){
     
      cartona+=`
             <div class="col-md-3 random">
              <div class="item card">
                <img class="w-100" src='${data[i].strMealThumb}' />
                <div id='${data[i].idMeal}' class="layer">
                  <h3 id='${data[i].idMeal}'>${data[i].strMeal}</h3>
                </div>
              </div>
            </div>
      `
    }
  



  MealsDdata.innerHTML=cartona;
  $('.random').on('click',function(e){
    $('#Meals').addClass('d-none');
    $('#Desc').removeClass('d-none');
    GetDetalis(e.target.id);
   })
}

/* ! ================ End Category  ================*/

/* ! ================ Start Area  ================*/
//! Global letibles
let AreaData = document.getElementById("AreaData");
let Area=document.getElementById('Area');
let Areaanchor=document.getElementById('Areaanchor');
let AreaDdata2=document.getElementById('AreaDdata2');
let Area2=document.getElementById('Area2');

$('#Areaanchor').on('click',function(){
  $('#sidebar').removeClass('fixed-top');
  
  $('#Category').addClass('d-none');
  $('#search').addClass('d-none');
  $('#contact').addClass('d-none');
  $('#Meals').addClass('d-none');
  $('#Area').addClass('d-none');
  $('#Area2').addClass('d-none');
  $('#Integration').addClass('d-none');
  $('#Integration2').addClass('d-none');
  $("#open").removeClass("d-none");
  $("#close").addClass("d-none");
  $(".contactNav").animate({ width: "0" }, 1000);
  $('#home').addClass('d-none');
  $('#Desc').addClass('d-none');
  $('#Area').removeClass('d-none');
}) 

async function AreaDataa(){
  $(".loading").removeClass("d-none");
  let response=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
  let data=await response.json();
  $(".loading").addClass("d-none");
  displaydataArea(data.meals.slice(0,20));

}

AreaDataa();

function displaydataArea(data){
  if(!data) data=[];

  let cartona=``;
  for(let i=0;i<data.length;i++){
  cartona+=`
        <div class="col-md-4 ">
        <div class="area rounded-2 text-center ">
          <i id='${data[i].strArea}' class="fa-solid fa-house-laptop fa-4x randomm"></i>
          <h3 id='${data[i].strArea}'  class='randomm'>${data[i].strArea}</h3>
        </div>
      </div>
  `
  }
  
  AreaData.innerHTML=cartona;
  $('.randomm').on('click',function(e){
    $('#Area').addClass('d-none')
    $('#Area2').removeClass('d-none')
    AreaMeal(e.target.id);
    }); 
}

 async function AreaMeal(area){
  $('.loading').removeClass('d-none');
  let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  let data=await response.json();
  displayArrea(data.meals);
  $('.loading').addClass('d-none');
}

function displayArrea(data){
  if(!data) data=[];

  let cartona=``;

    for(let i=0;i<data.length;i++){
      cartona+=`
             <div  class="col-md-3   random">
              <div class="item card">
                <img class="w-100" src='${data[i].strMealThumb}' />
                <div id='${data[i].idMeal}' class="layer">
                  <h3 id='${data[i].idMeal}'>${data[i].strMeal}</h3>
                </div>
              </div>
            </div>
      `
    }
  



  AreaDdata2.innerHTML=cartona;

  $('.random').on('click',function(e){
    $('#Area2').addClass('d-none');
    $('#Desc').removeClass('d-none');
    GetDetalis(e.target.id);
   })

}  

/* ! ================ End Area  ================*/

/* ! ================ Start Integration  ================*/
//! Global letibles
let IntegrationData = document.getElementById("IntegrationData");
let Integration=document.getElementById('Integration');
let Integrationanchor=document.getElementById('Integrationanchor');
let Integration2=document.getElementById('Integration2');
let IntegrationData2=document.getElementById('IntegrationData2');


$('#Integrationanchor').on('click',function(){
  $('#sidebar').removeClass('fixed-top');
  $('#Category').addClass('d-none');
  $('#search').addClass('d-none');
  $('#contact').addClass('d-none');
  $('#Meals').addClass('d-none');
  $('#Area').addClass('d-none');
  $('#Area2').addClass('d-none');
  $('#Integration').addClass('d-none');
  $('#Integration2').addClass('d-none');
  $("#open").removeClass("d-none");
  $("#close").addClass("d-none");
  $(".contactNav").animate({ width: "0" }, 1000);
  $('#home').addClass('d-none');
  $('#Desc').addClass('d-none');
  $('#Integration').removeClass('d-none');
}) 

async function IntegrationDataa(){
  $(".loading").removeClass("d-none");
  let response=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  let data=await response.json();
  $(".loading").addClass("d-none");

  displayIntegration(data.meals.slice(0,20))
}


IntegrationDataa();

function displayIntegration(data){
  if(!data) data=[];
  let cartona=``;
  for(let i=0;i<data.length;i++){
  cartona+=`
        <div class="col-md-4 ">
        <div class="area rounded-2 text-center ">
          <i id='${data[i].strIngredient}' class="fa-solid fa-house-laptop fa-4x randommm"></i>
          <h3 id='${data[i].strIngredient}'  class='randommm'>${data[i].strIngredient}</h3>
         <p class='lead'>${data[i].strDescription.split(" ").slice(0,10).join(" ")}</p>
        </div>
      </div>
  `
  }
  
  IntegrationData.innerHTML=cartona;
$('.randommm').on('click',function(e){
    $('#Integration').addClass('d-none')
    $('#Integration2').removeClass('d-none')
    IntegrationMeal(e.target.id);
    }); 
}

async function IntegrationMeal(int){
  $('.loading').removeClass('d-none');
  let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${int}`);
  let data=await response.json();
  displayint(data.meals);
  $('.loading').addClass('d-none');
}


function displayint(data){
  if(!data) data=[];
  let cartona=``;

    for(let i=0;i<data.length;i++){
      cartona+=`
             <div  class="col-md-3  random">
              <div class="item card">
                <img class="w-100" src="${data[i].strMealThumb}" alt="" />
                <div id='${data[i].idMeal}' class="layer">
                  <h3 id='${data[i].idMeal}'>${data[i].strMeal}</h3>
                </div>
              </div>
            </div>
      `
    }




  IntegrationData2.innerHTML=cartona;

   $('.random').on('click',function(e){
    $('#Integration2').addClass('d-none');
    $('#Desc').removeClass('d-none');
    GetDetalis(e.target.id);
   }) 

}  

/* ! ================ End Integration  ================*/

/* ! ================ Start LoadingScreen  ================*/
let loading = document.querySelector(".loading");
/* ! ================ End LoadingScreen  ================*/

/* ! ================ Start ContactUs  ================*/
//! Global letibles
let contactnchor=document.getElementById('contactnchor');
let contact=document.getElementById('contact');
let Name = document.getElementById("Name");
let Email = document.getElementById("Email");
let Phone = document.getElementById("Phone");
let Age = document.getElementById("Age");
let Pass = document.getElementById("Pass");
let Repas = document.getElementById("Repas");
let btn = document.getElementById("btn");
let mName = document.getElementById("mName");
let mEmail = document.getElementById("mEmail");
let mPhone = document.getElementById("mPhone");
let mAge = document.getElementById("mAge");
let mpass = document.getElementById("mpass");
let mRe = document.getElementById("mRe");

function inputsValidtion() {
  if (
    checkName() == true &&
    checkEmaill() == true &&
    CheckPhone() == true &&
    CheckAge() == true &&
    checkPass() == true &&
    Repassowrd() == true
  ) {
    document.getElementById("btn").removeAttribute("disabled");
  } else {
    btn.setAttribute("disabled", true);
  }
}

//!rejex
//! Name
function checkName() {
  let text = Name.value;
  let rejex = /^[a-zA-Z ]{2,30}$/;
  if (rejex.test(text)) {
    Name.classList.add("is-valid");
    Name.classList.remove("is-invalid");
    mName.classList.add("d-none");
    return true;
  } else {
    Name.classList.add("is-invalid");
    Name.classList.remove("is-valid");
    mName.classList.remove("d-none");
    return false;
  }
}

Name.addEventListener("input", function () {
  checkName();
  inputsValidtion();
});

//! Email
function checkEmaill() {
  let text = Email.value;
  let rejex = /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/;
  if (rejex.test(text)) {
    Email.classList.add("is-valid");
    Email.classList.remove("is-invalid");
    mEmail.classList.add("d-none");
    return true;
  } else {
    Email.classList.add("is-invalid");
    Email.classList.remove("is-valid");
    mEmail.classList.remove("d-none");
    return false;
  }
}
Email.addEventListener("input", function () {
  checkEmaill();
  inputsValidtion();
});

//! Age
function CheckAge() {
  let text = Age.value;
  let rejex = /^[1-9]?[0-9]{1}$|^100$/;
  if (rejex.test(text)) {
    Age.classList.add("is-valid");
    Age.classList.remove("is-invalid");
    mAge.classList.add("d-none");
    return true;
  } else {
    Age.classList.add("is-invalid");
    Age.classList.remove("is-valid");
    mAge.classList.remove("d-none");
    return false;
  }
}
Age.addEventListener("input", function () {
  CheckAge();
  inputsValidtion();
});

//! phone
function CheckPhone() {
  let text = Phone.value;
  let rejex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{5})$/g;
  if (rejex.test(text)) {
    Phone.classList.add("is-valid");
    Phone.classList.remove("is-invalid");
    mPhone.classList.add("d-none");
    return true;
  } else {
    Phone.classList.add("is-invalid");
    Phone.classList.remove("is-valid");
    mPhone.classList.remove("d-none");
    return false;
  }
}
Phone.addEventListener("input", function () {
  CheckPhone();
  inputsValidtion();
});

//!Pass
let text;
function checkPass() {
  text = Pass.value;
  let rejex = /^.{8,}$/;
  if (rejex.test(text)) {
    Pass.classList.add("is-valid");
    Pass.classList.remove("is-invalid");
    mpass.classList.add("d-none");
    return true;
  } else {
    Pass.classList.add("is-invalid");
    Pass.classList.remove("is-valid");
    mpass.classList.remove("d-none");
    return false;
  }
}
Pass.addEventListener("input", function () {
  checkPass();
  inputsValidtion();
});

//!Repassowrd
function Repassowrd() {
  let repass = Repas.value;
  if (repass == text) {
    Repas.classList.add("is-valid");
    Repas.classList.remove("is-invalid");
    mRe.classList.add("d-none");
    return true;
  } else {
    Repas.classList.add("is-invalid");
    Repas.classList.remove("is-valid");
    mRe.classList.remove("d-none");
    return false;
  }
}
Repas.addEventListener("input", function () {
  Repassowrd();
  inputsValidtion();
});

$('#contactnchor').on('click',function(){
  $('#sidebar').removeClass('fixed-top');
  $('#search').addClass('d-none');
  $('#contact').addClass('d-none');
  $('#Meals').addClass('d-none');
  $('#Area').addClass('d-none');
  $('#Area2').addClass('d-none');
  $('#Category').addClass('d-none');
  $('#Integration').addClass('d-none');
  $('#Integration2').addClass('d-none');
  $("#open").removeClass("d-none");
  $("#close").addClass("d-none");
  $(".contactNav").animate({ width: "0" }, 1000);
  $('#home').addClass('d-none');
  $('#Desc').addClass('d-none');
  $('#contact').removeClass('d-none');
})

/* ! ================ End ContactUs  ================*/
