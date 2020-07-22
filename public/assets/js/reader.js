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


