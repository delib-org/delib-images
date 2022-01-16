import { useEffect, useState } from 'react'
import { onSnapshot, collection } from 'firebase/firestore';
import './Home.scss';
import { Link, useNavigate } from 'react-router-dom';

//controls
import { isUserAlawed } from '../../../controls/firebase/helpers';
import { db } from '../../../controls/firebase/config'

function Home({ user, setLastPage }) {
    const navigate = useNavigate();
    const [comparisons, setComparisons] = useState([])

    useEffect(() => {

        if ( !isUserAlawed(user, true)) {
            setLastPage('/');
            navigate('/login')
        }

        

    }, []);

    useEffect(()=>{
        if({}.hasOwnProperty.call(user, 'uid')){
            const compareRef = collection(db, 'comparison', user.uid, 'all');
            const unsubscruibe = onSnapshot(compareRef, comparesDB => {
                const comparisonsTemp = [];
                comparesDB.forEach(compareDB => {
                    const compareObj = compareDB.data();
                    compareObj.id = compareDB.id;
                    comparisonsTemp.push(compareObj);
    
                })
                console.log(comparisonsTemp)
                setComparisons(comparisonsTemp)
            })
    
            return () => {
                unsubscruibe();
            }
        }
    },[user])

    function handleCompareNavigate(compareId){
        navigate(`/compare/${user.uid}/${compareId}`)
    }

    return (
        <div className='home'>
            <h1>Home</h1>
            <div className="wrapper">
                <div className="home__nav btns">
                    <div className="btn--link">
                        <Link to='/create-challange'>
                            Create a challange
                        </Link >
                    </div >
                    <div className="btn--link">
                        <Link to='/create-compare'>
                            Create new comparison
                        </Link>
                    </div>
                </div>
                <div className="home__allCompares">
                    <h2>All comparisons</h2>
                    {comparisons.map((compare) => {
                        return (
                            <div key={compare.id} className="home__compares__card" onClick={()=>{handleCompareNavigate(compare.id)}}>

                                {compare.images.map((img, index) => {
                                    return <div key={index} className="home__compares__image" style={{ backgroundImage: `url(${img})` }}></div>
                                })
                                }

                            </div>
                        )

                    })
                    }




                </div>

            </div>
        </div>



    )
}

export default Home;