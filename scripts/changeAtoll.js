//Note: 
//  default year is the first in the array

//--------right arrow button---------
function nextAtoll(){
    initialload=false;
    deleteOld(); //delete old scene first
    if (atollIndex==atolls.length -1){
        atollIndex=0;
    }
    else{
        atollIndex =atollIndex+1;
    }
    displayAtoll(atollIndex, yearIndex);

}

//---------left arrow button---------
function prevAtoll(){
    initialload=false;
    deleteOld(); //delete old scene first
    if (atollIndex==0){
        atollIndex=atolls.length -1;
    }
    else{
        atollIndex =atollIndex -1;
    }
    displayAtoll(atollIndex, yearIndex);

}




