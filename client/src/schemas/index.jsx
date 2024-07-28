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
    userRole:Yup.string().trim().required('this field is required')
    .min(2,"minimum two letters required")
    .max(20,"maximum limit exceeds"),
    rph:Yup.string().required('this field is required')
    .max(5,'maximum amount reached'),
})

export const summarySchema = Yup.object({
    summary: Yup.string().trim()
      .max(200, 'Summary must be at most 200 characters long.'),
  });


export const skillsSchema = Yup.object().shape({
    skills: Yup.string()
    .matches(
         /^(\s*\w+(\.\w+)?\s*,)*\s*\w+(\.\w+)?\s*$/,
      "Skills must be comma-separated words or dot-separated words (e.g., React.js, Express.js) without spaces in between."
      )
  });

  export const educationSchema = Yup.object({
    courseName: Yup.string().required("Course name is required"),
    collegeName: Yup.string().required("College name is required"),
    country: Yup.string().required("Country is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
      .required("End date is required")
      .test('is-greater', 'End date must be greater than start date', function (value) {
        const { startDate } = this.parent;
        return !startDate || !value || value > startDate;
      })
  });

  export const experienceSchema = Yup.object({
    jobTitle: Yup.string().required("jobTitle is required"),
    company: Yup.string().required("company name is required"),
    location: Yup.string().required(" company location is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
      .required("End date is required")
      .test('is-greater', 'End date must be greater than start date', function (value) {
        const { startDate } = this.parent;
        return !startDate || !value || value > startDate;
      })
  });

  

  export const projectSchema = Yup.object({
    projectName: Yup.string().required("project Name is required"),
    projectSummary: Yup.string()
      .required('project description is required')
      .max(200, 'Summary must be at most 200 characters long.'),
  });


let today = new Date();
today.setHours(0, 0, 0, 0);
  
  export const addProjectSchema = Yup.object().shape({
    projectName: Yup.string()
      .required("Project Name is required"),
    type: Yup.string()
      .required("Type is required"),
    budget: Yup.number()
      .required("budget is required")
      .min(0, "Price must be greater than or equal to 0"),
    endDate: Yup.date()
    .required("End Date is required")
    .min(today, "End Date must be later than today"),
    description: Yup.string()
      .required("Description is required"),
    attachment: Yup.mixed()
      .nullable()
      .notRequired(),
  });

  export const bidSchema = Yup.object().shape({
    bidAmount: Yup.number().required('Bid amount is required').min(1, 'Bid amount must be at least 1'),
    deliveryTime: Yup.number()
    .required('Delivery time is required')
    .min(1, 'Delivery time must be at least 1 day')
    .max(360, 'Delivery time must be less than a year')
  });
  


  export const videoConferenceInputSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(2,"minimum two letters required").max(15,"maximum limit exceeds")
      .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ'][A-Za-zÀ-ÖØ-öø-ÿ' -]{1,49}$/,'invalid name format'),
    workNumber: Yup.string()
      .required('Work Number is required')
      .matches(/^WORK\d{4}$/, 'Invalid Work Number'),
  });