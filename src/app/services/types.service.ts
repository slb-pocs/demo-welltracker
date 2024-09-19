import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WellType } from '../models/well-type';
import { Observable } from 'rxjs';
import { ArtificialliftType } from '../models/artificiallift-type';
import { Basin } from '../models/basin';
import { CompletionClass } from '../models/completion-class';
import { CompletionpulledReason } from '../models/completionpulled-reason';
import { CompletionType } from '../models/completion-type';
import { Country } from '../models/country';
import { Environment } from '../models/environment';
import { Field } from '../models/field';
import { FilterType } from '../models/filter-type';
import { FluidType } from '../models/fluid-type';
import { GeoUnit } from '../models/geo-unit';
import { InjectedFluidType } from '../models/injected-fluid-type';
import { LinerhangerSystem } from '../models/linerhanger-system';
import { Material } from '../models/material';
import { MaxDeviation } from '../models/max-deviation';
import { MdUnit } from '../models/md-unit';
import { MeassuredFrom } from '../models/meassured-from';
import { Multilateral } from '../models/multilateral';
import { MultistageSimulation } from '../models/multistage-simulation';
import { ProducedFluidType } from '../models/producedfluid-type';
import { PumpingCompany } from '../models/pumping-company';
import { SandControl } from '../models/sand-control';
import { ScreenProvider } from '../models/screen-provider';
import { ScreenType } from '../models/screen-type';
import { Size } from '../models/size';
import { Weight } from '../models/weight';
import { StringType } from '../models/string-type';
import { Thread } from '../models/thread';
import { ToolsCompany } from '../models/tools-company';
import { ToolType } from '../models/tool-type';
import { TubeType } from '../models/tube-type';
import { TvdUnit } from '../models/tvd-unit';
import { UppercompletionType } from '../models/uppercompletion-type';
import { CatalogNode } from '../models/catalog-node';
import { RockType } from '../models/rock-type';
import { IsolationValveJobType } from '../models/isolation-valve-job-type';
import { TriggerType } from '../models/trigger-type';
import { ContingencyMechanicalAvailable } from '../models/contingency-mechanical-available';

@Injectable({
  providedIn: 'root'
})
export class TypesService {
  
  apiUrl:string="https://localhost:7107/api/types/";

  constructor(private http:HttpClient) { }

