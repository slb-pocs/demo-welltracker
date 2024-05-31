import { Material } from "./material";
import { StringType } from "./string-type";
import { Thread } from "./thread";

export class Stem {
    public stringNumber:number=0;
    public stringType:StringType=new StringType(0,'');
    public size:number=0;
    public weight:number=0;
    public threads:Thread=new Thread(0,'');
    public material:Material=new Material(0,'');
    public mdTop:number=0;
    public mdBottom:number=0;

    constructor(){}
}
