import {Participant} from "./participant";
import {TrainingElement} from "./trainingelement";
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
    trainingelements: TrainingElement[];
}
