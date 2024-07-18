import { Material } from "./material";
import { StemSize } from "./stemSize";
import { StringType } from "./string-type";
import { Thread } from "./thread";
import { StemWeight } from "./StemWeight";

export class Stem {
    public id:number=0;
    public wellId=0;
    public stringNumber:number=0;
    public stringType:StringType=new StringType();
    public size:StemSize=new StemSize();
    public weight:StemWeight=new StemWeight();
    public thread:Thread=new Thread();
    public material:Material=new Material();
    public mdTop:number=0;
    public mdBottom:number=0;

    constructor(){}
}
