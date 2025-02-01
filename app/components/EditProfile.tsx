"use client";
import React, { useState } from "react";

const EditProfile: React.FC = () => {
  // State to handle profile image upload
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Handle profile image change
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-2xl p-6">
        {/* Profile Image Section */}
        <div className="mb-6 flex flex-col items-center">
          <div className="relative">
            {/* Image Preview */}
            <div className="h-32 w-32 overflow-hidden rounded-full border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* Image Upload Button */}
            <label
              htmlFor="profileImage"
              className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-blue-600 p-1 text-xs text-white hover:bg-blue-700"
            >
              Upload
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Form Section */}
        <form>
          <div className="grid gap-6 md:grid-cols-2">
            {/* First Name */}
            <div>
              <label
                htmlFor="first_name"
                className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
              >
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                placeholder="John"
                required
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="last_name"
                className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                placeholder="Doe"
                required
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mt-4">
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="john.doe@company.com"
              required
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            />
          </div>

          {/* Department Dropdown */}
          <div className="mt-4">
            <label
              htmlFor="department"
              className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Department
            </label>
            <select
              id="department"
              required
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Department</option>
              <option value="cse">Computer Science</option>
              <option value="ece">Electronics and Communication</option>
              <option value="mech">Mechanical</option>
              <option value="civil">Civil</option>
            </select>
          </div>

          {/* Batch Section */}
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            {/* Year */}
            <div>
              <label
                htmlFor="year"
                className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Year
              </label>
              <input
                type="text"
                id="year"
                placeholder="2025"
                required
                className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
            </div>

            {/* Semester Dropdown */}
            <div>
              <label
                htmlFor="semester"
                className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Semester
              </label>
              <select
                id="semester"
                required
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Semester</option>
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
              </select>
            </div>
          </div>

          {/* Password */}
          <div className="mt-4">
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="•••••••••"
              required
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
