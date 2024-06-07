import { CatalogNode } from "./catalog-node";

export class SurfaceRunningEquipment {
    productNumber:number=0;
    catalogNode:CatalogNode=new CatalogNode(0,'');
    serial:string='';
    quantity:number=0;
    description:string='';
    isKeyComponent:boolean=false;

    public constructor(){}
}
