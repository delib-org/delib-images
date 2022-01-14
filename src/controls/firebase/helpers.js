import { ref, uploadBytes } from "firebase/storage";
import {storage} from './config';


export async function uploadImage({ images, settings }) {
    try {
        console.log(images)
        if (!images || !Array.isArray(images)) throw new Error("'images' are not an array");
        if (!settings) throw new Error( "settings are missing");

        const {user, comparison} = settings;

        if(!('user' in settings) || !('comparison' in settings)) throw new Error(`user or comparison id is missing: user ${user}, ${comparison}`)
        if(typeof user !== 'string' || typeof comparison !== 'string') throw new Error('user or comparison are not strings')

        images.forEach(image=>{
            console.log(image)
            const storageRef = ref(storage, `comparison/${user}/${comparison}/${image.name}`);

            uploadBytes(storageRef, image.image).then(snapshot=>{
                console.log('Uploaded a blob or file!');
                console.log(snapshot)
            });
            
        });
       
       


    } catch (error) {
        console.error(error);
    }

}