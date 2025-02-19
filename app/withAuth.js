"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const withAuth = (WrappedComponent) => {
    return (props) => {
        const router = useRouter();
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const token = localStorage.getItem("authToken");

            if (!token) {
                router.push("/login");
            } else {
                setLoading(false);
                router.push("/dashboard");
            }
        }, []);

        if (loading) {
            return <p>Loading...</p>;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
