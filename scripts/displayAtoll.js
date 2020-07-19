window.displayAtoll=function(){
    var atoll=atolls[atollIndex];
    scaleby=atoll.water_block_ratios[yearIndex];//for 3d
    console.log ("new scaleby: ", scaleby);
    //-------------------change all info---------------------
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
        document.getElementById("sea-level").innerHTML=(sea_level_to_msl*1000*(-1)).toFixed(2) + " mm below Mean Sea Level";
    }
    //------------------fill scroll bar----------------------
    var scrollbar=document.getElementById('scrollbar');
    var child = scrollbar.lastElementChild;  
    var first_div;
    
    //remove old
    while (child) { 
        scrollbar.removeChild(child); 
        child = scrollbar.lastElementChild; 
    }

    //add new
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
        
        div.appendChild(list_circle);
        div.appendChild(list_text);
        list_item.append(div);

        
        scrollbar.appendChild(list_item);

        
        if (i==0){
            first_div=list_circle ;
        }
    }
    //find first circle position to place draggable
    //var circle = first_circle.getBoundingClientRect();
    var x = $(first_div).position();
    console.log("Top: " + x.top + " Left: " + x.left);
    //console.log("list_item: ",circle.top, circle.left);
    var draggable=document.getElementById('draggable-element');
    var top=x.top-5;
    var left=x.left-5;
    draggable.style.cssText=`
        top:${top}px; /*-5*/
        left:${left}px; /*-5*/
    `;
    //draggable.style.top=x.top; //circle.top
    //draggable.style.right=2000; //circle.left x.left

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