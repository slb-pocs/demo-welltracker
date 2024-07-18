import { CatalogNode } from "./catalog-node";

export class EquipmentInstalled {
    id:number=0;
    productNumber:number=0;
    catalogNode:CatalogNode=new CatalogNode();
    description:string='';
    serial:string='';
    deviation:number=0;
    md:number=0;
    tvd:number=0;
    isThirdPart:boolean=false;
    isKeyComponent:boolean=false;

    public constructor(){}
}
