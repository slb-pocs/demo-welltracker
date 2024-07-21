import { CompletionClass } from "./completion-class";
import { CompletionType } from "./completion-type";
import { InjectedFluidType } from "./injected-fluid-type";
import { ProducedFluidType } from "./producedfluid-type";
import { RockType } from "./rock-type";
import { SandControl } from "./sand-control";

export class Completion {
    public id:number=0;  
    public number:number=0;    
    public completionType:CompletionType=new CompletionType();
    public wellId:number=0;
    public producedFluidType:ProducedFluidType=new ProducedFluidType();
    public injectedFluidType:InjectedFluidType=new InjectedFluidType();
    public completionClass:CompletionClass=new CompletionClass();
    public sandControlType:SandControl=new SandControl();
    public reservoirRockType:RockType=new RockType();
    public reservoirTemperature:number=0
    public corrosiveCompCCO2:number=0
    public corrosiveCompH25:number=0; 


    constructor(){}
}
