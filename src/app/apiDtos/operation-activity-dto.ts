import { Customer } from "../models/customer";
import { Well } from "../models/well";

export class OperationActivityDto {
    value:Value=new Value();

    constructor(){}
}

class Value{
    projectid='';
    operationid='';
    operationattributes:Operationattributes[]=[];
    customer:customers=new customers();
    wells:wells[]=[];
    geounitinfo:GeoUnit=new GeoUnit();
    managementcountryinfo:ManagementCountry=new ManagementCountry();

    constructor(){}
}

class Operationattributes{
    id:string='';
    value:string='';

    constructor(){}
}

class customers{
    id:number=0;
    name:string ='';
    country:string='';   

    constructor(){}
}

class wells{
    name:string= "";
    id:number= 0;
    country:string='';
    field: string='';
    wellenvironment:string=''; 
    number: string='';
    state:string='';
    uwi: string='';
    drillfor: string='';
    county: string='';
    isnonmasteredwell: boolean=false;
    iscustomerfacility: boolean=false;
    city: string='';
    type: string='';string='';

    constructor(){}    
}

class GeoUnit{
    code:string='';

    constructor(){}
}
 class ManagementCountry{
    code:string='';
    name:string='';
 }
