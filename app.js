const offbutton = document.getElementById('off-bttn');
const searchbutton = document.getElementById('search-bttn');
const beerpage = document.getElementById('beer-bttn');
const backHome = document.getElementById('back-home');


searchbutton.addEventListener('click',showSearch)

// const url = "www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007";

// fetch(url).then(getData);

// async function getData(aResponse){
//     const data = await aResponse.json();
//     console.log(data);
//     return data;
// }


var op= 1;
var intervalID = 0;

offbutton.addEventListener('click',fadeOut);







function fadeOut(){
    setInterval(hide,200);
}

function hide(){
    
    if(op >= 0){
        op = op - 0.3;
        document.getElementById('body').style.opacity = op ;        
    }

    else{
        clearInterval(intervalID);
    }
}





const nav = document.querySelector('ion-nav')
function showDetail(){
    nav.push('edit-drink')
    customElements.define('edit-drink', class NavDetail extends HTMLElement{
        connectedCallback(){
            this.innerHTML = `
            <style>
        ion-list{
            position:relative;
            top:50px;
            
        }
        ion-item{
            color:white;
            --border-color:white
        }
    </style>
            <ion-content style="--ion-background-color:#35353D">
    
            <ion-row style="height:75px">
                <ion-col size="3">
                <ion-tab-button id="back-home" href="./cocktails.html">
                    <ion-icon name="arrow-back-outline" size="large" color="success" style="padding-top:10px;font-size:60px"></ion-icon>
                </ion-tab-button>
            
                     
                        
                </ion-col>
                <ion-label  style="position:relative;left:40px;top:20px;font-size:30px;color:white">Vodka Coke</ion-label>
            </ion-row> 
            
    
            <ion-row >
                <ion-col size="4.5">
                    <ion-list >
                        <ion-item>
                            <p>@spirit</p>
                        </ion-item>
                        <ion-item>
                            <p>@mixer</p>
                        </ion-item>
                        <ion-item>
                            <p>@ice</p>
                        </ion-item>
                    </ion-list>
                </ion-col>
                <ion-col>
                    <ion-img id="drink-img" src="images/rumncoke.png"></ion-img>
                </ion-col>
                
            </ion-row>
    
            <ion-card style="background-color:#62626D;padding:10px">
               
                        <ion-select placeholder="Select Spirit..." id="select-spirit" style="color:white; font-size: 20px;">
                            <ion-select-option>Gin</ion-select-option>
                        </ion-select>
                    
            </ion-card>
    
    
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
        
            <ion-card style="background-color:#62626D;padding:10px">
               
                <ion-select placeholder="Select Mixer..." id="select-mixer" style="color:white; font-size: 20px;">
                    <ion-select-option>Coca Cola</ion-select-option>
                </ion-select>
            
            </ion-card>
            <ion-card style="background-color:#62626D;padding:10px">
               
                <ion-select placeholder="Select Ice..." id="select-ice" style="color:white; font-size: 20px;">
                    <ion-select-option>Crushed</ion-select-option>
                </ion-select>
            
            </ion-card>
        </ion-content>`}
    })
}

function showSearch(){
    nav.push('search-page')
    
    customElements.define('search-page', class extends HTMLElement{
        connectedCallback(){
            this.innerHTML = `
            <style>
        ion-item{
            color:white;
            --border-color:rgb(196, 196, 196);
        }
    </style>
            <ion-header position="static" style="background-color: #62626D; height:80px">
            
            <ion-row>
                <ion-col size="2">
                    <ion-tab-button id="back-home" href="./home.html">
                        <ion-icon name="arrow-back-outline" color="success" style="font-size:40px"></ion-icon>
                    </ion-tab-button>
                </ion-col>
                <ion-col size="9">
                    <ion-searchbar></ion-searchbar>
                </ion-col>
                    
                    
               
            </ion-row>
            
        </ion-header>
        <ion-content style="--ion-background-color:#35353D">

            <ion-list display="block">
                <ion-item>
                    

                </ion-item>
                <ion-item>
                    
                </ion-item>
                <ion-item>
                    
                </ion-item>
                <ion-item>
                    
                </ion-item>
                <ion-item>
                    
                </ion-item>
            </ion-list>
        
        </ion-content>`

}
    }
    )};