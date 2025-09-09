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