  public GetArtificialLiftTypes():Observable<ArtificialliftType[]>{
    return this.http.get<ArtificialliftType[]>(this.apiUrl+"artificialLiftTypes");   
  }
  public GetBasins():Observable<Basin[]>{
    return this.http.get<Basin[]>(this.apiUrl+"basins");   
  }
  public GetCompletionClasses():Observable<CompletionClass[]>{
    return this.http.get<CompletionClass[]>(this.apiUrl+"completionClasses");   
  }
  public GetCompletionPulledReasons():Observable<CompletionpulledReason[]>{
    return this.http.get<CompletionpulledReason[]>(this.apiUrl+"completionPulledReasons");   
  }  
  public GetCompletionTypes():Observable<CompletionType[]>{
    return this.http.get<CompletionType[]>(this.apiUrl+"CompletionTypes");   
  }
  public GetCountries():Observable<Country[]>{
    return this.http.get<Country[]>(this.apiUrl+"Countries");   
  }
  public GetCountryByName(name:string):Observable<Country>{
    return this.http.get<Country>(this.apiUrl+"Countries/name?name="+name);   
  }
  public GetEnvironments():Observable<Environment[]>{
    return this.http.get<Environment[]>(this.apiUrl+"Environments");   
  }
  public GetEnvironmentByName(name:string):Observable<Environment>{
    return this.http.get<Environment>(this.apiUrl+"Environments/name?name="+name);   
  }
  public GetFields():Observable<Field[]>{
    return this.http.get<Field[]>(this.apiUrl+"Fields");   
  }
  public GetFieldByName(name:string):Observable<Field>{
    return this.http.get<Field>(this.apiUrl+"Fields/name?name="+name);   
  }
  public GetFilterTypes():Observable<FilterType[]>{
    return this.http.get<FilterType[]>(this.apiUrl+"FilterTypes");   
  }  
  public GetFluidTypes():Observable<FluidType[]>{
    return this.http.get<FluidType[]>(this.apiUrl+"FluidTypes");   
  }
  public GetGeoUnits():Observable<GeoUnit[]>{
    return this.http.get<GeoUnit[]>(this.apiUrl+"GeoUnits");   
  }
  public GetGeoUnitByName(name:string):Observable<GeoUnit>{
    return this.http.get<GeoUnit>(this.apiUrl+"GeoUnits/name?name="+name);   
  }
  public GetInjectedFluidTypes():Observable<InjectedFluidType[]>{
    return this.http.get<InjectedFluidType[]>(this.apiUrl+"InjectedFluidTypes");   
  }
  public GetLinerHangerSystems():Observable<LinerhangerSystem[]>{
    return this.http.get<LinerhangerSystem[]>(this.apiUrl+"LinerHangerSystems");   
  }
  public GetMaterials():Observable<Material[]>{
    return this.http.get<Material[]>(this.apiUrl+"Materials");   
  }  
  public GetMaxDeviations():Observable<MaxDeviation[]>{
    return this.http.get<MaxDeviation[]>(this.apiUrl+"MaxDeviations");   
  }
  public GetMdUnits():Observable<MdUnit[]>{
    return this.http.get<MdUnit[]>(this.apiUrl+"MdUnits");   
  }
  public GetMeassuredFroms():Observable<MeassuredFrom[]>{
    return this.http.get<MeassuredFrom[]>(this.apiUrl+"MeassuredFroms");   
  }
  public GetMultiLateralTypes():Observable<Multilateral[]>{
    return this.http.get<Multilateral[]>(this.apiUrl+"MultiLateralTypes");   
  }
  public GetMultiStageTypes():Observable<MultistageSimulation[]>{
    return this.http.get<MultistageSimulation[]>(this.apiUrl+"MultiStageTypes");   
  }  
  public GetProducedFluidTypes():Observable<ProducedFluidType[]>{
    return this.http.get<ProducedFluidType[]>(this.apiUrl+"ProducedFluidTypes");   
  }
  public GetPumpingCompanies():Observable<PumpingCompany[]>{
    return this.http.get<PumpingCompany[]>(this.apiUrl+"PumpingCompanies");   
  }
  public GetSandControlTypes():Observable<SandControl[]>{
    return this.http.get<SandControl[]>(this.apiUrl+"SandControlTypes");   
  }
  public GetScreenProviders():Observable<ScreenProvider[]>{
    return this.http.get<ScreenProvider[]>(this.apiUrl+"ScreenProviders");   
  }
  public GetScreenTypes():Observable<ScreenType[]>{
    return this.http.get<ScreenType[]>(this.apiUrl+"ScreenTypes");   
  }  
  public GetStemSizes():Observable<Size[]>{
    return this.http.get<Size[]>(this.apiUrl+"StemSizes");   
  }
  public GetStemWeights():Observable<Weight[]>{
    return this.http.get<Weight[]>(this.apiUrl+"StemWeights");   
  }
  public GetStringTypes():Observable<StringType[]>{
    return this.http.get<StringType[]>(this.apiUrl+"StringTypes");   
  }
  public GetThreadTypes():Observable<Thread[]>{
    return this.http.get<Thread[]>(this.apiUrl+"ThreadTypes");   
  }
  public GetToolsCompanies():Observable<ToolsCompany[]>{
    return this.http.get<ToolsCompany[]>(this.apiUrl+"ToolsCompanies");   
  }  
  public GetToolTypes():Observable<ToolType[]>{
    return this.http.get<ToolType[]>(this.apiUrl+"ToolTypes");   
  }
  public GetTubeTypes():Observable<TubeType[]>{
    return this.http.get<TubeType[]>(this.apiUrl+"TubeTypes");   
  }
  public GetTvdUnits():Observable<TvdUnit[]>{
    return this.http.get<TvdUnit[]>(this.apiUrl+"TvdUnits");   
  }
  public GetUpperCompletionTypes():Observable<UppercompletionType[]>{
    return this.http.get<UppercompletionType[]>(this.apiUrl+"UpperCompletionTypes");   
  }
  public GetWellTypes():Observable<WellType[]>{
    return this.http.get<WellType[]>(this.apiUrl+"WellTypes");   
  }
  public GetWellTypeByName(name:string):Observable<WellType>{
    return this.http.get<WellType>(this.apiUrl+"WellTypes/name?name="+name);   
  }
  public GetReservoirRockTypes():Observable<RockType[]>{
    return this.http.get<RockType[]>(this.apiUrl+"RockTypes");   
  }
  public GetCatalogNodes():Observable<CatalogNode[]>{
    return this.http.get<CatalogNode[]>(this.apiUrl+"CatalogNodes");   
  }
  public GetIsolationValveJobTypes():Observable<IsolationValveJobType[]>{
    return this.http.get<CatalogNode[]>(this.apiUrl+"isolationValveTypes");   
  }
  public GetTriggerTypes():Observable<TriggerType[]>{
    return this.http.get<TriggerType[]>(this.apiUrl+"triggerTypes");   
  }
  public GetContingencyMechanicalTypes():Observable<ContingencyMechanicalAvailable[]>{
    return this.http.get<ContingencyMechanicalAvailable[]>(this.apiUrl+"contingencyMechanicalTypes");   
  }
}
