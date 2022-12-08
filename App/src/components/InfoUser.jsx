import { useContext, useState, useEffect, createContext } from 'react';
import getProfile from '../pages/Profile/getProfile';


const InfoUser = () => {
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        getProfile ("profile").then((res) => setProfile(res))
          console.log(profile)
        }, []);
    
    return (
        <div>
        {/* {profile.map((item) => ( */}
            <div className="students" key={profile.id}>
             
            <p>Nombre: {profile.nickname}</p>

        
            </div>
          {/* ))} */}
        </div>
    
      );
    };

export default InfoUser