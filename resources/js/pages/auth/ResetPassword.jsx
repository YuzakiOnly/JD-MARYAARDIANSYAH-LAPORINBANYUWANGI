import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Link, useForm } from "@inertiajs/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { LoginPageLayout } from "@/pages/layouts/LoginPageLayout";

const ResetPassword = ({ token, email }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        token: token,
        email: email || '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/reset-password');
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
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="example@example.com"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-gray-100 border border-gray-200 rounded-sm dark:placeholder-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
                        readOnly
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="mt-6">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        New Password
                    </label>
                    <div className="relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Enter new password"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-sm dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 -top-1 right-0 flex items-center pr-3 mt-2"
                        >
                            {showPassword ? (
                                <FaRegEye className="size-5 text-red-500 cursor-pointer" />
                            ) : (
                                <FaRegEyeSlash className="size-5 text-green-500 cursor-pointer" />
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.password}
                        </p>
                    )}
                </div>

                {/* Password Confirmation */}
                <div className="mt-6">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Confirm New Password
                    </label>
                    <div className="relative">
                        <Input
                            type={showPasswordConfirmation ? "text" : "password"}
                            name="password_confirmation"
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder="Confirm new password"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-sm dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                            className="absolute inset-y-0 -top-1 right-0 flex items-center pr-3 mt-2"
                        >
                            {showPasswordConfirmation ? (
                                <FaRegEye className="size-5 text-green-500 cursor-pointer" />
                            ) : (
                                <FaRegEyeSlash className="size-5 text-green-500 cursor-pointer" />
                            )}
                        </button>
                    </div>
                    {errors.password_confirmation && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.password_confirmation}
                        </p>
                    )}
                </div>

                {/* Reset Password */}
                <div className="mt-6">
                    <Button
                        type="submit"
                        disabled={processing}
                        className="w-full px-4 py-3 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-sm hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-sm font-medium disabled:opacity-50"
                    >
                        {processing ? 'Resetting password...' : 'Reset Password'}
                    </Button>
                </div>
            </form>

            {/* Back to login */}
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

ResetPassword.layout = page => <LoginPageLayout type="reset">{page}</LoginPageLayout>
export default ResetPassword;