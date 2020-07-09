export class Atoll {
    //note: all values are strings
    constructor(name,id, long, lat, population,  popdate, elevation,islets,mean_sea_level_to_datum){
        this.name=name; 
        this.id=id;
        this.long=long; //degrees E
        this.lat=lat; //degrees N
        this.population=population; //#
        this.popdate=popdate; //year
        this.elevation=elevation;
        this.islets=islets;
        //undeclared
        this.mean_sea_level_to_rlr=mean_sea_level_to_datum; //in mm 
        this.sea_level_gauge_values=[];//in mm 
        this.years=[]; //
        this.water_block_ratios=[]; //no unit
    }

    calculateSeaLeveltoMSL (tide_gauge_val){
        var tide_gauge_output=parseInt(tide_gauge_val,10);
        var tide_gauge_output_meters=tide_gauge_output/1000; //in meters
        //console.log ("meter conversion: ", tide_gauge_output_meters);
        
        //subtract to find distance between both
        return tide_gauge_output_meters-(parseInt(this.mean_sea_level_to_rlr,10)/1000); //convert to m
        
    }
    calculateWaterBlockRatio(sea_level_to_MSL){
        return sea_level_to_MSL/parseInt(this.elevation,10);
    }
}