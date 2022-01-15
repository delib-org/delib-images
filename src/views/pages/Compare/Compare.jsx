import { useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import {collection, getDocs } from 'firebase/firestore';
import './Compare.scss';

//controlers
import { copyToClipboard } from '../../../controls/firebase/helpers';
import {db} from '../../../controls/firebase/config';


function Compare() {


    const { userId, compareId } = useParams();
    const [clipboardCopyed, setClipboardCopyed] = useState(false);
    const [images, setImages] = useState([])

    useEffect(()=>{
        const compareRef = collection(db, 'comparison', userId, compareId);

        getDocs(compareRef).then(comparesDB=>{
            const imagesTemp = [];
            comparesDB.forEach(compareDB=>{
                const tempImage = compareDB.data();
                tempImage.imageId = compareDB.id;
                imagesTemp.push(tempImage);
            })
            setImages(imagesTemp)
        })
    })

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
                {images.map(image=>{
                    return  <div key={image.imageId} className="compare__imageBox"><img src={image.imageSrc} alt={image.imageId} /></div>
                })}
               
            </div>
        </div>
    )
}

export default Compare;