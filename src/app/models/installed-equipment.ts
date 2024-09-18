import { CatalogNode } from "./catalog-node";
import { CatalogPart } from "./catalog-part";
import { IsolationValveKeyComponent } from "./isolation-valve-key-component";

export class InstalledEquipment {
    public id:number=0;
    public trackRecordId:number=0;    
    public catalogPart:CatalogPart=new CatalogPart();    
    public serial:string='';
    public deviation:number=0;
    public md:number=0;
    public tvd:number=0;
    public isThirdPart:boolean=false;
    public isKeyComponent:boolean=false;

    public constructor(){}
}
