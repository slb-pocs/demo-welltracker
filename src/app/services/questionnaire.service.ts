import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Questionnaire } from '../models/questionnaire';
import { QuestionnaireDto } from '../apiDtos/questionnaire-dto';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  apiUrl=environment.apiUrl+'questionnaire';

  constructor(private http: HttpClient) { }

  public Create(questionnaire:Questionnaire)
    :Observable<Questionnaire>{
    let questionnaireDto:QuestionnaireDto
    =this.GetDtoFromQuestionnaire(questionnaire);    
    return this.http.post<Questionnaire>(this.apiUrl,questionnaire);
  }

  public Update(questionnaire:Questionnaire)
    :Observable<Questionnaire>{
    let questionnaireDto:QuestionnaireDto
    =this.GetDtoFromQuestionnaire(questionnaire);    
    return this.http.put<Questionnaire>(this.apiUrl,questionnaireDto);
  }  

  public GetAll():Observable<Questionnaire[]>{
    return this.http.get<Questionnaire[]>(this.apiUrl);
  }

  public GetAllByTrackRecord(trackRecordId:number):Observable<Questionnaire[]>{
    return this.http.get<Questionnaire[]>(this.apiUrl+'/trackRecordId?trackRecordId='+trackRecordId);
  }

  public GetByKeyComponent(keyComponentId:number):Observable<Questionnaire>{  
    return this.http.get<Questionnaire>
    (this.apiUrl+'/keyComponentId?keyComponentId='+keyComponentId);  
  }
  
  public Get(id:number):Observable<Questionnaire>{  
    return this.http.get<Questionnaire>(this.apiUrl+'/id?id='+id);  }

  private GetDtoFromQuestionnaire
    (questionnaire:Questionnaire):QuestionnaireDto{

      let questionnaireDto:QuestionnaireDto=new QuestionnaireDto();
     questionnaireDto={
      id:questionnaire.id,
      isolationValveKeyComponentId:questionnaire.isolationValveKeyComponent.id,

      question1:questionnaire.question1,
      question2:questionnaire.question2,
      question3:questionnaire.question3,
      question4:questionnaire.question4,
      question5:questionnaire.question5,
      question6:questionnaire.question6,
      question7:questionnaire.question7,
      question8:questionnaire.question8,
      question9:questionnaire.question9,
      question10:questionnaire.question10,
      question11:questionnaire.question11,
      question12:questionnaire.question11,

      questLink1:questionnaire.questLink1,
      questLink2:questionnaire.questLink2,
      questLink3:questionnaire.questLink3,
      questLink4:questionnaire.questLink4,
      questLink5:questionnaire.questLink5,
      questLink6:questionnaire.questLink6,
      questLink7:questionnaire.questLink7,
      questLink8:questionnaire.questLink8,
      questLink9:questionnaire.questLink9,
      questLink10:questionnaire.questLink10,
      questLink11:questionnaire.questLink11,
      questLink12:questionnaire.questLink12,


    };
  
   
    
    return questionnaireDto;
  }
}
