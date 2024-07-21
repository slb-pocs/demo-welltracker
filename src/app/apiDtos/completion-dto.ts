
export class CompletionDto {
    public id:number=0;  
    public number:number=0;    
    public completionTypeId:number=1;
    public wellId:number=0;
    public producedFluidTypeId:number=1;
    public injectedFluidTypeId:number=1;
    public completionClassId:number=1;
    public sandControlTypeId:number=1;
    public reservoirRockTypeId:number=1;
    public reservoirTemperature:number=0
    public corrosiveCompCCO2:number=0
    public corrosiveCompH25:number=0; 

    constructor(){}
}
