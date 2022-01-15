import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { collection, getDocs, onSnapshot, doc } from 'firebase/firestore';
import './Compare.scss';

//controlers
import { copyToClipboard } from '../../../controls/firebase/helpers';
import { db } from '../../../controls/firebase/config';


function Compare() {


    const { userId, compareId } = useParams();
    const [clipboardCopyed, setClipboardCopyed] = useState(false);
    const [images, setImages] = useState([]);
    const [results, setResults] = useState({});

    useEffect(() => {
        const compareRef = collection(db, 'comparison', userId, compareId);

        getDocs(compareRef).then(comparesDB => {
            const imagesTemp = [];
            comparesDB.forEach(compareDB => {
                if (compareDB.id !== 'results') {
                    const tempImage = compareDB.data();
                    tempImage.imageId = compareDB.id;
                    imagesTemp.push(tempImage);
                }
            })
            setImages(imagesTemp)
        })

        const resultsRef = doc(db, 'comparison', userId, compareId, 'results');
        const unsubscribe = onSnapshot(resultsRef, resultDB => {
            const resultsObj = resultDB.data();
            const resultsFinalObj = {};

            for (let voterId in resultsObj) {
              
                const imageId = resultsObj[voterId];
                if ({}.hasOwnProperty.call(resultsFinalObj, imageId)) {
                    resultsFinalObj[imageId]++;
                } else {
                    resultsFinalObj[imageId] = 1;
                }
            }

           
            setResults(resultsFinalObj);
         
        })
        return () => {
            unsubscribe();
        }
    }, [])

    function handleCopy() {
        const domain = window.location.hostname;
        copyToClipboard(`${domain}/compare-public/${userId}/${compareId}`);
        setClipboardCopyed(true);
        setTimeout(() => {

            setClipboardCopyed(false);
        }, 2000)

    }

    return (
        <div className="compare">
            <p>compareId:{compareId}</p>
            <p>userId:{userId}</p>
            {clipboardCopyed ?
                <div className="btn" style={{ background: 'white', color: "black", border: "1px solid black" }}>Linked copyed!</div>
                :
                <div className="btn" onClick={handleCopy}>Copy link and send to friends</div>
            }
            <div className="compare__images">
                {images.map(image => {
                    return <div key={image.imageId} className="compare__imageBox">
                        <img src={image.imageSrc} alt={image.imageId} />
                        <p>Score: {results[image.imageId]?results[image.imageId]:0}</p>
                    </div>
                })}

            </div>
        </div>
    )
}

export default Compare;