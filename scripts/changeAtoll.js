//Note: 
//  default atoll is Majuro
//  default year is the first in the array

//--------right arrow button---------
function nextAtoll(){
    if (atollIndex==atolls.length -1){
        atollIndex=0;
    }
    else{
        atollIndex =atollIndex+1;
    }
    console.log("index",atollIndex);
    displayAtoll(atollIndex, yearIndex);
}

//---------left arrow button---------
function prevAtoll(){
    if (atollIndex==0){
        atollIndex=atolls.length -1;
    }
    else{
        atollIndex =atollIndex -1;
    }
    console.log("index: ", atollIndex);
    displayAtoll(atollIndex, yearIndex);
}

//--------scroll, change year-------
function changeYear(){

}


