import React from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Link, useForm } from "@inertiajs/react";
import { LoginPageLayout } from "@/pages/layouts/LoginPageLayout";

function ForgotPassword() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/forgot-password", {
            onSuccess: () => {

            },
        });
    };

    return (
        <div className="mt-8">
            <form onSubmit={handleSubmit}>
                {/* Email */}
                <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Email Address
                    </label>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        placeholder="example@gmail.com"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-sm dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Send Link Button */}
                <div className="mt-6">
                    <Button
                        type="submit"
                        disabled={processing}
                        className="w-full px-4 py-3 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-sm hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-sm font-medium disabled:opacity-50"
                    >
                        {processing ? 'Checking email...' : 'Continue'}
                    </Button>

                </div>
            </form>

            {/* Back to login link */}
            <p className="mt-6 text-sm text-center text-gray-400">
                Remember your password?{" "}
                <Link
                    href="/login"
                    className="text-blue-500 focus:outline-none focus:underline hover:underline"
                >
                    Back to login
                </Link>
            </p>
        </div>
    );
};

ForgotPassword.layout = page => <LoginPageLayout type="forgot">{page}</LoginPageLayout>
export default ForgotPassword;