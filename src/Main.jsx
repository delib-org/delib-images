import { Outlet } from 'react-router-dom';


//components
import Nav from './views/components/nav/Nav'
import Footer from './views/components/footer/Footer'

function Main() {
    return (
        <div className="main">
    
    
            <Outlet />
            <Footer />
          
        </div>
    )
}
export default Main