import { CatalogNode } from "./catalog-node";

export class SurfaceEquipment {
    id:number=0;
    trackRecordId:number=0;
    productNumber:number=0;
    catalogNode:CatalogNode=new CatalogNode();
    serial:string='';
    quantity:number=0;
    description:string='';
    isKeyComponent:boolean=false;

    public constructor(){}
}
