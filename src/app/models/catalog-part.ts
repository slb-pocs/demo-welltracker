import { CatalogNode } from "./catalog-node";

export class CatalogPart {
    partNumber:string='';
    name:string='';
    nodeLevel1:CatalogNode=new CatalogNode();
    nodeLevel2:CatalogNode=new CatalogNode();
    nodeLevel3:CatalogNode=new CatalogNode();
    nodeLevel4:CatalogNode=new CatalogNode();
    nodeLevel5:CatalogNode=new CatalogNode();
}
