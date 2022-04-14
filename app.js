
const dateTime = document.querySelector('#date-time');
const dateOutput = document.querySelector('#inputDate');
const verButton = document.getElementById('verify');
const nav = document.querySelector('ion-nav')


const offbutton = document.getElementById('off-bttn');

const beerpage = document.getElementById('beer-bttn');
const backHome = document.getElementById('back-home');

const searchBar = document.querySelector('#searchBar')

const searchGo = document.getElementById('search');

const drinksList = document.querySelector('#nameResults');

const customImage = document.getElementById('drink-img');
const saveBttn = document.getElementById('save-drink');
const nameInput = document.querySelector('#name-in');

const faveList = document.querySelector('#favList');

let faveDrinks = new Array();

if(saveBttn){
    saveBttn.addEventListener('click', saveDrink)
}

if(searchGo){
    searchGo.addEventListener('click',getSearchTerm);
};

let url = "";

customElements.define('edit-drink', class  extends HTMLElement{
    connectedCallback(){
        
        this.innerHTML = `
        <style>
    ion-list{
        position:relative;
        top:10px;
        
    }
    ion-item{
        color:white;
        --border-color:white
    }
</style>
<ion-app>
        <ion-content style="--ion-background-color:#35353D">

        <ion-row style="height:87px">
            <ion-col size="2">
             <ion-tab-button id="back-home" href="./cocktails.html">
                 <ion-icon name="arrow-back-outline" size="large" color="success" style="padding-top:10px;font-size:60px"></ion-icon>
             </ion-tab-button>
             
                 
                    
            </ion-col>
            <ion-col >
            <ion-label id="label-name" style="position:relative;left:40px;top:20px;font-size:30px;color:white">${this.selectedDrink.strDrink}</ion-label>
            </ion-col>
        </ion-row> 

        

        <ion-row >
            <ion-col size="4.5">
                <ion-list >
                    <ion-item id="ing1">
                        <p>${this.selectedDrink.strIngredient1}</p>
                    </ion-item>
                    <ion-item id="ing2">
                        <p>${this.selectedDrink.strIngredient2}</p>
                    </ion-item>
                    <ion-item id="ing3"
                        <p>${this.selectedDrink.strIngredient3}</p>
                    </ion-item>
                    <ion-item id="ice">
                        <p>None</p>
                    </ion-item>
                </ion-list>
            </ion-col>
            <ion-col>
                <ion-img id="drink-img" src="${this.selectedDrink.strDrinkThumb}" ></ion-img>
            </ion-col>
            
        </ion-row>

        <ion-card style="background-color:#62626D;padding:10px">
           
                <ion-select id="select-spirit" placeholder="Select Spirit..." style="color:white; font-size: 20px;">
                    <ion-select-option>Gin</ion-select-option>
                    <ion-select-option>Vodka</ion-select-option>
                </ion-select>
                
        </ion-card>

    <ion-radio-group>
    <ion-row>
        <ion-col size="6">
        
            <ion-item >
                <ion-card style="background-color:#62626D;padding:15px">
        
                        <ion-label style="color:white">25ml</ion-label>
                </ion-card>
                   
                        <ion-radio id="25ml-bttn" color="success" style="position:relative;right:40px" slot="end" value="25"></ion-radio>
                    
            </ion-item>
        </ion-col>
        <ion-col size="6">
            <ion-item>
            <ion-card style="background-color:#62626D;padding:15px">
        
                <ion-label style="color:white">50ml</ion-label>
        </ion-card>
                <ion-radio id="50ml-bttn" color="success" style="position:relative;right:40px" slot="end" value="50"></ion-radio>
                
            </ion-item>
            
        </ion-col>
    </ion-row>
    <ion-radio-group>
        <ion-card style="background-color:#62626D;padding:10px">
       
        <ion-select placeholder="Second Spirit..." id="select-spirit-2" style="color:white; font-size: 20px;">
            <ion-select-option>Gin</ion-select-option>
        </ion-select>

        </ion-card>
    
        <ion-card style="background-color:#62626D;padding:10px">
           
            <ion-select placeholder="Select Mixer..." id="select-mixer" style="color:white; font-size: 20px;">
                <ion-select-option>Coca Cola</ion-select-option>
            </ion-select>
        
        </ion-card>
        <ion-card style="background-color:#62626D;padding:10px">
           
            <ion-select placeholder="Select Ice..." id="select-ice" style="color:white; font-size: 20px;">
                <ion-select-option>Crushed</ion-select-option>
                <ion-select-option>Cubed</ion-select-option>
                <ion-select-option>None</ion-select-option>
            </ion-select>
        
        </ion-card>
        <ion-button size="large" color="success" style="display:block;margin-left:20px;margin-right:20px">Pour</ion-button>
    </ion-content>
    </ion-app>
    
    `}
    
    })
    if(dateTime){
    dateTime.addEventListener('ionChange', changeDate);
}
    function changeDate(){
           
        let date = new Date(dateTime.value )
        
        var newDate =date.toString().substring(0,16)   
        dateOutput.textContent = newDate;
        verButton.addEventListener('click',checkDate)
        return date;
    }
    
    
    function checkDate(date){
        var today = new Date();
        var validDate = new Date(
            today.getFullYear() -18,
            today.getMonth(),
            today.getDate()
           
    
        );
        date = changeDate(date)
        let numValid = new Date(validDate).getTime();
        let numDate = new Date(date).getTime();
        
        console.log(numValid)
        console.log(date)
        if(numDate <numValid){
            console.log("yes")
            window.location.href="./home.html"
        }
        else{
            console.log("no")
            handleAlert();
            
        }
        
    }
    async function handleAlert(){
        const alert = await alertController.create({
            header: 'Sorry!',
              message: 'You are not old enough to enter',
              buttons: ['Okay'],
        });
        await alert.present();
    }
    
