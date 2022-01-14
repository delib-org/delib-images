import './Home.scss';
import { Link, Outlet } from 'react-router-dom'

function Home() {
    return (
        <div className='home'>
            <div className="home__nav">
                <div className="btn--link">
                    <Link to='/create-challange'>
                        Create a chalange
                    </Link >
                </div >
                <div className="btn--link">
                    <Link to='/create-compare'>
                        compare images comparison
                    </Link>
                </div>
            </div>
            
        </div >
    )
}

export default Home;