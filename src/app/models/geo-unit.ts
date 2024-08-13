import { Basin } from "./basin";

export class GeoUnit {
    public id:number=1;
    public name:string='';
    public description:string='';
    public basin:Basin=new Basin();

    public constructor(){
      
    }
}
