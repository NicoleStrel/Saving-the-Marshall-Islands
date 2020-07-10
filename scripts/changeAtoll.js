//Note: 
//  default atoll is Majuro
//  default year is the first in the array

var atollIndex=0;
var yearIndex=0;

export function displayAtoll(){

    var atoll=atolls[atollIndex];
    
    //change all info 
    document.getElementById("name").innerHTML = atoll.name;
    document.getElementById("year").innerHTML = atoll.years[yearIndex];
    document.getElementById("pop").innerHTML = "Population: " +atoll.population +" ("+atoll.popdate+")";
    document.getElementById("loc").innerHTML = atoll.lat+"° N, "+atoll.long+ "° E";
    document.getElementById("elevation").innerHTML="Elevation: "+atoll.elevation+" m";
    document.getElementById("islets").innerHTML=atoll.islets+" islets";
    
    var sea_level_to_msl=atoll.sea_level_to_msl_vals[yearIndex];
    if (sea_level_to_msl>0){
        document.getElementById("sea-level").innerHTML=(sea_level_to_msl*1000).toFixed(2) + "mm above Mean Sea Level";
    }
    else{
        document.getElementById("sea-level").innerHTML=(sea_level_to_msl*1000).toFixed(2) + " mm below Mean Sea Level";
    }
    
}

/*
//--------right arrow button---------
function nextAtoll(){
    atollIndex +=atollIndex;

}

//---------left arrow button---------
function prevAtoll(){

}

//--------scroll, change year-------
function changeYear(){

}
*/

