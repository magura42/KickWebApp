import { EventType } from '../enum/EventType';

export class Event {
    eventId: number;
    eventType: EventType;
    street: string;
    zipcode: string;
    city: string;
    date: string;
    begintime: string;
    endtime: string;
    gettogethertime: string;
    participationYes: number;
    participationNo: number;
    participationMaybe: number;
}
