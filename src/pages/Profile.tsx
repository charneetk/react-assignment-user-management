import React, { useState, useEffect } from "react";
import { User } from "../interfaces/IUser";
import * as AuthService from "../services/AuthService";
import { customClasses } from "../utils/constant";

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<User | undefined>(undefined);
  const token = localStorage.getItem("token");
  useEffect(() => {
    console.log("Fething profile details");
    const fetchProfile = async () => {
      const userProfile = token
        ? await AuthService.getUserProfile(token)
        : null;
      if (userProfile) {
        setUserProfile(userProfile);
      }
    };
    fetchProfile();
  }, []);
  return (
    <div className={customClasses.profileContainer}>
      <img
        className={customClasses.imageContainer}
        src={userProfile?.image}
        alt={`${userProfile?.firstName}'s avatar`}
      />
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {userProfile?.firstName} {userProfile?.lastName}
        </h2>
        <p className={customClasses.profileText}>
          @{userProfile?.username} - {userProfile?.role}
        </p>

        <div className="mt-4">
          <p className={customClasses.profileText}>
            <strong>Email:</strong> {userProfile?.email}
          </p>
          <p className={customClasses.profileText}>
            <strong>Phone:</strong> {userProfile?.phone}
          </p>
          <p className={customClasses.profileText}>
            <strong>Location:</strong> {userProfile?.address?.city},{" "}
            {userProfile?.address?.state}
          </p>
          <p className={customClasses.profileText}>
            <strong>Company:</strong> {userProfile?.company?.name}
          </p>
          <p className={customClasses.profileText}>
            <strong>University:</strong> {userProfile?.university}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
