import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { collection, getDocs } from 'firebase/firestore';
import { getAuth, signInAnonymously } from "firebase/auth";
import './ComparePublic.scss';

//controlers
import { db } from '../../../controls/firebase/config';
import { voteCompare } from '../../../controls/firebase/set';
import { useNavigate } from 'react-router-dom';
import { isUserAlawed } from '../../../controls/firebase/helpers'

const auth = getAuth();

function ComparePublic({ user }) {
    const navigate = useNavigate();
    const { userId, compareId } = useParams();
    const [images, setImages] = useState([]);
    const [selected, setSelected] = useState(false);
    const [userLogged, setUserLogged] = useState(false);
    const [wasVoted, setWasVoted] = useState(false);
    useEffect(() => {

        console.log(user)

        if (!isUserAlawed(user, false)) {
            navigate('/login')
        }



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
    }, [])

    useEffect(() => {
        console.log(user)
        if (!{}.hasOwnProperty.call(user, 'uid')) {
            signInAnonymously(auth)
                .then(() => {
                    console.log('user signed in anonymously')
                })
                .catch((error) => {
                    console.error(error)
                });
        } else {
            setUserLogged(true);

        }
    }, [user])

    function handleSelected(imageId) {
        setSelected(imageId)
    }

    function handleVote(ev) {
        voteCompare(userId, compareId, selected, user.uid)
        setWasVoted(true);
    }

    return (
        <div className="comparePublic">
            <div className="wrapper">
                <h2>Which one is more beautiful?</h2>
                <p className="explain">please choose and vote</p>
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
                    {!wasVoted ?
                        selected && userLogged ? <div className="btn" onClick={handleVote}>Vote!</div> :<div className="btn btn--disabled">Vote!</div>
                        :
                        <p className='comparePublic__thnaks'>You have voted. Thanks</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default ComparePublic;