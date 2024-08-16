export class GetSurfaceEquipmentDto {
    id:number=0;
    trackRecordId:number=0;    
    catalogPart:CatalogPart=new CatalogPart();
    serial:string='';
    quantity:number=0;    
    isKeyComponent:boolean=false;
}
class CatalogPart {}
