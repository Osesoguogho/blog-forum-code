import React from "react"
import { useRouteError } from "react-router-dom"

export default function Error() {
    const error = useRouteError()
    
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-4xl font-bold my-12">Error: {error.message}</h1>
        <pre className="font-bold text-3xl">{error.status} - {error.statusText}</pre>
        </div>
    )
}