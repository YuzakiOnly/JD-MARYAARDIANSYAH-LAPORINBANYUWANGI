import { BgImage, Logo } from "@/components/auth/LoginPage"

export const LoginPageLayout = ({ children, flash, type = "login" }) => {
    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="flex justify-center h-screen">
                
                <BgImage type={type} />

                <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                    <div className="flex-1">
                        <Logo type={type} />

                        {/* Success/Error Messages */}
                        {flash?.success && (
                            <div className="p-4 mt-4 text-sm text-green-700 bg-green-100 border border-green-300 rounded-lg">
                                {flash.success}
                            </div>
                        )}
                        {flash?.error && (
                            <div className="p-4 mt-4 text-sm text-red-700 bg-red-100 border border-red-300 rounded-lg">
                                {flash.error}
                            </div>
                        )}

                        {/* Form */}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}