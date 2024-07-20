import { CompletionpulledReason } from "./completionpulled-reason";

export class CompletionInitialData {
    id:number=0;
    isInitialCompletion:boolean=false;
    isCompletionPulled:boolean=false
    completionPulledDate:Date=new Date();
    completionPulledReason:CompletionpulledReason=new CompletionpulledReason();
    hasIpmWell:boolean=false;
    hasLinerHangerInstallation:boolean=false;
    equipmentLastValidated:Date=new Date();
    wellId=0;

    public constructor(){}
}
