import { Checkbox, Modal } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
// import { Country, getCountries } from "../../../Services/General/countries";
import { UserRegister } from "../../../Utils/Interface/register.interface";
import toast, { Toaster } from "react-hot-toast";
import { errorToast } from "../../../Utils/Toast/error.toast";
import { getUserRegisteredData } from "../../../Services/Authentication/register";
import { ArrowLeft, Check, Cross } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Link } from "react-router-dom";
import { Progress } from "@/Components/signupui/progress";

const BusinessSignUp1Step = ({
  authenticationModal,
  setAuthenticationModal,
  setUserRegisterData,
  userRegisterData,
}: any) => {

  const [step, setStep] = useState(2)
  const steps = [
    { number: 1, title: "Email", description: "Your contact" },
    { number: 2, title: "Create Account", description: "Set up access" },
  ]
  const [progress, setProgress] = useState(100)
  const passwordRequirements = [
    {
      label: "8+ chars with uppercase, lowercase, number & special char (!@#$%^&*)",
      regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
    },
  ]
  const onClose = (): void => {
    setAuthenticationModal({
      isSignUp1Step: false,
      isSignUp2Step: false,
      isBusinessSignUp1Step: false,
      isForgotPassOpen: false,
      isSignInOpen: false,
      isSignUpOpen: false,
    });
  };

  const handleSign2Step = async () => {
    try {
      console.log(userRegisterData);

      if (userRegisterData.businessName === "") {
        return errorToast("Please enter your Business Name");
      } else if (userRegisterData.businessAddress === "") {
        return errorToast("Please enter your business Address");
      } else if (userRegisterData.city === "") {
        return errorToast("Please enter your business city");
      } else if (userRegisterData.postcode === "") {
        return errorToast("Please enter your business postcode");
      } else if (userRegisterData.country === "") {
        return errorToast("Please enter your country");
      } else if (userRegisterData.phone === "") {
        return errorToast("Please enter your phone");
      }
      else if (userRegisterData.landline === "") {
        return errorToast("Please enter your landline number");
      } else if (userRegisterData.password === "") {
        return errorToast("Please enter your password");
      } else if (userRegisterData.confirmPassword === "") {
        return errorToast("Please enter your confirm password");
      } else if (
        userRegisterData.password !== userRegisterData.confirmPassword
      ) {
        return errorToast("Passwords do not match");
      }
      const result = await getUserRegisteredData(userRegisterData);

      if (!result.success) {
        if (result.message == "User already Exist. Please verify the user") {
          setAuthenticationModal({
            isSignUp1Step: false,
            isSignUp2Step: true,
            isBusinessSignUp1Step: false,
            isForgotPassOpen: false,
            isSignInOpen: false,
            isSignUpOpen: false,
          });
        }

        return errorToast(result.message);
      }

      setAuthenticationModal({
        isSignUp1Step: false,
        isSignUp2Step: true,
        isForgotPassOpen: false,
        isBusinessSignUp1Step: false,
        isSignInOpen: false,
        isSignUpOpen: false,
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const goBack = (): void => {
    setAuthenticationModal({
      isSignUp1Step: false,
      isSignUp2Step: false,
      isForgotPassOpen: false,
      isBusinessSignUp1Step: false,
      isSignInOpen: false,
      isSignUpOpen: true,
    });
  };

  // const [countriesData, setCountriesData] = useState<Country[]>([]);

  // useEffect(() => {
  //   const countries = async () => {
  //     const result = await getCountries();
  //     setCountriesData(result);
  //   };
  //   countries();
  // }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUserRegisterData((prev: UserRegister) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSelectDialCode = (e: any): void => {
    const selectedOption = e.target.selectedOptions[0];
    const name = selectedOption.getAttribute("data-name");
    const dialCode = selectedOption.getAttribute("data-dialcode");
    setUserRegisterData((prev: UserRegister) => {
      return {
        ...prev,
        dialCode: {
          country: name,
          code: e.target.value,
          dial_code: dialCode,
        },
      };
    });
  };
  const handleSignIn = () => {
    setAuthenticationModal({
      isSignUp1Step: false,
      isSignUp2Step: false,
      isBusinessSignUp1Step: false,
      isForgotPassOpen: false,
      isSignUpOpen: false,
      isSignInOpen: true
    });
  }

  const handleSignUp = () => {
    setAuthenticationModal({
      isSignUp1Step: false,
      isSignUp2Step: false,
      isBusinessSignUp1Step: false,
      isForgotPassOpen: false,
      isSignUpOpen: true,
      isSignInOpen: false
    });
  }
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Modal
        className="bg-[#160B3A]"
        dismissible
        position="center"
        show={authenticationModal.isBusinessSignUp1Step}
        onClose={onClose}
        popup
        theme={{
          content: {
            base: "bg-transparent shadow-none",
          },
        }}
      >
        <div className='rounded-xs'>
          {/* <Modal.Body style={{ fontFamily: "poppins, sans-serif" }}> */}
          <div style={{ fontFamily: "poppins, sans-serif" }} className="py-3 flex items-center justify-center py-4">
            <div className="w-full max-w-md bg-white rounded-lg overflow-hidden">
              <div className="px-4 space-y-6">
                {/* Header with Back Button and Progress */}
                <header className="flex items-center justify-between">

                  <button onClick={() => { goBack(); setStep((prev) => prev - 1) }} className="p-2 hover:bg-gray-100 rounded-full">
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <div className="flex space-x-2">
                    <Button variant="ghost" asChild>
                      <Link to={'#'} onClick={handleSignIn}>Sign In</Link>
                    </Button>
                    <Button className="bg-pink-500 text-white hover:bg-pink-600" onClick={handleSignUp}>Sign Up</Button>
                  </div>
                </header>
                {/* <div onClick={goBack} className="cursor-pointer absolute top-4">
                  <svg
                    width="10"
                    height="16"
                    viewBox="0 0 10 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.44033 14.0972C9.85557 14.5178 9.86807 15.213 9.46885 15.6503C9.26416 15.8743 8.99072 15.9872 8.71728 15.9872C8.45713 15.9872 8.19658 15.8854 7.99463 15.6806L1.21611 8.81616C1.01182 8.60964 0.895996 8.32353 0.895996 8.02529C0.895996 7.72601 1.01182 7.44052 1.21611 7.23339L7.99463 0.369592C8.40947 -0.0506281 9.06963 -0.0372585 9.46885 0.399622C9.86807 0.837531 9.85537 1.53276 9.44033 1.95256L3.44385 8.02529L9.44033 14.0972Z"
                      fill="black"
                    />
                  </svg>
                </div> */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    {steps.map((s) => (
                      <div
                        key={s.number}
                        className={`flex flex-col items-center text-purple-700`}
                      >
                        <span>{s.title}</span>
                        <span className="text-xs text-gray-500">{s.description}</span>
                      </div>
                    ))}
                  </div>
                  <Progress value={progress} className="h-3 transition-all duration-500 ease-in-out" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight">Step 1 :&nbsp; Complete your information</h3>
                </div>
                <div className="mt-4" style={{ color: "black", fontFamily: "poppins, sans-serif" }}>
                  <p className="text-sm lg:text-md">Business Name</p>
                  <div className="flex items-center gap-4 rounded-md p-2 lg:p-2 border-[1px] mt-2">
                    <input
                      onChange={handleChange}
                      value={userRegisterData.businessName}
                      className="border-none outline-none w-[100%]"
                      type="text"
                      placeholder="Enter your Business Name"
                      name="businessName"
                      id="businessName"
                    />
                  </div>
                  <p className="mt-4 text-sm lg:text-md">Business Address</p>
                  <div className="flex items-center justify-between  gap-4 rounded-md p-2 lg:p-2 border-[1px] mt-2">
                    <input
                      onChange={handleChange}
                      value={userRegisterData.businessAddress}
                      className="border-none outline-none w-[100%]"
                      type="text"
                      placeholder="Enter your Business Address"
                      name="businessAddress"
                      id="businessAddress"
                    />
                  </div>
                  <p className="mt-4 text-sm lg:text-md">City or Town</p>
                  <div className="flex items-center justify-between  gap-4 rounded-md p-2 lg:p-2 border-[1px] mt-2">
                    <input
                      onChange={handleChange}
                      value={userRegisterData.city}
                      className="border-none outline-none w-[100%]"
                      type="text"
                      placeholder="Enter your Business City or Town"
                      name="city"
                      id="city"
                    />
                  </div>
                  <p className="mt-4 text-sm lg:text-md">Postcode</p>
                  <div className="flex items-center justify-between  gap-4 rounded-md p-2 lg:p-2 border-[1px] mt-2">
                    <input
                      onChange={handleChange}
                      value={userRegisterData.postcode}
                      className="border-none outline-none w-[100%]"
                      type="text"
                      placeholder="Enter your postcode"
                      name="postcode"
                      id="postcode"
                    />
                  </div>
                  <p className="mt-4 text-sm lg:text-md">Country</p>
                  <div className="flex items-center justify-between  gap-4 rounded-md p-2 lg:p-2 border-[1px] mt-2">
                    <input
                      onChange={handleChange}
                      value={userRegisterData.country}
                      className="border-none outline-none w-[100%]"
                      type="text"
                      placeholder="Enter your Country"
                      name="country"
                      id="country"
                    />
                  </div>
                  <p className="mt-4 text-sm lg:text-md">Phone Number</p>
                  <div className="flex mb-2 items-center gap-4">

                    <div className="w-[100%] flex items-center justify-between gap-4 rounded-md p-2 lg:p-2 border-[1px] mt-2">
                      <input
                        onChange={handleChange}
                        value={userRegisterData.phone}
                        className="border-none outline-none w-full"
                        type="number"
                        placeholder="Enter your Phone Number"
                        name="phone"
                        id="phone"
                      />
                    </div>
                  </div>
                  <p className="mt-4 text-sm lg:text-md">Landline Number</p>
                  <div className="flex mb-2 items-center gap-4">
                    <div className="w-[100%] flex items-center justify-between gap-4 rounded-md p-2 lg:p-2 border-[1px] mt-2">
                      <input
                        onChange={handleChange}
                        value={userRegisterData.landline}
                        className="border-none outline-none w-full"
                        type="tel"
                        pattern="[0-9]{6,14}"  // Regular expression to allow only numbers (6-14 digits)
                        placeholder="Enter your Landline Number"
                        name="landline"
                        id="landline"
                        maxLength={14}  // Limiting the length to 14 characters (adjust based on the country's max length)
                      />
                    </div>
                  </div>

                  <p className="text-xs">
                    We use this number to verify your account and will never contact
                    you for marketing purposes unless opted in via marketing
                    preferences.
                  </p>
                  <p className="mt-4 text-sm lg:text-md">Set up a password</p>
                  <div className="flex items-center justify-between gap-4 rounded-md p-2 lg:p-2 border-[1px] mt-2">
                    <input
                      onChange={handleChange}
                      value={userRegisterData.password}
                      className="border-none outline-none w-[100%]"
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      id="password"
                    />
                    {passwordVisible ? (
                      <svg
                        onClick={() => {
                          setPasswordVisible(false);
                        }}
                        width="24"
                        height="21"
                        viewBox="0 0 29 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 12C1.26055 5.17301 7.27301 0 14.5 0C21.727 0 27.7395 5.17301 29 12C27.7395 18.8269 21.727 24 14.5 24C7.27301 24 1.26055 18.8269 0 12ZM14.5 18.6667C18.2011 18.6667 21.2014 15.6819 21.2014 12C21.2014 8.31811 18.2011 5.33333 14.5 5.33333C10.7989 5.33333 7.79858 8.31811 7.79858 12C7.79858 15.6819 10.7989 18.6667 14.5 18.6667ZM14.5 16C12.2793 16 10.4791 14.2092 10.4791 12C10.4791 9.7908 12.2793 8 14.5 8C16.7206 8 18.5209 9.7908 18.5209 12C18.5209 14.2092 16.7206 16 14.5 16Z"
                          fill="black"
                          fill-opacity="0.5"
                        />
                      </svg>
                    ) : (
                      <svg
                        onClick={() => {
                          setPasswordVisible(true);
                        }}
                        width="24"
                        height="21"
                        viewBox="0 0 29 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.47497 5.99383L0.284166 1.86667L2.17962 0L28.7159 26.1332L26.8204 28L22.3841 23.631C20.1039 25.0548 17.3997 25.8794 14.5 25.8794C7.27301 25.8794 1.26055 20.7583 0 14C0.585274 10.8621 2.19495 8.07711 4.47497 5.99383ZM18.1957 19.5063L16.2336 17.5739C15.7086 17.8212 15.1207 17.9598 14.5 17.9598C12.2793 17.9598 10.4791 16.1869 10.4791 14C10.4791 13.3886 10.6198 12.8097 10.871 12.2927L8.90887 10.3604C8.20721 11.4037 7.79858 12.6549 7.79858 14C7.79858 17.6449 10.7989 20.5997 14.5 20.5997C15.8658 20.5997 17.1362 20.1972 18.1957 19.5063ZM9.10429 3.12375C10.7754 2.47624 12.5955 2.12061 14.5 2.12061C21.727 2.12061 27.7395 7.24162 29 14C28.5816 16.2434 27.6395 18.3064 26.3032 20.0615L21.13 14.9669C21.1771 14.6513 21.2014 14.3284 21.2014 14C21.2014 10.3551 18.2011 7.40033 14.5 7.40033C14.1664 7.40033 13.8386 7.42432 13.5182 7.47064L9.10429 3.12375Z"
                          fill="black"
                          fill-opacity="0.5"
                        />
                      </svg>
                    )}
                  </div>
                  <div>
                    <span className="text-sm text-slate-400">
                      Password must be at least 6 characters long
                    </span>
                  </div>
                  <p className="mt-4 text-sm lg:text-md">Confirm Password</p>
                  <div className="flex items-center justify-between gap-4 rounded-md p-2 lg:p-2 border-[1px] mt-2">
                    <input
                      onChange={handleChange}
                      value={userRegisterData.confirmPassword}
                      className="border-none outline-none w-[100%]"
                      type={confirmPasswordVisible ? "text" : "password"}
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      id="confirmPassword"
                    />
                    {confirmPasswordVisible ? (
                      <svg
                        onClick={() => {
                          setConfirmPasswordVisible(false);
                        }}
                        width="24"
                        height="21"
                        viewBox="0 0 29 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 12C1.26055 5.17301 7.27301 0 14.5 0C21.727 0 27.7395 5.17301 29 12C27.7395 18.8269 21.727 24 14.5 24C7.27301 24 1.26055 18.8269 0 12ZM14.5 18.6667C18.2011 18.6667 21.2014 15.6819 21.2014 12C21.2014 8.31811 18.2011 5.33333 14.5 5.33333C10.7989 5.33333 7.79858 8.31811 7.79858 12C7.79858 15.6819 10.7989 18.6667 14.5 18.6667ZM14.5 16C12.2793 16 10.4791 14.2092 10.4791 12C10.4791 9.7908 12.2793 8 14.5 8C16.7206 8 18.5209 9.7908 18.5209 12C18.5209 14.2092 16.7206 16 14.5 16Z"
                          fill="black"
                          fill-opacity="0.5"
                        />
                      </svg>
                    ) : (
                      <svg
                        onClick={() => {
                          setConfirmPasswordVisible(true);
                        }}
                        width="24"
                        height="21"
                        viewBox="0 0 29 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.47497 5.99383L0.284166 1.86667L2.17962 0L28.7159 26.1332L26.8204 28L22.3841 23.631C20.1039 25.0548 17.3997 25.8794 14.5 25.8794C7.27301 25.8794 1.26055 20.7583 0 14C0.585274 10.8621 2.19495 8.07711 4.47497 5.99383ZM18.1957 19.5063L16.2336 17.5739C15.7086 17.8212 15.1207 17.9598 14.5 17.9598C12.2793 17.9598 10.4791 16.1869 10.4791 14C10.4791 13.3886 10.6198 12.8097 10.871 12.2927L8.90887 10.3604C8.20721 11.4037 7.79858 12.6549 7.79858 14C7.79858 17.6449 10.7989 20.5997 14.5 20.5997C15.8658 20.5997 17.1362 20.1972 18.1957 19.5063ZM9.10429 3.12375C10.7754 2.47624 12.5955 2.12061 14.5 2.12061C21.727 2.12061 27.7395 7.24162 29 14C28.5816 16.2434 27.6395 18.3064 26.3032 20.0615L21.13 14.9669C21.1771 14.6513 21.2014 14.3284 21.2014 14C21.2014 10.3551 18.2011 7.40033 14.5 7.40033C14.1664 7.40033 13.8386 7.42432 13.5182 7.47064L9.10429 3.12375Z"
                          fill="black"
                          fill-opacity="0.5"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="flex space-x-2 text-sm mt-3">
                    {passwordRequirements[0].regex.test(userRegisterData.password) ? (
                      <Check className="h-4 w-4 text-lgs text-green-500" />
                    ) : (
                      <span className="h-4 w-4 text-lg text-red-500">
                        x
                      </span>
                    )}
                    <span className="text-gray-600">{passwordRequirements[0].label}</span>
                </div>
                </div>
              

                <Button
                  className="w-full h-12 text-lg font-bold bg-purple-700 hover:bg-purple-800 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-150 text-white"
                  onClick={handleSign2Step}
                >
                  Continue
                </Button>
                <div className=' mt-4 w-[100%] pb-4 m-auto text-left text-xs ' style={{ color: "black", fontFamily: "poppins, sans-serif" }}>
                  By creating an account you agree that you are at least 18 years of age, and accept and agree to the &nbsp;
                  <span className='text-[#EB4C60] font-bold'><a
                    href="/terms-and-conditions"
                    className="text-purple-600 underline hover:text-purple-800 font-bold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms and Conditions
                  </a></span>
                  &nbsp;and&nbsp;
                  <span className='text-[#EB4C60] font-bold'> <a
                    href="/privacy-policy"
                    className="text-purple-600 underline hover:text-purple-800 font-bold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BusinessSignUp1Step;
