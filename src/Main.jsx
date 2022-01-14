import { Outlet, Link } from 'react-router-dom';

//components
import Nav from './views/components/nav/Nav'

function Main() {
    return (
        <div className="main">
            <h1>Delib Images</h1>
            <Nav />
            <Outlet/>
        </div>
    )
}
export default Main