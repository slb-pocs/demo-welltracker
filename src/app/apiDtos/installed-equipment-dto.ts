export class InstalledEquipmentDto {
    id:number=0;
    trackRecordId:number=0;
    catalogPartNumber:string='';    
    serial:string='';
    deviation:number=0;
    md:number=0;
    tvd:number=0;
    isThirdPart:boolean=false;
    isKeyComponent:boolean=false;

    public constructor(){}
}
