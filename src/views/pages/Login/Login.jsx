import { useEffect } from 'react';
import './Login.scss';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const provider = new GoogleAuthProvider();



const auth = getAuth();


auth.languageCode = 'en';

function Login({user, lastPage}) {
    const navigate = useNavigate();

    useEffect(()=>{
        console.log(user)
        if({}.hasOwnProperty.call(user, 'isAnonymous') && user.isAnonymous === false){
            navigate(lastPage)
        }
    },[user])

    function handleGoogleLogin() {
        signInWithPopup(auth, provider)
            .then((result) => {
              
                navigate(lastPage);
              
            }).catch((error) => {
               
                console.error(error)
             
            });
    }
    return (
        <div className="login">
            <h1>Delib Images</h1>
            <div className="btn" onClick={handleGoogleLogin}>
                Goolge Login
            </div>
        </div>
    )
}

export default Login;