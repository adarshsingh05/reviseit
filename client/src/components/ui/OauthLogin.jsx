import React from 'react';
import { Button } from './button';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '@/firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OauthLogin = () => {
    const navigate = useNavigate(); // Move useNavigate here
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    const handleLogin = async () => {
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider);
            const user = resultsFromGoogle.user;

            // Prepare user data to send to MongoDB
            const data = {
                // name: user.displayName,
                email: user.email,
                // password: "passcode", // Do not send a password for OAuth users
                // isVerified: true
                // If you have more user info, you can add it here
            };

            // Send user data to your MongoDB API endpoint
            await axios.post('http://localhost:5000/api/auth/login', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('logged in', data);
            navigate("/"); // Navigate after successful signup
        } catch (error) {
            console.error('Error loging in with Google:', error);
            // Optionally, handle the error or notify the user here
        }
    };

    return (
  
<Button 
onClick={handleLogin}
className="bg-[#6198f0] text-white hover:bg-[#357ae8] w-full flex items-center justify-center py-2 rounded-md shadow-md transition-all duration-200"
>
<img 
    src="/google.png" // Make sure to have a Google icon in your assets
    alt="Google logo" 
    className="w-5 h-5 mr-2" 
/>
Login with Google
</Button>
    );
}

export default OauthLogin;