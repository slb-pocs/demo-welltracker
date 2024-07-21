import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Completion } from '../models/completion';
import { CompletionDto } from '../apiDtos/completion-dto';

@Injectable({
  providedIn: 'root'
})
export class CompletionService {
  apiUrl='http://localhost:5124/api/completion';

  constructor(private http: HttpClient) { }

  public CreateCompletion(completion:Completion):Observable<Completion>{
    let completionDto:CompletionDto=this.GetCompletionDtoFromCompletion(completion);    
    return this.http.post<Completion>(this.apiUrl,completionDto);
  }
  public UpdateCompletion(completion:Completion):Observable<Completion>{
    let completionDto:CompletionDto=this.GetCompletionDtoFromCompletion(completion); 
    return this.http.put<Completion>(this.apiUrl,completionDto);
  }
  public GetAllCompletions():Observable<Completion[]>{
    return this.http.get<Completion[]>(this.apiUrl);
  }
  public GetCompletionsByWell(wellId:number):Observable<Completion[]>{
    return this.http.get<Completion[]>(this.apiUrl+'/wellId?wellId='+wellId);
  }
  public GetCompletion(id:number):Observable<Completion>{  
    return this.http.get<Completion>(this.apiUrl+'/id?id='+id);
  }

  private GetCompletionDtoFromCompletion(completion:Completion):CompletionDto{
    let completionDto:CompletionDto=new CompletionDto();
    completionDto.id=completion.id;
    completionDto.wellId=completion.wellId;
    completionDto.number=completion.number;
    completionDto.producedFluidTypeId=completion.producedFluidType.id;
    completionDto.injectedFluidTypeId=completion.injectedFluidType.id;
    completionDto.completionTypeId=completion.completionType.id;
    completionDto.completionClassId=completion.completionClass.id;
    completionDto.sandControlTypeId=completion.sandControlType.id;
    completionDto.reservoirRockTypeId=completion.reservoirRockType.id;
    completionDto.reservoirTemperature=completion.reservoirTemperature;
    completionDto.corrosiveCompCCO2=completion.corrosiveCompCCO2;
    completionDto.corrosiveCompH25=completion.corrosiveCompH25; 

    return completionDto;
  }
  
}
