export class UpdateWellDetailsDto{
    public id:number=0;
    public name:string='';
    public wellTypeId:number=0;
    public trackRecordId:number=0;
    public customerId:number=0; 
    public countryId:number=0;
    public basinId:number=0;    
    public field:string='';    
    public environmentId:number=0;    
    public geoUnitId: number=0;

    public waterDepth:number=0;
    public maxDeviationId:number=1;
    public mdMeassuredFromId:number=1;
    public tvdMeassuredFromId:number=1;
    public mdDistance:number=0;
    public tvdDistance:number=0;
    public mdUnitId:number=1;
    public tvdUnitId:number=1;
}