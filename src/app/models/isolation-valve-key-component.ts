import { InstalledEquipment } from "./installed-equipment";

export class IsolationValveKeyComponent {
    public id:number=0;
    public trackRecordId:number=0;
    public installedEquipment:InstalledEquipment=new InstalledEquipment();
    public temperature:number=0; 
    public pressure:number=0; 
    public openFluidWeight:number=0; 
    public failureIncident:boolean=false; 
}
