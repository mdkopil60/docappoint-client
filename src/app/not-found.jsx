import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-8xl font-extrabold text-cyan-500">
                404
            </h1>

            <h2 className="text-2xl font-bold mt-4">
                Page Not Found
            </h2>

            <p className="text-gray-500 mt-2 max-w-md">
                Sorry, the page you are looking for does not exist or has been moved.
            </p>

            <Link href="/">
                <button className="mt-6 bg-cyan-500 text-white px-6 py-3 rounded-2xl hover:bg-cyan-600 transition">
                    Go Home
                </button>
            </Link>
        </div>
    );
}