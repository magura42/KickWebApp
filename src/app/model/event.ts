import { EventType } from '../enum/EventType';

export class Event {
    eventId: number;
    eventType: string;
    street: string;
    zipcode: string;
    city: string;
    date: Date;
    begintime: string;
    endtime: string;
    gettogethertime: string;
    participationYes: number[];
    participationNo: number[];
    participationMaybe: number[];
    email: string;
    contact: string;
    telefon: string;
    web: string;
}
