import Navbar from "../Navigation/Navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function AddUser() {
  // let history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      photo: "",
      location: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      photo: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      location: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      const newUserValue = {
        id: Math.random(),
        ...values,
        registeredDate: new Date().toLocaleString(),
        lastActiveDate: new Date().toLocaleString(),
        disabled: false,
      };
      console.log(`values`, newUserValue);
    },
  });
  return (
    <>
      <Navbar />
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
          <h2 className="text-3xl text-center text-gray-700 mb-4">New User</h2>

          <div className="w-full mb-2">
            <div className="flex items-center">
              <i className="ml-3 fill-current text-gray-400 text-xs z-10 fas fa-user"></i>
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                placeholder="User Name"
                className="-mx-6 px-8  w-full border rounded py-2 text-gray-700 focus:outline-none"
              />
            </div>
            {formik.touched.name && formik.errors.name ? (
              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                {formik.errors.name}
              </span>
            ) : null}
          </div>

          <div className="w-full mb-2">
            <div className="flex items-center">
              <i className="ml-3 fill-current text-gray-400 text-xs z-10 fas fa-user"></i>
              <input
                id="photo"
                name="photo"
                type="file"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.photo}
                placeholder="Photo"
                className="-mx-6 px-8  w-full border rounded py-2 text-gray-700 focus:outline-none"
              />
            </div>
            {formik.touched.photo && formik.errors.photo ? (
              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                {formik.errors.photo}
              </span>
            ) : null}
          </div>

          <div className="w-full mb-2">
            <div className="flex items-center">
              <i className="ml-3 fill-current text-gray-400 text-xs z-10 fas fa-user"></i>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="Email"
                className="-mx-6 px-8  w-full border rounded py-2 text-gray-700 focus:outline-none"
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                {formik.errors.email}
              </span>
            ) : null}
          </div>

          <div className="w-full mb-2">
            <div className="flex items-center">
              <i className="ml-3 fill-current text-gray-400 text-xs z-10 fas fa-user"></i>
              <input
                id="location"
                name="location"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.location}
                placeholder="Location"
                className="-mx-6 px-8  w-full border rounded py-2 text-gray-700 focus:outline-none"
              />
            </div>
            {formik.touched.location && formik.errors.location ? (
              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                {formik.errors.location}
              </span>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-full text-gray-700 cursor-pointer hover:bg-gray-700 hover:text-white bg-gray-300  focus:outline-none"
          >
            Save
          </button>
        </form>
      </div>
      );
    </>
  );
}
