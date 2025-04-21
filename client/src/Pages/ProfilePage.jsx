import React, { useRef } from 'react';
import { useAuthStore } from '../Store/Store';
import Spinner from '../Components/Spinner'
const ProfilePage = () => {
    const { authUser, updateProfilePic, isLoading } = useAuthStore()
  // Hardcoded user data based on your provided object.
  const userData = {
    createdAt: authUser?.createdAt || " ",
    email: authUser?.email || "",
    name: authUser?.name || "",
    profilePic: authUser?.profilePic || "./profile.png",  // If empty, we'll show a placeholder image.
    updatedAt: authUser?.updatedAt || "",
  };


 if (isLoading) {
  return <Spinner/>
 }

  const fileInputRef = useRef(null);

  // Trigger the hidden file input.
  const handleUpdatePic = () => {
    fileInputRef.current.click();
  };

  // Handle file selection.
  const handleFileChange = async (e) => {
    const profilePic = e.target.files[0];
    if (!profilePic) return;
    const reader = new FileReader()
    reader.readAsDataURL(profilePic)

    reader.onload = async () => {
        const base64Image = reader.result
        await updateProfilePic(base64Image)
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="card shadow-lg bg-base-100 max-w-md mx-auto">
        <div className="card-body items-center text-center">
          {/* Profile Avatar */}
          <div className="avatar">
            <div className="w-32 h-32 rounded-full overflow-hidden">
                <img src={userData.profilePic} alt="Profile" className="object-cover object-center w-full h-full"/>
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
