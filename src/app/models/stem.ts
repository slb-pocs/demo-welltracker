import { Material } from "./material";
import { Size } from "./size";
import { StringType } from "./string-type";
import { Thread } from "./thread";
import { Weight } from "./weight";

export class Stem {
    public stringNumber:number=0;
    public stringType:StringType=new StringType();
    public size:Size=new Size();
    public weight:Weight=new Weight();
    public thread:Thread=new Thread();
    public material:Material=new Material();
    public mdTop:number=0;
    public mdBottom:number=0;

    constructor(){}
}
