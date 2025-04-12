import React, { useRef } from 'react';
import { useAuthStore } from '../Store/Store';

const ProfilePage = () => {
    const { authUser, updateProfilePic } = useAuthStore()
  // Hardcoded user data based on your provided object.
  const userData = {
    createdAt: authUser?.createdAt || " ",
    email: authUser?.email || "",
    name: authUser?.name || "",
    profilePic: authUser?.profilePic || "./profile.png",  // If empty, we'll show a placeholder image.
    updatedAt: authUser?.updatedAt || "",
  };

  const fileInputRef = useRef(null);

  // Trigger the hidden file input.
  const handleUpdatePic = () => {
    fileInputRef.current.click();
  };

  // Handle file selection.
  const handleFileChange = async (e) => {
    const profilePic = e.target.files[0];
    if (profilePic) {
      // Here you would typically upload the file to your server.
      console.log("Selected file:", profilePic);
      await updateProfilePic(profilePic.name)
      // After successful upload, update your user's profilePic URL.
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="card shadow-lg bg-base-100 max-w-md mx-auto">
        <div className="card-body items-center text-center">
          {/* Profile Avatar */}
          <div className="avatar">
            <div className="w-24 rounded-full">
                <img src={userData.profilePic} alt="Profile" />
            </div>
          </div>
          {/* Hidden file input and update button */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          <button onClick={handleUpdatePic} className="btn btn-outline btn-sm mt-2">
            Update Picture
          </button>
          {/* User Details */}
          <h2 className="card-title mt-4">{userData.name}</h2>
          <p>{userData.email}</p>
          <div className="text-sm text-gray-500 mt-2">
            Joined: {new Date(userData.createdAt).toLocaleDateString()}
          </div>
          <div className="text-xs text-gray-400">
            Last Updated: {new Date(userData.updatedAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
