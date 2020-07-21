//Note: 
//  default year is the first in the array

//--------scroll, change year-------
window.dragElement=function(elmnt){
    var milestonesY=[];
    var milestonesX=[]

    calculateMilestones();
    document.getElementById(elmnt.id).onmousedown = dragMouseDown;

    //----------draggable element funcs----------
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        oldY = e.clientY;
       
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        
       var changed=false;
        
        //check if cursor is in the right position to switch the 3d image
       for (m in milestonesX){
        let varPos=elmnt.offsetTop -oldY + e.clientY;

           if ((e.clientX)>=(milestonesX[m]-5) && (e.clientX)<=(milestonesX[m]+5) && (varPos)>=(milestonesY[m]-20) && (varPos)<=(milestonesY[m]+20)){
               //console.log("current Y:  ", varPos, "changed y: ", milestonesY[m])
               oldLeft=elmnt.style.left;
               oldTop=elmnt.style.top;
               elmnt.style.left = (milestonesX[m]) + "px";
               elmnt.style.top = (milestonesY[m]) + "px";
               yearIndex=m;
               if (oldLeft!=elmnt.style.left || oldTop!=elmnt.style.top){
                    changed=true;
               }
               break;
           }
       }
       if(changed){
            scaleby=atolls[atollIndex].water_block_ratios[yearIndex];//for 3d
            //console.log("scaleby: ", scaleby);
            document.getElementById("year").innerHTML = atolls[atollIndex].years[yearIndex];
            var sea_level_to_msl=atolls[atollIndex].sea_level_to_msl_vals[yearIndex];
            if (sea_level_to_msl>0){
                document.getElementById("sea-level").innerHTML=(sea_level_to_msl*1000).toFixed(2) + "mm above Mean Sea Level";
            }
            else{
                document.getElementById("sea-level").innerHTML=(sea_level_to_msl*1000*(-1)).toFixed(2) + " mm below Mean Sea Level";
            }
            renderInitial();
       }
        
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
    function calculateMilestones(){
        for (let i=0; i<circles.length; i++){
            let circle=circles[i];
            milestonesY.push($(circle).position().top-5);
            milestonesX.push($(circle).position().left-5);
    
        }
    }

}




