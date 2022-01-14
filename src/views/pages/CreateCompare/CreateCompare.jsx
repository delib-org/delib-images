import { useState } from 'react';
import './CreateCompare.scss';
import addImage from '../../../img/add-image.png';

//controlers
import { uploadImage } from '../../../controls/firebase/helpers';



const images = {}
function CreateCompare() {

    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);

    function handleImageUpload(ev) {
        console.log(ev.target.id)
        console.log(ev.target.files[0])
        if (ev.target.files && ev.target.files[0]) {
            if (ev.target.id === 'addImage1') {
                setImage1(URL.createObjectURL(ev.target.files[0]));
                images['addImage1'] = ev.target.files[0];

            } else if (ev.target.id === 'addImage2') {
                setImage2(URL.createObjectURL(ev.target.files[0]));
                images['addImage2'] = ev.target.files[0];
            }
        }
    }
    function handleCreateComparison() {
        const imagesArray = [];
        for (let image in images) {
            console.log(images[image])
            imagesArray.push({
                name: image, 
                image: images[image]
            })
        }

        if(imagesArray.length <2) {
            alert('You must set two images')
        } else{
            const id = "id" + Math.random().toString(16).slice(2)
            uploadImage({ images:imagesArray, settings: { userId: '1234', comparisonId:id } })
        }
        
    }

    return (
        <div className="createCompare">
            <div className="wrapper">
                {!image1 ?
                    <>
                        <input type="file" id='addImage1' onChange={handleImageUpload} style={{ display: 'none' }} />
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
                        <input type="file" id='addImage2' onChange={handleImageUpload} style={{ display: 'none' }} />
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
            </div>
        </div>
    )
}

export default CreateCompare