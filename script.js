// Fetch All Category 


const loadCategory = () =>{
    fetch(`https://openapi.programming-hero.com/api/categories`)
    .then(response=>response.json())
    .then(loadData =>disPlayCategory(loadData.categories))
    
    
}
disPlayCategory = (allCategory) =>{
    const ctg = document.getElementById("all-category");
    ctg.innerHTML = "";
    allCategory.forEach(element => {
        const ctgItem = document.createElement("div");
        ctgItem.innerHTML = `
        <li onclick = "takeCategory('${element.id}')" class="w-full mt-4 text-left rounded-2xl list-none cursor-pointer hover:bg-green-400 p-5 font-semibold">${element.category_name}</li>
        `
        ctg.appendChild(ctgItem);
    });
}
loadCategory();


// Fetch All Trees 

const allTrees = () =>{
    fetch(`https://openapi.programming-hero.com/api/plants`)
    .then(response=>response.json())
    .then(loadData=>disPlayAllTrees(loadData.plants))
}
disPlayAllTrees = (trees) => {
    const containerCard = document.getElementById("container-card");
    containerCard.innerHTML = "";
    trees.forEach(tr =>{
        const len = Math.floor(tr.description.length*(1/2));
        const shortDscp = tr.description.slice(0,len) + ". . .";
        const card = document.createElement("div");
        card.innerHTML = 
        `
        <div class="card bg-white h-[550px] shadow-2xl rounded-2xl ">
       <figure class="h-72 overflow-hidden rounded-t-2xl"> <img  src="${tr.image}"></figure>
        <div class="p-5 space-y-2">
        <h2 onclick="detailsOfCard('${tr.id}')" class="cursor-pointer font-bold text-2xl">${tr.name}</h2>
        <p class="h-20">${shortDscp}</p>
        <div class="flex justify-between">
        <div class="bg-green-400 rounded-2xl">
        <p class="text-green-950 p-2">${tr.category}</p>
        </div>
        <p class=" text-green-700">ট <span class="text-green-700 font-bold text-2xl">${tr.price}</span></p>
        </div>
        <button class="mt-2 bg-green-600 text-white font-bold w-full text-center p-3 rounded-4xl cursor-pointer">Add to Cart</button>
        </div>
        
        </div>
        ` 
        containerCard.appendChild(card);
    })
}
allTrees();

// Modal of tree details


const detailsOfCard = (id) => {
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`).then(response=>response.json()).then(loadData=>displayCardDetails(loadData.plants))
}
displayCardDetails = (details) => {
   console.log(details);
   
   const  cardDetails = document.getElementById("card-details");
    cardDetails.innerHTML =`
    <div class="model-card text-left p-4 bg-white h-[490px] rounded-lg shadow-md overflow-hidden flex flex-col">
    <h1 class="font-bold text-2xl mb-3">${details.name}</h1>
    
    <figure class="h-[80%] mb-3 overflow-hidden flex items-center justify-center bg-gray-100">
        <img class="object-cover w-full h-full" src="${details.image}" alt="${details.name}">
    </figure>
    
    <div class="flex-1 space-y-3">
        <p class="text-gray-800 text-xl"><span class="font-bold">Category :</span> ${details.category}</p>
        <p class="text-gray-800 text-xl"><span class="font-bold">Price :</span> ট${details.price}</p>
        <p class="text-gray-800 text-xl"><span class="font-bold">Description :</span> ${details.description}</p>
    </div>
</div>
    `
    document.getElementById("my_modal_5").showModal();


}


// Category wise Tree  

const takeCategory = (takeCtg) => {
    fetch(`https://openapi.programming-hero.com/api/category/${takeCtg}`)
    .then(response=>response.json())
    .then(loadData=>displayTrees(loadData.plants))
}

