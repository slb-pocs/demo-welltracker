import { ContingencyMechanicalAvailable } from "./contingency-mechanical-available";
import { IsolationValveJobType } from "./isolation-valve-job-type";
import { IsolationValveKeyComponent } from "./isolation-valve-key-component";
import { TriggerType } from "./trigger-type";

export class IsolationValveJob {
    public id:number=0;
    public trackRecordId:number=0;
    public isolationValveJobType:IsolationValveJobType=new IsolationValveJobType();
    public triggerType:TriggerType=new TriggerType();
    public surfaceAppliedTubbingPressureLimit:number=0;
    public surfaceTempAtN2Changing:number=0;
    
    public contingencyMechanicalAvailable: ContingencyMechanicalAvailable
        =new ContingencyMechanicalAvailable();
    public isolationValveKeyComponent:IsolationValveKeyComponent
        =new IsolationValveKeyComponent();
}
