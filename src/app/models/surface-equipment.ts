import { CatalogNode } from "./catalog-node";
import { CatalogPart } from "./catalog-part";

export class SurfaceEquipment {
    id:number=0;
    trackRecordId:number=0;    
    catalogPart:CatalogPart=new CatalogPart();
    serial:string='';
    quantity:number=0;    
    isKeyComponent:boolean=false;

    public constructor(){}
}
