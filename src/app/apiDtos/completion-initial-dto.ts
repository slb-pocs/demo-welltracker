export class CompletionInitialDto {
    id:number=0;
    isInitialCompletion:boolean=false;
    isCompletionPulled:boolean=false
    completionPulledDate:Date=new Date();
    completionPulledReasonId:number=1;
    hasIpmWell:boolean=false;
    hasLinerHangerInstallation:boolean=false;
    equipmentLastValidated:Date=new Date();
    wellId=0;

    public constructor(){}
}
