import * as Yup from 'yup'

export const signupSchema=Yup.object({
    username:Yup.string().required('name is required')
    .min(2,"minimum two letters required").max(15,"maximum limit exceeds")
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ'][A-Za-zÀ-ÖØ-öø-ÿ' -]{1,49}$/,'invalid name format'),
    email: Yup.string().email("Invalid email format").required('email is required'),
    password:Yup.string().required('password is required')
    .min(8,"password must be at leaset 8 characters")
    .matches(/[!@#$%^&*(),.?":{}|<>]/,'atleast one symbol required')
    .matches(/[0-9]/,"atleast one number required")
    .matches(/[A-Z]/,"atleast one uppercase letter required")
    .matches(/[a-z]/,"atleast one lowercase letter required"),
    confirmPassword:Yup.string().oneOf([Yup.ref("password")],"password must match").required("confirmpassword is required"),
    terms:Yup.boolean().oneOf([true], 'You must accept the terms and conditions')
})

export const loginSchema=Yup.object({
    email: Yup.string().email("Invalid email format").required('email is required'),
    password:Yup.string().required('password is required')
    .min(8,"password must be at leaset 8 characters")
    .matches(/[!@#$%^&*(),.?":{}|<>]/,'atleast one symbol required')
    .matches(/[0-9]/,"atleast one number required")
    .matches(/[A-Z]/,"atleast one uppercase letter required")
    .matches(/[a-z]/,"atleast one lowercase letter required"),
})

export const firstSectionSchema=Yup.object({
    userRole:Yup.string().required('this field is required')
    .min(2,"minimum two letters required")
    .max(20,"maximum limit exceeds"),
    rph:Yup.string().required('this field is required')
    .max(5,'maximum amount reached'),
})

export const summarySchema = Yup.object({
    summary: Yup.string()
      .max(200, 'Summary must be at most 200 characters long.'),
  });


export const skillsSchema = Yup.object().shape({
    skills: Yup.string()
    .matches(
         /^(\s*\w+(\.\w+)?\s*,)*\s*\w+(\.\w+)?\s*$/,
      "Skills must be comma-separated words or dot-separated words (e.g., React.js, Express.js) without spaces in between."
      )
  });