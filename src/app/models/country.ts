import { GeoUnit } from "./geo-unit";

export class Country {
    public id:number=1;
    public name:string='';
    public code:string='';
    public geoUnit:GeoUnit=new GeoUnit();

    public constructor(){
      
    }
}
