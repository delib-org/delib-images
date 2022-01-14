import { useParams } from "react-router-dom";
import './Compare.scss';

function Compare(){

    const {userId,compareId } = useParams();

    return(
        <div className="compare">
            <p>compareId:{compareId}</p>
            <p>userId:{userId}</p>
        </div>
    )
}

export default Compare;