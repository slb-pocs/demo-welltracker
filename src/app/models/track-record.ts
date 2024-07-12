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

    public constructor(){
       
    }
}
