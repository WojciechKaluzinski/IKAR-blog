import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

export class Post {
    id?: string
    author?: string;
    authorId?: string;
    content?: string;
    image?: string;
    published?: Timestamp;
    title?: string;
}

