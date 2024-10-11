import React from 'react';
import {
    useLoaderData,
    useNavigation,
    Form,
    redirect,
    useActionData
} from "react-router-dom";
import { loginUser } from "../api";

export function Loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}

export async function Action ({ request }) {
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    // const pathname = new URL(request.url)
    //     .searchParams.get("redirectTo") || "/"
    
    try {
        await loginUser({ email, password })
        // localStorage.setItem("token", true)
        return redirect("/");
    } catch(err) {
        return err.message
    }
}

export default function Login() {
    const errorMessage = useActionData()
    const message = useLoaderData()
    const navigation = useNavigation()

    return (
        <div className="flex justify-center content-center  h-dvh ">
            <div className=" container flex flex-col mx-auto my-auto h-2/4">
            <h1 className='text-center'>Sign in to your account</h1>
            {message && <h3 className="text-center text-red-500">{message}</h3>}
            {errorMessage && <h3 className="text-center text-red-500">{errorMessage}</h3>}

            <Form 
                method="post" 
                className="w-2/4 m-auto flex flex-col rounded-lg shadow-2xl h-4/6 p-6 my-3 ring-1 ring-offset-1 justify-center items-center" 
                replace
            >
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    className='w-full rounded-2 border-2 text-center mb-3 mt-3 text-black'
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className='w-full rounded-2 border-2 text-center mb-3 mt-3 text-black'
                />
                <button
                    disabled={navigation.state === "submitting"}
                    className='bg-blue-600 w-full rounded-2 mt-3 mb-3'
                >
                    {navigation.state === "submitting"
                        ? "Logging in..."
                        : "Log in"
                    }
                </button>
            </Form>
        </div>
        </div>
    )
}
