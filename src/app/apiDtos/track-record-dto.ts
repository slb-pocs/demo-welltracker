import { Well } from "../models/well";
import { WellDto } from "./well-dto";

export class TrackRecordDto {
    id:number=0;
    supervisorUser:string='';
    validatorUser:string='';
    dataEntryUser:string='';
    assignedUser:string='';
    installationStartDate:Date=new Date();
    installationEndDate:Date=new Date();
    validationDate:Date=new Date();   

    well:WellDto=new WellDto();
}
