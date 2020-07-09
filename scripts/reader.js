import {Atoll} from './Atoll.js'

var atolls=[];

//Note: use .toFixed(3) for rounded printing!

//-------------read all atoll data------------
$.get('/data-all/atolls.txt', function(data) {
    var lines=data.split("\n");
    
    //-------for each Atoll,--------
    $.each(lines, function(i){

        //-----exclude first  line------
        if (i!=0){

            //-----collect all data from atolls.txt----
            var content=lines[i].split(" ");
            var atoll=new Atoll(content[0],content[1],content[2],content[3], content[4], content[5], content[6], content[7], content[8]);
            
            //-----read sea level gauge values--------
            $.get(`/data-all/sea-level-data-psmsl/data/${atoll.id}.rlrdata`, function(gauge_data){
                var gauge_lines=gauge_data.split("\n");
                console.log (atoll.name)
                
                //-------for each year, ----------
                $.each(gauge_lines, function (g){
                    var gauge_content=gauge_lines[g].split(";");

                    //---------if the content exists, and if tide value was mesured correctly... ---------
                    if (gauge_content.length != 1 && gauge_content[1]!="-99999"){ 
                        atoll.years.push(gauge_content[0]);
                        atoll.sea_level_gauge_values.push(gauge_content[1].replace(/ /g, ''));
                        //console.log("gauge content: ",gauge_content );
                        
                        //------------calcaulate water block height---------
                        var sea_level_to_msl=atoll.calculateSeaLeveltoMSL (gauge_content[1].replace(/ /g, '')); //in meters, relative to rlr
                        //console.log ("sea level to msl (mm):", (sea_level_to_msl*1000).toFixed(3));
                        var ratio=atoll.calculateWaterBlockRatio(sea_level_to_msl);
                        //console.log ("elevation:", atoll.elevation);
                        //console.log ("ratio:", ratio.toFixed(3));
                        atoll.water_block_ratios.push(ratio);
                        
                        

                    }//end if
                });
                console.log("ratios:",atoll.water_block_ratios);
                console.log("years:",atoll.years);
                console.log("gauge values (mm):",atoll.sea_level_gauge_values);
            }); //eng .get

            //console.log("years:",atoll.years);
            //console.log("sea levels:",atoll.sea_level_gauge_values);
            atolls.push(atoll);
        }//end if
    }); //end loop
        
 }); //end .get
 

