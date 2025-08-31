import { Link, usePage } from '@inertiajs/react';
import { MdOutlineAccountCircle, MdLogout, MdMenu, MdClose, MdPerson } from "react-icons/md";
import { motion, AnimatePresence } from 'framer-motion';
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
import { Inertia } from '@inertiajs/inertia';
import AvatarDisplay from '@/components/AvatarDisplay';
import { useState } from 'react';


export const Navbar = () => {
    const isActiveLink = (currentUrl, link) => {
        if (link === "/") return currentUrl === "/";
        return currentUrl.startsWith(link);
    };
    const { url, props } = usePage();
    const user = props?.auth?.user || null;
    const [isOpen, setIsOpen] = useState(false);

    const logout = () => Inertia.post('/logout');

    const menuItems = [
        { label: 'Beranda', link: '/' },
        { label: 'Berita Laporan', link: '/berita-laporan' },
        { label: 'Contact Us', link: '/contact' },
    ];

    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <div className="sticky top-0 z-40 w-full bg-white shadow transition-all duration-300">
                <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center tracking-tight font-jetbrains hover:opacity-80 transition-opacity">
                        <h1 className="text-3xl font-bold">Laporin!</h1>
                        <span className="mt-2.5 font-medium text-blue-400">Banyuwangi</span>
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:block">
                        <ul className="flex gap-6 font-outfit items-center">
                            {menuItems.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.link}
                                        className={`py-2 px-3 font-medium transition-colors cursor-pointer ${
                                            isActiveLink(url, item.link)
                                                ? "text-blue-600 font-semibold"
                                                : "text-slate-700 hover:text-blue-600"
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        {user && (
                            <Link
                                href="/laporin"
                                className={`px-6 py-2.5 font-medium text-sm  text-white rounded-full transition-colors shadow-sm hover:shadow-md ${
                                    url === '/laporin'
                                        ? 'bg-gray-500 cursor-default'
                                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                                }`}
                            >
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
                                    
                                    {/* Link ke Profil */}
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href="/profil"
                                            className="cursor-pointer focus:bg-blue-50 w-full flex items-center"
                                        >
                                            <span className="text-blue-600 font-medium">Profil Saya</span>
                                            <DropdownMenuShortcut>
                                                <MdPerson className="w-5 h-5 text-blue-600" />
                                            </DropdownMenuShortcut>
                                        </Link>
                                    </DropdownMenuItem>

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

                    {/* Mobile Hamburger */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(true)} className="text-2xl text-slate-700">
                            <MdMenu />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/30 z-40 md:hidden"
                            onClick={closeMenu}
                        />

                        {/* Sidebar */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 p-6 flex flex-col gap-6"
                        >
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold text-blue-600">Menu</h2>
                                <button onClick={closeMenu} className="text-2xl text-slate-700">
                                    <MdClose />
                                </button>
                            </div>

                            <nav className="flex flex-col gap-4">
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.link}
                                        onClick={closeMenu}
                                        className={`py-2 px-3 font-medium transition-colors ${
                                            isActiveLink(url, item.link)
                                                ? "text-blue-600 font-semibold"
                                                : "text-slate-700 hover:text-blue-600"
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                ))}

                                {user && (
                                    <>
                                        <Link
                                            href="/profil"
                                            onClick={closeMenu}
                                            className={`py-2 px-3 font-medium transition-colors ${
                                                url === '/profil'
                                                    ? "text-blue-600 font-semibold"
                                                    : "text-slate-700 hover:text-blue-600"
                                            }`}
                                        >
                                            Profil Saya
                                        </Link>

                                        <Link
                                            href="/laporin"
                                            onClick={closeMenu}
                                            className={`mt-4 px-4 py-2 font-medium text-sm text-white rounded-full transition-colors ${
                                                url === '/laporin'
                                                    ? 'bg-gray-500 cursor-default'
                                                    : 'bg-blue-500 hover:bg-blue-600'
                                            }`}
                                        >
                                            {url === '/laporin' ? 'Sedang Membuat Laporan' : 'Laporkan Sekarang'}
                                        </Link>
                                    </>
                                )}

                                {!user && (
                                    <Link
                                        href="/login"
                                        onClick={closeMenu}
                                        className="mt-4 px-4 py-2 font-medium bg-blue-600 text-white rounded-full flex items-center gap-2 transition-colors"
                                    >
                                        <MdOutlineAccountCircle size={20} />
                                        Login
                                    </Link>
                                )}

                                {user && (
                                    <button
                                        onClick={() => {
                                            logout();
                                            closeMenu();
                                        }}
                                        className="mt-auto text-red-600 font-medium flex items-center gap-2"
                                    >
                                        <MdLogout className="w-5 h-5" />
                                        Logout
                                    </button>
                                )}
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
};