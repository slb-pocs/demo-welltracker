import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompletionInitialData } from '../models/completion-initial-data';
import { CompletionInitialDto } from '../apiDtos/completion-initial-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompletionInitialDataService {
  apiUrl='http://localhost:5124/api/completionInitialData';
  

  constructor(private http: HttpClient) { }

  public CreateCompletionInitialData(completioninitialdata:CompletionInitialData)
  :Observable<CompletionInitialData>{

    let completioninitialdataDto:CompletionInitialDto=
      this.GetCompletionInitialDtoFromCompletionInitialData(completioninitialdata); 

    return this.http.post<CompletionInitialData>(this.apiUrl,completioninitialdataDto);
  }
  public UpdateCompletionInitialData(completioninitialdata:CompletionInitialData)
  :Observable<CompletionInitialData>{

    let completioninitialdataDto:CompletionInitialDto=
      this.GetCompletionInitialDtoFromCompletionInitialData(completioninitialdata);

    return this.http.put<CompletionInitialData>(this.apiUrl,completioninitialdataDto);
  }
  public GetAllCompletionInitialDatas():Observable<CompletionInitialData[]>{
    return this.http.get<CompletionInitialData[]>(this.apiUrl);
  }
  public GetCompletionInitialDatasByWell(wellId:number)
  :Observable<CompletionInitialData[]>{

    return this.http.get<CompletionInitialData[]>(this.apiUrl+'/wellid?wellId='+wellId);
  }
  public GetCompletionInitialData(id:number):Observable<CompletionInitialData>{  
    return this.http.get<CompletionInitialData>(this.apiUrl+'/id?id='+id);
  }
  
  private GetCompletionInitialDtoFromCompletionInitialData
  (completionInitialData:CompletionInitialData):CompletionInitialDto{
    
    let completionInitialDataDto:CompletionInitialDto=new CompletionInitialDto();
    completionInitialDataDto.isInitialCompletion=completionInitialData.isInitialCompletion; 
    completionInitialDataDto.isCompletionPulled=completionInitialData.isCompletionPulled;    
    completionInitialDataDto.hasIpmWell=completionInitialData.hasIpmWell;    
    completionInitialDataDto.hasLinerHangerInstallation=completionInitialData.hasLinerHangerInstallation;    
    completionInitialDataDto.completionPulledDate=completionInitialData.completionPulledDate;    
    completionInitialDataDto.equipmentLastValidated=completionInitialData.equipmentLastValidated; 
    completionInitialDataDto.completionPulledReasonId=completionInitialData.completionPulledReason.id
    completionInitialDataDto.wellId=completionInitialData.wellId  ;    
    return completionInitialDataDto;
  }
}
