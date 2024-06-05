import { Well } from "./well";

export class TrackRecord {
    id:string='';
    supervisorUser:string='';
    validatorUser:string='';
    dataEntryUser:string='';
    assignedUser:string='';
    installationStartDate:Date=new Date();
    installationEndDate:Date=new Date();
    validationDate:Date=new Date();
    well:Well=new Well(0,'');

    public constructor(){
       
    }
}
