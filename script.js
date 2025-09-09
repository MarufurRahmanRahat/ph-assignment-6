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
        <li class="w-full mt-4 text-left rounded-2xl list-none cursor-pointer hover:bg-green-400 p-5 font-semibold">${element.category_name}</li>
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