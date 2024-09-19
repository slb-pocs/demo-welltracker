import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stem } from '../models/stem';
import { Observable } from 'rxjs';
import { StemDto } from '../apiDtos/stem-dto';

@Injectable({
  providedIn: 'root'
})
export class StemService {
  apiUrl='https://localhost:7107/api/stem';

  constructor(private http: HttpClient) { }

  public CreateStem(stem:Stem):Observable<Stem>{
    let stemDto:StemDto=this.GetStemDtoFromStem(stem);    
    return this.http.post<Stem>(this.apiUrl,stemDto);
  }
  public UpdateStem(stem:Stem):Observable<Stem>{
    let stemDto:StemDto=this.GetStemDtoFromStem(stem); 
    return this.http.put<Stem>(this.apiUrl,stemDto);
  }
  public GetAllStems():Observable<Stem[]>{
    return this.http.get<Stem[]>(this.apiUrl);
  }
  public GetStemsByWell(wellId:number):Observable<Stem[]>{
    return this.http.get<Stem[]>(this.apiUrl+'/wellid?wellId='+wellId);
  }
  public GetStem(id:number):Observable<Stem>{  
    return this.http.get<Stem>(this.apiUrl+'/id?id='+id);
  }

  public DeleteStem(id:number):Observable<any>{  
     return this.http.delete(this.apiUrl+'?id='+id);
  }

  private GetStemDtoFromStem(stem:Stem):StemDto{
    let stemDto:StemDto=new StemDto();
    stemDto.id=stem.id;
    stemDto.wellId=stem.wellId;
    stemDto.stringNumber=stem.stringNumber;
    stemDto.stringTypeId=stem.stringType.id;
    stemDto.sizeId=stem.size.id;
    stemDto.weightId=stem.weight.id;
    stemDto.threadId=stem.thread.id;
    stemDto.materialId=stem.material.id;
    stemDto.mdTop=stem.mdTop;
    stemDto.mdBottom=stem.mdBottom;      

    return stemDto;
  }
}
