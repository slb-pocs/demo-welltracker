import { Well } from "./well";

export class TrackRecord {
    id:string;
    startDate:Date;
    endDate:Date;
    well:Well;

    public constructor(){
        this.id=Date.now().toString();
        this.startDate=new Date(Date.now());
        this.endDate=new Date();
        this.well=new Well(0,'');
    }
}
