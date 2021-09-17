/*
Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth. If you feel as though your API key has been compromised, you can generate a new key at any time.

Authentication to the API is performed via the X-Api-Key header. Provide your API key in the headers of all requests to authenticate to the Pokémon TCG API.

Ask : Where dfq do you store it then?
*/

const searchbox = document.querySelector("#searchbox");
const cardwrapper = document.querySelector(".card-wrapper");
const cardtemplate = document.querySelector("#card-template")
console.log(cardtemplate);

//Update the DOM with data pulled from API
function updateDOM(cdata){
    // Clear wrapper
    cardwrapper.innerHTML="";

    // Start updating
    for(const data of cdata.data){
        let temp = cardtemplate.content.cloneNode(true);
        // temp.querySelector(".card-volume p").innerHTML = data.set.printedTotal ? data.set.printedTotal : " - "; 
        temp.querySelector("#cardimage").src = data.images.small;
        temp.querySelector(".card-name").innerHTML = data.name + " | " + data.rarity; 
        temp.querySelector("#averagep").innerHTML = `Average <br> \$${data.cardmarket.prices.averageSellPrice ? data.cardmarket.prices.averageSellPrice : " - "}`;
        temp.querySelector("#lowestp").innerHTML = `Lowest <br> \$${data.cardmarket.prices.lowPrice ? data.cardmarket.prices.lowPrice : " - "}`;
        temp.querySelector("#trendp").innerHTML = `Trend <br> \$${data.cardmarket.prices.trendPrice ? data.cardmarket.prices.trendPrice : " - "}`;
        temp.querySelector("#volumep").innerHTML = `Volume <br> ${data.set.printedTotal ? data.set.printedTotal : " - "}`;

        cardwrapper.appendChild(temp);
    }
}

//Generate Initial Page
async function generatePage(){
    // Clear wrapper
    cardwrapper.innerHTML="";
    
    // Create Query
    const url = new URL("https://api.pokemontcg.io/v2/cards");
    url.search=new URLSearchParams({page:1, pageSize:50});

    // Fetch Query
    const cards = await fetch(url, {headers: {'X-Api-Key':'09d6175e-d838-46d0-b442-14e3c4ecf372'}});
    const cdata = await cards.json();
    console.log(cdata);

    updateDOM(cdata);
}

//Fetch the results from API
async function fetchResults(){
    
    // Create Query
    const searchname = document.querySelector("#searchname").value;
    const url = new URL("https://api.pokemontcg.io/v2/cards");
    url.search=new URLSearchParams({page:1, pageSize:50, q: `name:${searchname}*`});

    // Fetch Query
    const cards = await fetch(url, {headers: {'X-Api-Key':'09d6175e-d838-46d0-b442-14e3c4ecf372'}});
    const cdata = await cards.json();
    console.log(cdata);

    // Create DOM
    updateDOM(cdata);
}

//Wrapper for Handling Errors
function updateResults(){
    fetchResults().catch(error => {
        console.log("error");
        console.log(error);
    });
}

//Run fetchResults when Press Enter in input
function runSearch(e){
    if (e.key=="Enter"){
        fetchResults();
    }
}

// Generate Page
generatePage();