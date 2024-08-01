import { ArtificialliftType } from "./artificiallift-type";
import { Basin } from "./basin";
import { Completion } from "./completion";
import { CompletionInitialData } from "./completion-initial-data";

import { Country } from "./country";
import { Customer } from "./customer";
import { Environment } from "./environment";

import { GeoUnit } from "./geo-unit";
import { LinerhangerSystem } from "./linerhanger-system";
import { MaxDeviation } from "./max-deviation";
import { MdUnit } from "./md-unit";
import { MeassuredFrom } from "./meassured-from";
import { Multilateral } from "./multilateral";
import { MultistageSimulation } from "./multistage-simulation";
import { Stem } from "./stem";


import { TvdUnit } from "./tvd-unit";
import { UppercompletionType } from "./uppercompletion-type";

import { WellType } from "./well-type";

export class Well {
    public id:number=0;
    public name:string='';
    public wellType:WellType=new WellType();
    public customer:Customer=new Customer(); 
    public country:Country=new Country();
    public basin:Basin=new Basin();    
    public field:string='';    
    public environment:Environment=new Environment;    
    public geoUnit:GeoUnit=new GeoUnit();

    public waterDepth:number=1;
    public maxDeviation:MaxDeviation=new MaxDeviation;
    public mdMeassuredFrom:MeassuredFrom=new MeassuredFrom();
    public tvdMeassuredFrom:MeassuredFrom=new MeassuredFrom();
    public mdDistance:number=0;
    public tvdDistance:number=0;
    public mdUnit:MdUnit=new MdUnit();
    public tvdUnit:TvdUnit=new TvdUnit();
    public upperCompletionType:UppercompletionType=new UppercompletionType;
    public artificialLiftType:ArtificialliftType=new ArtificialliftType();
    public multiLateralType:Multilateral=new Multilateral();
    public linerHangerSystem:LinerhangerSystem=new LinerhangerSystem();
    public multiStageType:MultistageSimulation=new MultistageSimulation();  
   
    public trackRecordId:number=0;
    public stems:Stem[]=[];
    public completionInitialData:CompletionInitialData=new CompletionInitialData();
    public completions:Completion[]=[];

    public projectId:string='';
    public operationId:string='';
    public operationActivityId='';
    public activityJob:string='';

    public constructor(){
        
    }
    
}
