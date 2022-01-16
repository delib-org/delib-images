import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { storage, db } from './config';



export async function uploadImage({ images, settings, setIsRedirect }) {

    try {
        console.log(images)
        if (!images || !Array.isArray(images)) throw new Error("'images' are not an array");
        if (!settings) throw new Error("settings are missing");

        const { userId, comparisonId } = settings;

        if (!('userId' in settings) || !('comparisonId' in settings)) throw new Error(`user or comparison id is missing: user ${userId}, ${comparisonId}`)
        if (typeof userId !== 'string' || typeof comparisonId !== 'string') throw new Error('user or comparison are not strings');

        const readyArray = [];
        const tempObj = {};
        
        //register comparisons to be able to show all
        tempObj.images = [];
        tempObj.date = new Date();
        const compareRef = doc(db, 'comparison', userId, 'all', comparisonId)

        images.forEach((image, index) => {
            console.log(image, index)
            const imageName = `${uniqueId(2)}${image.name}`;
            console.log(imageName)
            if (!imageName) throw new Error('no name for image')
            console.log(imageName)
            const storageRef = ref(storage, `comparison/${userId}/${comparisonId}/${imageName}`);


            const imageRef = doc(db, 'comparison', userId, comparisonId, `${imageName}`);
           

            uploadBytes(storageRef, image).then(snapshot => {
                console.log(snapshot)

                getDownloadURL(storageRef).then(httpRef => {
                    console.log(httpRef)
                    tempObj.images[index] = httpRef;

                    setDoc(imageRef, { imageSrc: httpRef }).then(() => {

                        readyArray.push('ready');
                        if (readyArray.length === images.length && setIsRedirect) {
                            setIsRedirect(true);

                            console.log(tempObj)
                            setDoc(compareRef, tempObj, { merge: true });
                        }
                    })

                })

            });

        });




    } catch (error) {
        console.error(error);
    }
}

export function copyToClipboard(text) {
    try {


        if (window.clipboardData && window.clipboardData.setData) {
            // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
            return window.clipboardData.setData("Text", text);

        }
        else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
            var textarea = document.createElement("textarea");
            textarea.textContent = text;
            textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
            document.body.appendChild(textarea);
            textarea.select();
            try {
                return document.execCommand("copy");  // Security exception may be thrown by some browsers.
            }
            catch (ex) {
                console.warn("Copy to clipboard failed.", ex);
                return prompt("Copy to clipboard: Ctrl+C, Enter", text);
            }
            finally {
                document.body.removeChild(textarea);
            }
        }

    } catch (error) {
        console.error(error)
    }
}
export function uniqueId(length = 16) {

    return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace(".", ""))
}

export function isUserAlawed(user, isRestrictedToLoggedUsers) {
    try {
        if (typeof isRestrictedToLoggedUsers !== 'boolean') throw new Error('isRestrictedToLoggedUsers is not a boolean');

        console.log(user)
        if ({}.hasOwnProperty.call(user, 'isAnonymous') && user.isAnonymous === false && isRestrictedToLoggedUsers === true) {
            return true
        } else if (isRestrictedToLoggedUsers === false) {
            return true;
        }
        else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}
