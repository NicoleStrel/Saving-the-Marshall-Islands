//Note: 
//  default year is the first in the array




//--------scroll, change year-------
window.dragElement=function(elmnt){
    var spacing= calculateSpacingHorizontal();
    var milestones=calculateMilestones(spacing);
    console.log("milestones: ", milestones);
    var newX = 0, newY = 0, oldX = 0, oldY = 0;

    document.getElementById(elmnt.id).onmousedown = dragMouseDown;
    //yearIndex= something

    //displayAtoll(); //to change yearIndex


    //----------draggable element funcs----------
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        //oldX = e.clientX;
        //oldY = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        //newX = oldX - e.clientX; //old-new
        //newY= oldY - e.clientY;
        //oldX = e.clientX;
        //oldY = e.clientY;
        //console.log(e.clientX);
        // set the element's new position:
        //elmnt.style.top = (elmnt.offsetTop - newY) + "px";
        //console.log(elmnt.offsetLeft - newX)
        //elmnt.style.left = (elmnt.offsetLeft - newX) + "px"; 
        /*
        if (milestones.includes(elmnt.offsetLeft - newX)){
            console.log("hi");
            elmnt.style.left = (elmnt.offsetLeft - newX) + "px"; //elmnt.offsetLeft - newX
        } 
        */
        
       
       for (m in milestones){
           if ((e.clientX)>=(milestones[m]-3) && (e.clientX)<=(milestones[m]+3)){
               elmnt.style.left = (milestones[m]) + "px";
               yearIndex=m;
               //displayAtoll(false);
               scaleby=atolls[atollIndex].water_block_ratios[yearIndex];//for 3d
               //console.log("scaleby: ", scaleby);
               document.getElementById("year").innerHTML = atolls[atollIndex].years[yearIndex];
               renderInitial();
               break;
           }
       }
       
       
        
        
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }

}

function calculateSpacingHorizontal(){
    var first_item=document.getElementById('first-year');
    var second_item=document.getElementById('second-year');
    var first_pos = $(first_item).position();
    var second_pos = $(second_item).position();
    console.log("spacing, ", second_pos.left-first_pos.left);
    return second_pos.left-first_pos.left;
}
function calculateSpacingHorizontal(){
    var first_item=document.getElementById('first-year');
    var second_item=document.getElementById('second-year');
    var first_pos = $(first_item).position();
    var second_pos = $(second_item).position();
    console.log("spacing, ", second_pos.left-first_pos.left);
    return second_pos.left-first_pos.left;
}

function calculateMilestones(spacing){
    var milestones=[];
    var first_pos = $(document.getElementById('first-year')).position();
    
    var start=first_pos.left-5;
    console.log("start, ",start, "atoll: ", atolls[atollIndex], "years: ", atolls[atollIndex].years);
    for (let i=0; i<atolls[atollIndex].years.length; i++){
        milestones.push(start);
        start=start+spacing;
    }
    return milestones;
}
