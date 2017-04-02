import { EventType } from '../enum/EventType';

export class Event {
    eventId: number;
    eventType: EventType;
    street: string;
    zipcode: string;
    city: string;
    date: Date;
    begintime: Date;
    endtime: Date;
    gettogethertime: string;
    participationYes: number[];
    participationNo: number[];
    participationMaybe: number[];
    email: string;
    contact: string;
    telefon: string;
    web: string;
}
