import { InstalledEquipment } from "./installed-equipment";
import { SurfaceEquipment } from "./surface-equipment";
import { Well } from "./well";

export class TrackRecord {
    id:number=0;
    supervisorUser:string='';
    validatorUser:string='';
    dataEntryUser:string='';
    assignedUser:string='';
    installationStartDate:Date=new Date();
    installationEndDate:Date=new Date();
    validationDate:Date=new Date();   

    well:Well=new Well();

    public surfaceEquipment:SurfaceEquipment[]=[];
    public installedEquipment:InstalledEquipment[]=[];

    public constructor(){
       
    }
}
