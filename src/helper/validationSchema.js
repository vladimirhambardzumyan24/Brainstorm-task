import * as Yup from "yup";

export function validationSchema() {
    const validationYup = Yup.object({
        name: Yup.string()
            .max(20, "Must be 15 characters or less")
            .required("Required"),
        photo: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        location: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
    })

    return validationYup
}