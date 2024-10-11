import React from 'react'
import {
    useLoaderData,
    useNavigation,
    Form,
    redirect,
    useActionData
} from "react-router-dom"
import { registerUser } from "../api"

// export function loader({ request }) {
//     return new URL(request.url).searchParams.get("message")
// }

export async function action({ request }) {
    const formData = await request.formData()
    const name = formData.get("name")
    const email = formData.get("email")
    const password = formData.get("password")
    // const pathname = new URL(request.url)
    //     .searchParams.get("redirectTo") || "/blogposts"
    
    try {
        await registerUser({name, email, password })
        // localStorage.setItem("loggedin", true)
        return redirect("/")
    } catch(err) {
        return err.message
    }
}

export default function Register() {
    const errorMessage = useActionData()
    // const message = useLoaderData()
    const navigation = useNavigation()

    return (
        <div className="flex justify-center content-center  h-dvh ">
        <div className=" container flex flex-col mx-auto my-auto h-2/4">
            <h1 className='text-center'>Sign UP For New Account</h1>
            {/* {message && <h3 className="red">{message}</h3>} */}
            {errorMessage && <h3 className="text-center text-red-500">{errorMessage}</h3>}
            
            <Form 
                method="post" 
                className="w-2/4 m-auto flex flex-col items-center justify-center rounded-lg shadow-2xl h-full p-6 my-3 ring-1 ring-offset-2" 
                replace
            >
                <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    className='w-full rounded-2 border-4 border-solid border-[000000] text-center mb-3 mt-3'
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    className='w-full rounded-2 border-2 text-center mb-3 mt-3'
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className='w-full rounded-2 border-2 text-center my-3'
                />
                <button
                    disabled={navigation.state === "submitting"}
                    className='bg-blue-600 w-full rounded-2 mt-3 mb-3'
                >
                    {navigation.state === "submitting"
                        ? "Submitting..."
                        : "Submit"
                    }
                </button>
            </Form>
            </div>
        </div>
    )
}

