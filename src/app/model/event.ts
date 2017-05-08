import {Participant} from "./participant";
export class Event {

    eventId:number;
    name:string;
    eventType:string;
    street:string;
    zipcode:string;
    city:string;
    date:Date;
    begintime:string;
    endtime:string;
    gettogethertime:string;
    participationYes:Participant[];
    participationNo:Participant[];
    participationMaybe:Participant[];
    email:string;
    contact:string;
    telefon:string;
    web:string;
    teamId:number;
}
