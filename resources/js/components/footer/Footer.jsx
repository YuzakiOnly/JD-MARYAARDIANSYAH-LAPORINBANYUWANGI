import React from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}>
                        <Link href="/" className="flex items-baseline gap-2">
                            <h1 className="text-3xl font-bold text-white">Laporin!</h1>
                            <span className="font-medium text-blue-400">Banyuwangi</span>
                        </Link>

                        <p className="mt-4 text-sm text-gray-400 leading-relaxed">
                            Platform digital untuk melaporkan{" "}
                            <span className="font-semibold text-white">
                                permasalahan lingkungan sekitar
                            </span>
                            . <br />
                            Bersama kita wujudkan Banyuwangi yang lebih{" "}
                            <span className="text-blue-400 font-medium">
                                bersih, aman, dan nyaman.
                            </span>
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="border-l border-gray-700 pl-6 hidden lg:block">
                        <h3 className="font-semibold text-lg mb-4 text-white">Informasi</h3>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link href="/faq" className="hover:text-white transition">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/panduan" className="hover:text-white transition">
                                    Panduan Pengguna
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy-policy"
                                    className="hover:text-white transition"
                                >
                                    Kebijakan Privasi
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-white transition">
                                    Ketentuan Layanan
                                </Link>
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="border-l border-gray-700 pl-6 hidden lg:block">
                        <h3 className="font-semibold text-lg mb-4 text-white">Kontak</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-blue-400" />
                                support@laporin.id
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-blue-400" />
                                +62 852-3182-3088
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-blue-400" />
                                <a
                                    href="https://maps.app.goo.gl/XqwibwDmuDbLf7Lp6"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition"
                                >
                                    Banyuwangi, Indonesia
                                </a>
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="border-l border-gray-700 pl-6 hidden lg:block">
                        <h3 className="font-semibold text-lg mb-4 text-white">
                            Ikuti Kami
                        </h3>
                        <div className="flex gap-4">
                            <Button
                                asChild
                                size="icon"
                                variant="ghost"
                                className="rounded-full p-6 hover:text-white bg-gray-800 hover:bg-blue-600">
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <Facebook className="size-5" />
                                </a>
                            </Button>
                            <Button
                                asChild
                                size="icon"
                                variant="ghost"
                                className="rounded-full p-6 bg-gray-800 hover:text-white transition hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600">
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <Instagram className="size-5" />
                                </a>
                            </Button>
                            <Button
                                asChild
                                size="icon"
                                variant="ghost"
                                className="rounded-full p-6 hover:text-white bg-gray-800 hover:bg-sky-600">
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <Twitter className="size-5" />
                                </a>
                            </Button>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-neutral-500">
                    © {new Date().getFullYear()} Laporin! Banyuwangi (DEMO). Semua Hak Dilindungi.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
