import {Atoll} from './Atoll.js';
//import {displayAtoll} from './displayAtoll.js';

//Note: use .toFixed(3) for rounded printing!

window.atolls=[];

//--------------start reading atolls .txt----------------
window.read =function (){
    $.when($.get('assets/data-all/atolls.txt')).then(function(data) {
        var lines=data.split("\n");
        for (let i = 1; i < lines.length; i++){
            $(document).queue('atoll', createReadAtollTask(lines[i])); //for each atoll, read necassary data
        }
         //atoll queue
        $(document).queue('atoll', function(){
            console.log("Atoll reading is done ");
            console.log ("atolls length: ", atolls.length);
            console.log("atolls: ", atolls);
            //after read, define vars:
            displayAtoll();
        });

        $(document).dequeue('atoll');
       
    });
}
//------create task to read each line from Atolls.txt------
function createReadAtollTask(atollData){
    return function (next){
        readAtoll(atollData, next);
    }
}
//---------------------read each atoll----------------------
function readAtoll(atollData, next){
    var content=atollData.split(";");
    var atoll=new Atoll(content[0],content[1],content[2],content[3], content[4], content[5], content[6], content[7], content[8], content[10]);

    $.when($.get(`assets/data-all/sea-level-data-psmsl/data/${atoll.id}.rlrdata`)).then(function(gauge_data){
        var gauge_lines=gauge_data.split("\n");
        for (let i = 0;i < gauge_lines.length; i++){
            var gauge_content=gauge_lines[i].split(";");
    
            if (gauge_content.length != 1 && gauge_content[1]!="-99999"){ 
                atoll.years.push(gauge_content[0]);
                atoll.sea_level_gauge_values.push(gauge_content[1].replace(/ /g, ''));
                
                //------------calcaulate water block height---------
                var sea_level_to_msl=atoll.calculateSeaLeveltoMSL (gauge_content[1].replace(/ /g, '')); //in meters, relative to rlr
                var ratio=atoll.calculateWaterBlockRatio(sea_level_to_msl);
                atoll.sea_level_to_msl_vals.push (sea_level_to_msl);
                atoll.water_block_ratios.push(ratio);
            }//end if
        }
        atolls.push(atoll);

        //next
        setTimeout(function(){
            console.log(atoll.name+ " done");
            next();
        });
        
    });
}



/* ////////////////////////////////////OLD SCRIPT//////////////////////////////////

    //-------------read all atoll data------------
    $.when($.get('/data-all/atolls.txt')).then(function(data) {
        console.log("inside atolls");
        var lines=data.split("\n");
        
        //-------for each Atoll,--------

        $.each(lines, function(i){

            //-----exclude first  line------
            if (i!=0){

                //-----collect all data from atolls.txt----
                var content=lines[i].split(";");
                var atoll=new Atoll(content[0],content[1],content[2],content[3], content[4], content[5], content[6], content[7], content[8]);
                
                //-----read sea level gauge values--------
                $.when($.get(`/data-all/sea-level-data-psmsl/data/${atoll.id}.rlrdata`)).then(function(gauge_data){
                    console.log("inside data");
                    var gauge_lines=gauge_data.split("\n");
                    //console.log (atoll.name)
                    
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
                    //console.log("ratios:",atoll.water_block_ratios);
                    //console.log("years:",atoll.years);
                    //console.log("gauge values (mm):",atoll.sea_level_gauge_values);
                }); //eng .get

                //console.log("years:",atoll.years);
                //console.log("sea levels:",atoll.sea_level_gauge_values);
                atolls.push(atoll);
                console.log ("length during:", atolls.length);
                console.log("atoll during: ", atolls[i-1]);
                console.log("atolls during: ", atolls);
            }//end if
            
        }); //end loop
        if (atolls.length!=0){
            done=true; 
        }
        console.log ("done? -", done);
        return done;
    })) //end .get
*/

