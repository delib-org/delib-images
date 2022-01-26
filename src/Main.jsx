import { Outlet } from 'react-router-dom';


//components

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