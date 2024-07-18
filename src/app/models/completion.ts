import { CompletionClass } from "./completion-class";
import { CompletionType } from "./completion-type";
import { InjectedfluidType } from "./injectedfluid-type";
import { ProducedfluidType } from "./producedfluid-type";
import { RockType } from "./rock-type";
import { SandControl } from "./sand-control";

export class Completion {
    public initialCompletion:boolean=true;    
    public number:number=0;    
    public type:CompletionType=new CompletionType();
    public producedFluid:ProducedfluidType=new ProducedfluidType();
    public injectedFluid:InjectedfluidType=new InjectedfluidType();
    public completionClass:CompletionClass=new CompletionClass();
    public sandControl:SandControl=new SandControl();
    public reservoirRockType:RockType=new RockType();
    public reservoirTemperature:number=0
    public corrosiveCCO2:number=0
    public corrosiveH25:number=0;
    public wasPulled:boolean=false;
    public ipmWell:boolean=false;
    public hasLinerHangerInstalation=false;
    public pulledDate:Date=new Date();

    constructor(){}
}
