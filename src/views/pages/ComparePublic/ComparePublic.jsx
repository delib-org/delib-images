import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { collection, getDocs } from 'firebase/firestore';
import './ComparePublic.scss';

//controlers
import { db } from '../../../controls/firebase/config';
import {voteCompare} from '../../../controls/firebase/set';

function ComparePublic() {
    const { userId, compareId } = useParams();
    const [images, setImages] = useState([]);
    const [selected, setSelected] = useState(false)

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
    })

    function handleSelected(imageId) {
        setSelected(imageId)
    }

    function handleVote(ev){
        voteCompare(userId, compareId, selected)
    }

    return (
        <div className="comparePublic">
            <div className="wrapper">
                <h2>Which one is more beutiful?</h2>
                <div className="comparePublic__images">
                    {images.map(image => {
                        return <div
                            key={image.imageId}
                            className={image.imageId === selected ? "comparePublic__imageBox comparePublic__imageBox--selected" : "comparePublic__imageBox"}
                            onClick={() => handleSelected(image.imageId)}>
                            <img src={image.imageSrc} alt={image.imageId} />
                        </div>
                    })}
                </div>
                <div className="btns">
                    {selected? <div className="btn" onClick={handleVote}>Vote!</div>:null}
                </div>
            </div>
        </div>
    )
}

export default ComparePublic;