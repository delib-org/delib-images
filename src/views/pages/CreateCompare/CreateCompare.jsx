import { useState, useEffect, useContext} from 'react';
import './CreateCompare.scss';
import addImage from '../../../img/add-image.png';
import { Link,useNavigate } from 'react-router-dom';
import { isUserAlawed } from '../../../controls/firebase/helpers';

//controlers
import { uploadImage } from '../../../controls/firebase/helpers';

//components
import Nav from '../../components/nav/Nav';

//state
import { StoreContext } from '../../../App';



const images = {}
function CreateCompare() {

    const {user, setLastPage} = useContext(StoreContext)
    const navigate = useNavigate();
    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [isRedirect, setIsRedirect]  = useState(false);
    const [redirectTo, setRedirectTo] = useState('');

    useEffect(()=>{
        if (!isUserAlawed(user,true)) {
            setLastPage('/create-compare');
            navigate('/login')
        }
    },[])

    function handleImageUpload(ev) {
        
        const image = ev.target.files[0];
        console.dir(image)
        if (image.size > 5000000){
            alert('File is to large. the limit is 5M');
            return;
        }
       
        if (ev.target.files && image) {
            if (ev.target.id === 'addImage1') {
                setImage1(URL.createObjectURL(ev.target.files[0]));
                images['addImage1'] = image;

            } else if (ev.target.id === 'addImage2') {
                setImage2(URL.createObjectURL(ev.target.files[0]));
                images['addImage2'] = image;
            }
        }
    }
    function handleCreateComparison() {
        const imagesArray = [];
        for (let image in images) {
            console.log(images[image])
            imagesArray.push(images[image])
        }

        if (imagesArray.length < 2) {
            alert('You must set two images')
        } else {
            const comparisonId = "id" + Math.random().toString(16).slice(2)
            uploadImage({ images: imagesArray, settings: { userId: user.uid, comparisonId }, setIsRedirect })
            setRedirectTo(`/compare/${user.uid}/${comparisonId}`)
        }

    }

    return (
        <div className="createCompare">
            <h1>Create new comparison</h1>
            <div className="wrapper">
                {!image1 ?
                    <>
                        <input type="file" id='addImage1' onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }} />
                        <label htmlFor="addImage1">
                            <div className="btn--image createCompare__addImage">
                                <img src={addImage} alt="add new" />
                                <p>add first</p>
                            </div>
                        </label>
                    </>
                    :
                    <img className='createCompare__image' src={image1} alt="" />
                }
                {!image2 ?
                    <>
                        <input type="file" id='addImage2' onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }} />
                        <label htmlFor="addImage2">
                            <div className="btn--image createCompare__addImage">
                                <img src={addImage} alt="add new" />
                                <p>add second</p>
                            </div>
                        </label>
                    </>
                    :
                    <img className='createCompare__image' src={image2} alt="" />
                }
                <div className="btns">
                    <div className="btn" onClick={handleCreateComparison}>Save</div>
                    <div className="btn btn--hazard">Cancel & Exit</div>
                </div>

                {isRedirect?<div className="btn--link">
                    <Link to={redirectTo}>{redirectTo}</Link>
                </div>:null}
            </div>
            <Nav />
        </div>
    )
}

export default CreateCompare