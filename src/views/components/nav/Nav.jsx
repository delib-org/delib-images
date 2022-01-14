import './Nav.scss';
import {Link} from 'react-router-dom';

function Nav(){
    return(
        <nav>
                <Link to='/main'>main</Link>
                <Link to='/create-challange'>
                    Create a chalange
                </Link >
                <Link to='/create-compare'>
                    compare images comparison
                </Link>
            </nav>
    )
}

export default Nav