import { Button } from "@/Components/ui/button";
import { storeUser } from "@/Redux/User/userSlice";
import { socialLogin } from "@/Services/Authentication/verifyUser";
import { UserLogin } from "@/Utils/Interface/login.interface";
import { errorToast } from "@/Utils/Toast/error.toast";
import { successToast } from "@/Utils/Toast/success.toast";
import { useGoogleLogin, CredentialResponse } from "@react-oauth/google";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
interface DecodedToken {
    sub: string; // userId
    email: string;
    name: string;
    picture?: string;
}

interface SignInProps {
    authenticationModal: any;
    setAuthenticationModal: React.Dispatch<React.SetStateAction<any>>;
    userLoginData: UserLogin;
    setUserLoginData: React.Dispatch<React.SetStateAction<UserLogin>>;
    onSuccess?: (response: any) => void;
    onFailure?: (error: any) => void;
}


const GoogleLoginButton: React.FC<SignInProps> = ({ authenticationModal, setAuthenticationModal, userLoginData, setUserLoginData, onSuccess, onFailure }: any) => {
    const dispatch = useDispatch()

    const onClose = (): void => {
        setAuthenticationModal({
            isSignUp1Step: false,
            isSignUp2Step: false,
            isForgotPassOpen: false,
            isSignInOpen: false,
            isBusinessSignUp1Step: false,
            isSignUpOpen: false
        });
    };

    const handleSocialLoginSuccess = async (decodedToken: DecodedToken, loginType: string) => {

        try {
            const payload = {
                userId: decodedToken.sub,
                name: decodedToken.name,
                email: decodedToken.email,
                role: userLoginData?.role,
                loginType,
            };

            const apiResponse = await socialLogin(payload);

            if (apiResponse.success) {
                const { accessToken, refreshToken, user } = apiResponse.result;
                Cookies.set('accessToken', accessToken, {
                    expires: new Date(Date.now() + 3600 * 1000),
                    sameSite: 'strict',
                    secure: false,
                });

                Cookies.set('refreshToken', refreshToken, {
                    expires: new Date(Date.now() + 7 * 24 * 3600 * 1000),
                    sameSite: 'strict',
                    secure: false,
                });


                dispatch(storeUser(user));
                let redirect_to = "";
                if (user.role === "Business") {
                    redirect_to = "/owner/account";
                } else if (user.role === "Customer") {
                    redirect_to = "/user";
                    if (location.pathname === "/user/cart") {
                        redirect_to = "/user/cart";
                    }
                } else if (user.role === "ADMIN") {
                    redirect_to = "/admin/reports";
                }

                if (redirect_to) {
                    setTimeout(() => {
                        window.location.href = redirect_to;
                    }, 1000);
                }

                setAuthenticationModal({
                    isSignUp1Step: false,
                    isSignUp2Step: false,
                    isBusinessSignUp1Step: false,
                    isForgotPassOpen: false,
                    isSignUpOpen: false,
                    isSignInOpen: false,
                });
                successToast('Successfully logged in');
                onClose();
            } else {
                errorToast(apiResponse.message || 'Login failed');
            }
        } catch (error) {
            errorToast('An error occurred during login');
        }
    };


    const handleGoogleSignUpSuccess = async (response: CredentialResponse) => {
        if (response.credential) {
            const decodedToken: DecodedToken = jwtDecode(response.credential);

            await handleSocialLoginSuccess(decodedToken, 'Google');
        }
    };


    const handleLogin = useGoogleLogin({
        flow: "implicit",
        onSuccess: (response: any) => {
            console.log("Google Login Success:", response);
            handleGoogleSignUpSuccess(response);
        },
        onError: (error: any) => {
            console.error("Google Login Failed:", error);
            handleGoogleLoginFailure(error);
        },
    });
    const handleGoogleLoginFailure = (error:any) => {
        console.error('Google Signup Failure:');
        // // Handle error response
        // if (onFailure) onFailure(error);
        onFailure();
        return
    };
 
    return (
        <Button
            variant="outline"
            onClick={()=>handleLogin()}
            className="w-full h-[40px] font-medium text-gray-600 border border-gray-300 bg-white hover:bg-gray-50"
        >
            <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20(16)-ZBh52rFv8LNIHbUkDxDhgGDURXpctx.png"
                alt="Sign in with Google"
                width={191}
                height={40}
                className="object-contain"
            />
        </Button>
    );
};


export default GoogleLoginButton;
