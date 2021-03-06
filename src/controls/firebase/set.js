import { doc, setDoc } from "firebase/firestore";
import {db} from './config';

export function voteCompare(creatorId, compareId, imageId, userId) {
    try {
        if(typeof creatorId !== 'string') throw new Error('creatorId is not a string');
        if(typeof compareId !== 'string') throw new Error('compareId is not a string');
        if(typeof imageId !== 'string') throw new Error('imageId is not a string');
        if(typeof userId !== 'string') throw new Error('userId is not a string');

      
        const compareRef = doc(db, 'comparison', creatorId, compareId, 'results');
        const obj = {};
        obj[userId] = imageId;
        setDoc(compareRef, obj, { merge: true }).then(()=>{
            console.info('User voted')
        });

    } catch (error) {
        console.log(creatorId, compareId, imageId,userId);
        console.error(error)
    }
}