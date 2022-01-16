import './Nav.scss';
import {Link} from 'react-router-dom';

function Nav(){
    return(
        <nav>
                <Link to='/'>Home</Link>
                <Link to='/create-challange'>
                    Create new challange
                </Link >
                <Link to='/create-compare'>
                    Create new comparison
                </Link>
            </nav>
    )
}

export default Nav