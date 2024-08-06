import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../../../Context/AuthContext";
import { Link } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../../../config/firebase";
import MyLogo from "../../../Images/background/Meteor.svg"
import MyLogos from "../../../Images/background/3412810.jpg"

import toast from "react-hot-toast";
function Profile() {
  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm();
  const [authData] = useAuth();
  console.log(authData)
  const [name, setName] = useState(authData?.displayName || "User");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (auth.currentUser) {
      setName(authData?.displayName || "User");
    }
  }, [authData]);

  const onSubmit = async () => {
    let photoURL = auth.currentUser?.photoURL;

    if (image) {
      const storage = getStorage();
      const imageRef = ref(storage, `profileImages/${image.name}`);
      await uploadBytes(imageRef, image);
      photoURL = await getDownloadURL(imageRef);
    }

    try {
      await updateProfile(auth.currentUser, {
        displayName: name || "User",
        photoURL,
      });
      toast.success("Profile updated");
    } catch (error) {
      toast.error("Error updating profile: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gradient-to-br from-emerald-600 via-teal-700 to-blue-900/50  p-6"  style={{backgroundImage:`url(${MyLogos})`,backgroundSize:"100vw 100vh" , backgroundRepeat:"no-repeat", }}>


      <div className="w-full max-w-3xl     rounded-lg  shadow-2xl  p-4 md:p-6"  style={{backgroundImage:`url(${MyLogo})`,backgroundSize:"100vw 100vh" , backgroundRepeat:"no-repeat", }}>
        <h2 className="text-2xl font-bold  text-white mb-20 ">Edit Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-col gap-6">
          {/* Profile Image Section */}
          <div className="flex-shrink-0  md:w-1/3 flex justify-center items-center relative">
            <div className="absolute inset-0 backdrop-blur-4xl   rounded-full  flex justify-start  items-center">
              <img
                src={authData?.photoURL || 'https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png'}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
          </div>
          {/* Profile Details Section */}
          <div className="flex-grow  justify-center  items-center">
            <div className="mb-2">
              <label className="block text-sm font-medium text-white mb-12"></label>
              <div className="relative p-3">
                <label
                  htmlFor="file"
                  className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  Upload File
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  {...register('profilePhoto')}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setImage(file);
                    setValue('profilePhoto', file);
                  }}
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-2">Name</label>
              <Controller
                name="name"
                control={control}
                defaultValue={name}
                render={({ field }) => (
                  <input
                    type="text"
                    placeholder="Enter your name"
                    {...field}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      field.onChange(e);
                    }}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                )}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div className="flex flex-col gap-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
              <Link to="/" className="w-full">
                <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                  Back
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
