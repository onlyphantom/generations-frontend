import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const backendURL = "https://generationsapi.herokuapp.com/api";

function PaymentsSuccess() {

    const navigate = useNavigate();
    const params = useParams();
    const { u } = useContext(UserContext);
    const [,setUser] = u;

    useEffect(() => {
        const token = sessionStorage.getItem("userSession");
        const today = new Date();

        if(params?.sessionId){
            fetch(`${backendURL}/users/add-subscription`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    sessionId: params?.sessionId,
                    paymentDate: today.toISOString().slice(0,10)
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === 200) {
                        setUser((prev) => {
                            return {
                                ...prev,
                                proUser: data.proUser,
                                proExpiry: data.proExpiry
                            };
                        });
                    }
                });
        }
    }, [params.sessionId, setUser])
        

    return (
        <div className="w-3/12 mx-auto">
            <div className="block rounded-lg shadow-lg bg-glass px-6 py-12 md:px-8 border-solid border-2 border-sky-500">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 mx-auto"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="green"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <div className="text-center mt-3">
                    Payment Successful! 
                    <button
                        type="button"
                        // data-mdb-ripple="true"
                        // data-mdb-ripple-color="light"
                        className="mt-3 w-1/2 btn"
                        onClick={() => navigate("/")}
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PaymentsSuccess;