var op= 1;
var intervalID = 0;

if(offbutton){
    offbutton.addEventListener('click',fadeOut);
};

function clearList(){
    while(drinksList.lastElementChild){
    drinksList.removeChild(drinksList.lastElementChild)}
}

function getSearchTerm(){
    
    let cocktailName = searchBar.value
    console.log(searchBar.value);
    findResult(cocktailName);
    return cocktailName;
    
}

function findResult(cocktailName){
    clearList();
    url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`
    console.log(url);
    
    
    fetch(url).then(function(response){
        return response.json();

    }).then(function(response){
        var data = response;
        console.log(data);
        return data.drinks.map(function(drink){
            var drinkName = document.createElement('ion-item');
            
            
            drinkName.innerHTML = drink.strDrink;
            
            
            drinksList.appendChild(drinkName)
            drinkName.onclick = function(){
                var nameOfDrink = drinkName.textContent;
                console.log(drinkName.textContent)
                showDetail(nameOfDrink);
                return nameOfDrink
            };
           
            console.log(cocktailName)
            return drinkName,response,cocktailName;
        })
})
    
}

function fadeOut(){
    setInterval(hide,200);
}

function hide(){
    
    if(op >= 0){
        op = op - 0.3;
        document.querySelector('body').style.opacity = op ;        
    }

    else{
        clearInterval(intervalID);
    }
}
function updateData(spirit){
    
    const ingredient1 = document.querySelector('#ing1');
    ingredient1.textContent = spirit.detail.value;
    let FirstIng = ingredient1.textContent;

        if ( document.URL.includes("cocktails.html") || document.URL.includes("searchresults.html")) {
             }
        else{        
        customImage.src = "./images/emp1.png";
        };
        return FirstIng;
}
function updateMixer(mixer){
    const ingredient2 = document.querySelector('#ing3');
    ingredient2.textContent = mixer.detail.value;
     
    let Mixer = ingredient2.textContent;
    if(document.URL.includes("cocktails.html") || document.URL.includes("searchresults.html")){
        return
    }
    else{
        customImage.src = "./images/emp3.png";
    }
    return Mixer,ingredient2;
}
function updateIce(ice){
    console.log(ice.detail.value)
    let iceSelect = document.querySelector('#ice');
    iceSelect.textContent = ice.detail.value;

    let IceOption = iceSelect.textContent;
    console.log(ice.detail.value)

    if(document.URL.includes("cocktails.html")|| document.URL.includes("searchresults.html")){
        return
    }
    else{
        
        
        if (ice.detail.value === "Cubed"){
            console.log(ice.detail.value)
            customImage.src = "./images/cube.png";
        }
        else if(ice.detail.value === "Crushed") {
            
            customImage.src = "./images/crush.png";
    
        }
        else if(ice.detail.value === null){
            customImage.src="./images/empty.png";
        }
    }
    return IceOption;
}

function updateSpirit2(spirit2){
    const ingredient3 = document.querySelector('#ing2');
    ingredient3.textContent = spirit2.detail.value;

    let SecondIng = ingredient3.textContent;
    if(document.URL.includes("cocktails.html")|| document.URL.includes("searchresults.html")){
        return
    }
    else{
    customImage.src = "./images/emp2.png";}
    return SecondIng, ingredient3;
}

function custom(){
    const spirit = document.querySelector('#select-spirit');
    const mixer = document.querySelector('#select-mixer');
    const spirit2 = document.querySelector('#select-spirit-2');
    const ice = document.querySelector('#select-ice');
        
        spirit.addEventListener('ionChange',updateData);
        
        
        mixer.addEventListener('ionChange',updateMixer);
        
        
        ice.addEventListener('ionChange',updateIce);
        

        if(spirit2){
            spirit2.addEventListener('ionChange', updateSpirit2);
        }
    const link = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"
    
    fetch(link).then(function(response){
        return response.json();
    }).then(function(response){
        var ings = response;
        console.log(ings);
        return ings.drinks.map(function(ings){
            var newItem = document.createElement('ion-select-option');
            newItem.innerHTML = ings.strIngredient1;

            spirit.appendChild(newItem);
            var newItem2 = newItem.cloneNode(true);
            mixer.appendChild(newItem2);
            var newItem3 = newItem2.cloneNode(true);
            spirit2.appendChild(newItem3)
            
            return newItem,response;
        })
    })
}
    



function showDetail(nameOfDrink){
    
    const api = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nameOfDrink}`
    
    
    fetch(api).then(function(response){
        return response.json();

    }).then(function (response){
        
            var selectedDrink = response.drinks[0];
            console.log(selectedDrink);
            nav.push('edit-drink',{selectedDrink});
            
    }).then(custom)
   
    };


function saveDrink(){
    
    if (nameInput.value != ""){
        
        if(localStorage.getItem('favDr') === null ){
            localStorage.setItem('favDr', JSON.stringify(faveDrinks))
        }
        let spirit1 = document.querySelector('#ing1');
        let spirit2 = document.querySelector('#ing2');
        let mixer = document.querySelector('#ing3');
        let ice = document.querySelector('#ice');
        
        let newDrink = {name: nameInput.value, spirit1: spirit1.textContent, spirit2: spirit2.textContent, Mixer: mixer.textContent, Ice: ice.textContent}
        
        faveDrinks =  JSON.parse(localStorage.getItem('favDr'));
        faveDrinks.push(newDrink);
        localStorage.setItem('favDr', JSON.stringify(faveDrinks))
        console.log(faveDrinks)
       

    }
    else{
        return;
    }
    
    
}

function showFaves(){
    faveDrinks =  JSON.parse(localStorage.getItem('favDr'));
    console.log(faveDrinks)
    faveDrinks.map(function(item){
        newListItem = document.createElement('ion-item');
        newListItem.innerHTML = item.name;
        faveList.appendChild(newListItem);

    })
    
        
    }
