import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

export class Offer {
    id?: string;
    author?: string;
    authorId?: string;
    content?: string;
    image?: string;
    published?: Timestamp;
    owner?: string;
    phone?: string;
    carModel?: string;
}
