import { useEffect } from "react";
import toast from "react-hot-toast";

const TestToast = () => {
    useEffect(() => {
        toast.success("This is a test toast!");
    }, []);

    return <div>Test Toast Component</div>;
};

export default TestToast;
