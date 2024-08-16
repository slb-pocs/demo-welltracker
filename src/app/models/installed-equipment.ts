import { CatalogNode } from "./catalog-node";
import { CatalogPart } from "./catalog-part";

export class InstalledEquipment {
    id:number=0;
    trackRecordId:number=0;    
    catalogPart:CatalogPart=new CatalogPart();    
    serial:string='';
    deviation:number=0;
    md:number=0;
    tvd:number=0;
    isThirdPart:boolean=false;
    isKeyComponent:boolean=false;

    public constructor(){}
}
