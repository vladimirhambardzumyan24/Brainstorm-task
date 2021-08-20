import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Navbar from "../Navigation/Navigation";
import { httpClient } from "../../service/axios.service";
import { uploadImage } from "../../helper/uploadImage.helper";
import { validationSchema } from "../../helper/validationSchema";
import { getUserById } from "../../service/user.service";
import "../Users/User.css";

export default function EditUser() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserById(id).then((res) => {
      setUserData(res.data);
      setIsLoading(false);
    });
  }, [id]);

  const formik = useFormik({
    initialValues: {
      name: userData.name,
      email: userData.email,
      photo: userData.photo,
      location: userData.location,
    },
    enableReinitialize: true,

    validationSchema: validationSchema(),

    onSubmit: async (values) => {
      const newUserValue = {
        id: Math.random(),
        ...values,
        registeredDate: userData.registeredDate,
        lastActiveDate: new Date().toLocaleString(),
        disabled: false,
      };
      console.log(`values`, newUserValue);
      const res = await httpClient.put(`/users/${id}`, newUserValue);
      console.log("res", res);
    },
  });

  return (
    <>
      <Navbar />
      {isLoading ? (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <h2 className="text-center text-white text-xl font-semibold">
            Loading...
          </h2>
          <p className="w-1/3 text-center text-white">
            This may take a few seconds, please don't close this page.
          </p>
        </div>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <form
            onSubmit={formik.handleSubmit}
            className="w-full md:w-1/3 bg-white rounded-lg"
          >
            <div className="flex font-bold justify-center mt-6">
              <img
                className="h-20 w-20"
                src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg"
                alt="User Logo"
              />
            </div>
            <h2 className="text-3xl text-center text-gray-700 mb-4">
              Edit User
            </h2>

            <div className="w-full mb-2">
              <div className="flex items-center">
                <i className=" fill-current text-gray-400 text-xs z-10 fas fa-user"></i>
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  placeholder="User Name"
                  className=" px-8  w-full border rounded py-2 text-gray-700 focus:outline-none border-gray-300"
                />
              </div>
              {formik.touched.name && formik.errors.name && (
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  {formik.errors.name}
                </span>
              )}
            </div>

            <div className="w-full mb-2">
              <div className="flex items-center">
                <label className="w-full flex flex-col items-center  py-1.5 bg-white rounded-md shadow-md tracking-wide uppercase border border-gray-300 cursor-pointer hover:bg-gray-500 hover:text-white text-gray-700 ease-linear transition-all duration-150">
                  <i className=" fill-current text-gray-400 text-xs z-10 fas fa-user"></i>
                  <span className="mt-1.5 text-base leading-normal">
                    Select a Photo
                  </span>
                  <input
                    id="photo"
                    name="photo"
                    type="file"
                    onChange={async (event) => {
                      const data = await uploadImage(
                        event.currentTarget.files[0]
                      );
                      formik.setFieldValue("photo", data.url);
                    }}
                    onBlur={formik.handleBlur}
                    placeholder="Photo"
                    className="hidden"
                  />
                </label>
              </div>
              {formik.touched.photo && formik.errors.photo && (
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  {formik.errors.photo}
                </span>
              )}
            </div>

            <div className="w-full mb-2">
              <div className="flex items-center">
                <i className=" fill-current text-gray-400 text-xs z-10 fas fa-user"></i>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  placeholder="Email"
                  className=" px-8  w-full border rounded py-2 text-gray-700 focus:outline-none border-gray-300"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  {formik.errors.email}
                </span>
              )}
            </div>

            <div className="w-full mb-2 ">
              <div className="flex items-center ">
                <i className=" fill-current text-gray-400 text-xs z-10 fas fa-user"></i>
                <input
                  id="location"
                  name="location"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.location}
                  placeholder="Location"
                  className="px-8  w-full border rounded py-2 text-gray-700 focus:outline-none border-gray-300"
                />
              </div>
              {formik.touched.location && formik.errors.location && (
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  {formik.errors.location}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-full text-gray-700 cursor-pointer hover:bg-gray-700 hover:text-white bg-gray-300  focus:outline-none"
            >
              Save
            </button>
          </form>
        </div>
      )}{" "}
      );
    </>
  );
}
