window.displayAtoll=function(){
    var atoll=atolls[atollIndex];
    scaleby=atoll.water_block_ratios[yearIndex];//for 3d
    //console.log ("scaleby: ", scaleby);
    //-------------------change all info---------------------
    document.getElementById("name").innerHTML = atoll.name;
    document.getElementById("year").innerHTML = atoll.years[yearIndex];
    document.getElementById("pop").innerHTML = "Population: " +atoll.population +" ("+atoll.popdate+")";
    document.getElementById("loc").innerHTML = atoll.lat+"° N, "+atoll.long+ "° E";
    document.getElementById("elevation").innerHTML="Elevation: "+atoll.elevation+" m";
    document.getElementById("islets").innerHTML=atoll.islets+" islets";
    var imgsrc="assets/img/"+atoll.name+"-map.png";
    document.getElementById("atoll-img").setAttribute('src', imgsrc);
    document.getElementById("atoll-desc").innerHTML=atoll.desc;

    var sea_level_to_msl=atoll.sea_level_to_msl_vals[yearIndex];
    if (sea_level_to_msl>0){
        document.getElementById("sea-level").innerHTML=(sea_level_to_msl*1000).toFixed(2) + "mm above Mean Sea Level";
    }
    else{
        document.getElementById("sea-level").innerHTML=(sea_level_to_msl*1000*(-1)).toFixed(2) + " mm below Mean Sea Level";
    }
    //------------------fill scroll bar----------------------
    var scrollbar=document.getElementById('scrollbar');
    var child = scrollbar.lastElementChild;  
    var first_circle;
    window.circles=[];
    
    //------------remove old-----------
    while (child) { 
        scrollbar.removeChild(child); 
        child = scrollbar.lastElementChild; 
    }

    //-------------add new-------------
    for (var i=0; i<atoll.years.length; i++){
        var list_item = document.createElement('li');
        list_item.setAttribute('class', 'scrollbar-list-item');
       
        var div = document.createElement('div');
        div.setAttribute('class', 'scrollbar-div');
        var list_text= document.createElement('p');
        list_text.setAttribute('class', 'scrollbar-text');
        list_text.innerHTML=atoll.years[i];
        var list_circle=document.createElement('span');
        list_circle.setAttribute('class', 'scrollbar-dot');
        
        //for list spacing calculations
        if (i==0){
            first_circle=list_circle ;
        }
        circles.push(list_circle);
        
        div.appendChild(list_circle);
        div.appendChild(list_text);
        list_item.append(div);

        
        scrollbar.appendChild(list_item);
        
    }

    //------------find first circle position to place draggable-----------
    var x = $(first_circle).position();
    var draggable=document.getElementById('draggable-element');
    var top=x.top-5;
    console.log("top: ", top);
    var left=x.left-5;
    draggable.style.cssText=`
        top:${top}px; /*-5*/
        left:${left}px; /*-5*/
    `;


    //------------------start draggable element -------------------------
    dragElement(document.getElementById("draggable-element"));
    

    // check if its the initial load
    if (!initialload){
        atollName=atolls[atollIndex].name;
        console.log ("Atoll in View: ", atollName);
        changed=true;
  
        render();  //draw scene
    }
    else{
        renderInitial();
    }
}