displayTrees = (ctg) => {
    const containerCard = document.getElementById("container-card");
    containerCard.innerHTML = "";
    ctg.forEach(ctgDetail => {
        const len = Math.floor(ctgDetail.description.length*(1/2));
        const shortDscp = ctgDetail.description.slice(0,len) + ". . .";
        const card = document.createElement("div");
        card.innerHTML = 
        `
        <div class="card bg-white h-[550px] shadow-2xl rounded-2xl ">
       <figure class="h-72 overflow-hidden rounded-t-2xl"> <img  src="${ctgDetail.image}"></figure>
        <div class="p-5 space-y-2">
        <h2 onclick="detailsOfCard('${ctgDetail.id}')" class="cursor-pointer font-bold text-2xl">${ctgDetail.name}</h2>
        <p class="h-20">${shortDscp}</p>
        <div class="flex justify-between">
        <div class="bg-green-400 rounded-2xl">
        <p class="text-green-950 p-2">${ctgDetail.category}</p>
        </div>
        <p class=" text-green-700">ট <span class="text-green-700 font-bold text-2xl">${ctgDetail.price}</span></p>
        </div>
        <button onclick="addHistory('${ctgDetail.name}','${ctgDetail.price}')" class="mt-2 bg-green-600 text-white font-bold w-full text-center p-3 rounded-4xl cursor-pointer">Add to Cart</button>
        </div>
        
        </div>
        ` 
        containerCard.appendChild(card);
        
    })
}


// Cart History 


const addHistory = (nameTree,priceTree) =>{
     const Alert = document.getElementById("alert-msg");
    document.getElementById("alertblur").style.display = 'block';
     const div = document.createElement("div");
     div.innerHTML = `
      <div class="div-1">
           <p>green-earth-prep.netify.app says</p>
        </div><br>
        <div class="div-2">
          <div class="calling flex gap-3">
              
             <p>${nameTree}</p>
             <p>has been added to the cart.</p>
          </div>
        </div><br>
        <div class="div-3 flex justify-between">
          <div>

          </div>
          <div>
            <button id="OK-btn" class="bg-pink-300 text-black w-16 h-10 rounded-xl">OK</button>
          </div>
        </div>
     `

     Alert.appendChild(div)
     Alert.style.display = 'block';
     const OkBtn = document.getElementById("OK-btn");
     OkBtn.addEventListener("click",function(){
       document.getElementById("alertblur").style.display = 'none';
      Alert.innerHTML ="";
      Alert.style = 'z=-100'
         const add = document.getElementById("yourCart");
        const cart = document.createElement("div");   
        const total = document.getElementById("total");
        let pastTotal;
        let amount = priceTree;
    if(total && add.childElementCount>1){
     pastTotal = parseInt(document.getElementById("amount").innerText);
      total.remove();
    }
   
   cart.innerHTML = `
                 <div class="cartadd flex justify-between items-center rounded-lg bg-[#cff0dc] mt-2">
                        <div class="left p-3">
                            <h2 class="font-bold">${nameTree}</h2>
                            <p class="text-gray-500 ">ট <span>${priceTree}</span> x 1</p>
                         </div>
                         <div class="right pr-3">
                          <button onclick="deleteHistory('${priceTree}','${nameTree}')" class=" text-red-800 font-bold cursor-pointer">X</button>
                         </div>
                    </div>
              
   `
  add.appendChild(cart);
  
  
  if(pastTotal>0){
   amount = pastTotal + parseInt(priceTree);
  }
  
  if (!document.getElementById("total")) {
    const divTotal = document.createElement("div");
    divTotal.innerHTML = `
       <div id="total" class="flex justify-between items-center"> 
        <h1 class =" mt-4 font-bold text-xl">Total : </h1>
        <p id="amount" class =" mt-4 font-bold text-xl">${amount}</p>
       </div>
    `
    add.appendChild(divTotal);

  }

     })



  
  
}

const deleteHistory = (priceTree , nameTree)=>{
    
    // console.log(taka);
    // console.log(fruitName);
    
    
  const cards = document.querySelectorAll(".cartadd");
   for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const fruitPrice = parseInt(card.children[0].children[1].children[0].innerText);
    const reqFruitName = card.children[0].children[0].innerHTML;
    // console.log(fruitPrice);
    // console.log(reqFruitName);
    
    
    if (fruitPrice === parseInt(priceTree) && nameTree === reqFruitName) {
        card.remove();
        const amountTotal = document.getElementById("amount");
        const pastTotal = parseInt(amountTotal.innerText);
        const nowTotal = pastTotal - fruitPrice;
        
        if (parseInt(nowTotal) === 0) {
            const removeTotal = document.getElementById("total");
            removeTotal.remove();
        }
        
        amountTotal.innerText = nowTotal;
        break; 
    }
}
     
     
  }