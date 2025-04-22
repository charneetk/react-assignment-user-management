import React ,{useState, useEffect} from "react";
import { getCurrentUser, getUserProfile } from "../services/auth.service";
import { User } from "../interfaces/IUser";
import * as AuthService from "../services/auth.service";

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<User | undefined>(undefined);
  useEffect(() => {
    console.log("Fething profile details");
    const fetchProfile = async () => {
      const userProfile = await AuthService.getUserProfile();
    if (userProfile) { 
      setUserProfile(userProfile);
    }
    };
    fetchProfile();
  }, []);
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <img className="w-full h-56 object-cover" src={userProfile?.image} alt={`${userProfile?.firstName}'s avatar`} />
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">{userProfile?.firstName} {userProfile?.lastName}</h2>
        <p className="text-sm text-gray-500">@{userProfile?.username} - {userProfile?.role}</p>
        
        <div className="mt-4">
          <p className="text-sm text-gray-600"><strong>Email:</strong> {userProfile?.email}</p>
          <p className="text-sm text-gray-600"><strong>Phone:</strong> {userProfile?.phone}</p>
          <p className="text-sm text-gray-600"><strong>Location:</strong> {userProfile?.address?.city}, {userProfile?.address?.state}</p>
          <p className="text-sm text-gray-600"><strong>Company:</strong> {userProfile?.company?.name}</p>
          <p className="text-sm text-gray-600"><strong>University:</strong> {userProfile?.university}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
