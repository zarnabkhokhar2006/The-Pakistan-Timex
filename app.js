let key ="d9ffad79bb59466ca21162949f913f17";
let cardData = document.querySelector(".cardData");

const getData = async() =>{
    let res = await fetch  ('');
    
    let jsonData = await res.json();
    console.log(jsonData.articles[0]);
    jsonData.articles.forEach(function(){
        console.log();

    });

    let divs = document.createElement("div");
    divs.classList.add("card");
    cardData.appendChild(divs);

   
     divs.innerHTML = `
            <img src="${jsonData.article[0].urlToImage}
           
               
        `;
        

    
}
getData();