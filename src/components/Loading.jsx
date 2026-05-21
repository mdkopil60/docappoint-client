import { Spinner } from "@heroui/react";

const Loading = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">

            <Spinner
                size="lg"
                color="primary"
            />

        </div>
    );
};

export default Loading;