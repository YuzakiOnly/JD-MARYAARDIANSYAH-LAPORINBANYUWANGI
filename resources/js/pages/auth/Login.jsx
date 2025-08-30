import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Link, useForm } from "@inertiajs/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { GoogleAccount } from "@/components/auth/LoginPage";
import { LoginPageLayout } from "@/pages/layouts/LoginPageLayout";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
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
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-sm dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="mt-6">
                    <div className="flex justify-between mb-2">
                        <label className="text-sm text-gray-600 dark:text-gray-200">
                            Password
                        </label>
                    </div>

                    <div className="relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Your Password"
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

                {/* Remember Me */}
                <div className="flex items-center mt-6">
                    <input
                        id="remember"
                        name="remember"
                        type="checkbox"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                        className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                        Remember me
                    </label>
                </div>

                {/* Sign in Button */}
                <div className="mt-6">
                    <Button
                        type="submit"
                        disabled={processing || !data.remember}
                        className="w-full px-4 py-3 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-sm hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-sm font-medium disabled:opacity-70 disabled:cursor-not-allowed">
                        {processing ? 'Signing in...' : 'Sign in'}
                    </Button>
                </div>

                {/* Google */}
                <GoogleAccount />
            </form>

            {/* Sign up link */}
            <p className="mt-6 text-sm text-center text-gray-400">
                Don&apos;t have an account yet?{" "}
                <Link
                    href="/register"
                    className="text-blue-500 focus:outline-none focus:underline hover:underline"
                >
                    Sign up
                </Link>
                .
            </p>
        </div>
    )
}

Login.layout = page => <LoginPageLayout>{page}</LoginPageLayout>
export default Login