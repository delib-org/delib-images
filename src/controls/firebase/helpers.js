import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { storage, db } from './config';


export async function uploadImage({ images, settings }) {
    try {
        console.log(images)
        if (!images || !Array.isArray(images)) throw new Error("'images' are not an array");
        if (!settings) throw new Error("settings are missing");

        const { userId, comparisonId } = settings;

        if (!('userId' in settings) || !('comparisonId' in settings)) throw new Error(`user or comparison id is missing: user ${userId}, ${comparisonId}`)
        if (typeof userId !== 'string' || typeof comparisonId !== 'string') throw new Error('user or comparison are not strings')

        images.forEach(image => {
            const imageName = image.name;
            if (!imageName) throw new Error('no name for image')
            console.log(imageName)
            const storageRef = ref(storage, `comparison/${userId}/${comparisonId}/${imageName}`);
            // const gsReference = ref(storage, `gs://buket/comparison/${user}/${comparison}/${imageName}`);
            
            const imageRef = doc(db, 'comparison', userId, comparisonId, `${imageName}`);

            uploadBytes(storageRef, imageName).then(snapshot => {
                console.log('Uploaded a blob or file!');
                console.log(snapshot)
                getDownloadURL(storageRef).then(httpRef=>{
                    console.log(httpRef)
                    setDoc(imageRef, { imageSrc: httpRef, }).then(() => {
                        console.log(`image was set to: /comparison/${userId}/${comparisonId}/${imageName}`)
                    })
    
                })
               
            });

        });




    } catch (error) {
        console.error(error);
    }

}