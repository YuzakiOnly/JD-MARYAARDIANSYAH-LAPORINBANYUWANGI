import { Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { MdOutlineAccountCircle, MdLogout } from "react-icons/md";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import AvatarDisplay from '@/components/AvatarDisplay';

export const Navbar = () => {
    const { url, props } = usePage();
    const user = props?.auth?.user || null;

    const logout = () => Inertia.post('/logout');

    const menuItems = [
        { label: 'Beranda', link: '/' },
        { label: 'Berita Laporan', link: '/berita-laporan' },
        { label: 'Contact Us', link: '/contact' },
    ];

    return (
        <>
            <div className="sticky top-0 z-40 w-full bg-white/50 backdrop-blur-md shadow-sm transition-all duration-300">
                <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center tracking-tight font-jetbrains hover:opacity-80 transition-opacity">
                        <h1 className="text-3xl font-bold">Laporin!</h1>
                        <span className="mt-2.5 font-medium text-blue-400">Banyuwangi</span>
                    </Link>

                    <nav className="hidden md:block">
                        <ul className="flex gap-6 items-center">
                            {menuItems.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.link}
                                        className={`py-2 px-3 transition-all duration-300 cursor-pointer text-gray-900 font-semibold hover:text-blue-500 hover:scale-105`}>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    
                    <div className="hidden md:flex items-center gap-4">
                        {user && (
                            <Link
                                href={url === '/laporin' ? '#' : '/laporin'}
                                aria-disabled={url === 'laporin'}
                                className={`px-4 py-2.5 font-medium text-sm text-white rounded-full transition-colors shadow-sm hover:shadow-md ${
                                    url === '/laporin'
                                        ? 'bg-gray-500 cursor-not-allowed pointer-events-none'
                                        : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'
                                }`}>
                                {url === '/laporin' ? 'Sedang Membuat Laporan' : 'Laporkan Sekarang'}
                            </Link>
                        )}

                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="cursor-pointer border rounded-full border-gray-300 shadow-sm hover:shadow-md transition-shadow">
                                        <AvatarDisplay user={user} />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-auto" align="end">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <span className="font-medium">Name:</span>&nbsp;{user.name}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <span className="font-medium">Email:</span>&nbsp;{user.email}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <span className="font-medium">Role:</span>&nbsp;{user.role}
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="cursor-pointer focus:bg-red-50"
                                        onClick={logout}
                                    >
                                        <span className="text-red-600 font-medium">Logout</span>
                                        <DropdownMenuShortcut>
                                            <MdLogout className="w-5 h-5 text-red-600" />
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link
                                href="/login"
                                className="px-4 py-2 font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-full flex items-center gap-2 transition-colors shadow-sm hover:shadow-md"
                            >
                                <MdOutlineAccountCircle size={24} />
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
