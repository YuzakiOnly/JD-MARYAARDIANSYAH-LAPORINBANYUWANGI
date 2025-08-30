import React from "react";
import { CheckCircle, BarChart3, Smile, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
    const features = [
        { title: "Mudah Digunakan", desc: "Antarmuka sederhana, semua orang bisa melapor dengan cepat.", icon: <CheckCircle className="w-6 h-6 text-blue-500" /> },
        { title: "Realtime", desc: "Laporan diterima dan dipantau langsung oleh admin.", icon: <BarChart3 className="w-6 h-6 text-green-500" /> },
        { title: "Transparan", desc: "Setiap proses laporan bisa dilihat perkembangannya.", icon: <Smile className="w-6 h-6 text-yellow-500" /> },
        { title: "Multi-Platform", desc: "Akses dari HP, laptop, maupun device manapun & kapan saja.", icon: <Users className="w-6 h-6 text-purple-500" /> },
    ];

    return (
        <div className="w-full bg-gray-50 py-20">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16 text-center space-y-12">
                {/* Judul */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="space-y-4"
                >
                    <h2 className="text-3xl md:text-4xl font-bold font-outfit text-slate-800">
                        Tentang & Keunggulan <span className="text-blue-600">Laporin</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Laporin adalah platform digital untuk membantu warga Banyuwangi melaporkan masalah di sekitar mereka dengan cepat, transparan, dan kolaboratif.
                    </p>
                </motion.div>

                {/* Fitur */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                    {features.map((f, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true, amount: 0.2 }}
                            className="h-full"
                        >
                            <Card className="h-full rounded-2xl shadow-md hover:shadow-lg transition-all flex">
                                <CardContent className="p-6 flex flex-col items-center text-center flex-1">
                                    {f.icon}
                                    <h3 className="font-semibold text-lg mt-3 mb-1">{f.title}</h3>
                                    <p className="text-sm text-slate-600">{f.desc}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>

    );
};

export default AboutSection;