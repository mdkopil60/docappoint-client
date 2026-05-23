import { Spinner } from "@heroui/react";

const Loading = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">

            <Spinner
                size="lg"
                color="primary"
            />

            <p className="text-slate-500 font-medium animate-pulse">
                Loading...
            </p>

        </div>
    );
};

export default Loading;