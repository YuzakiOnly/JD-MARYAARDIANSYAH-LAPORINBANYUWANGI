import React from "react";
import { motion } from "framer-motion";

const StepSection = () => {
    const steps = [
        {
            id: "01",
            title: "Login Dengan Akun",
            desc: "Gunakan akun Google atau buat sendiri untuk masuk dengan cepat dan aman.",
            offset: "translate-y-0",
        },
        {
            id: "02",
            title: "Pilih Kategori",
            desc: "Pilih kategori yang sesuai dengan laporan Anda.",
            offset: "translate-y-12",
        },
        {
            id: "03",
            title: "Masukkan Detail",
            desc: "Berikan deskripsi dan lokasi akurat di Banyuwangi.",
            offset: "translate-y-0",
        },
        {
            id: "04",
            title: "Kirim & Pantau",
            desc: "Kirim laporan dan pantau status penanganannya.",
            offset: "translate-y-12",
        },
    ];

    return (
        <div className="w-full bg-gray-50">
            <div className="py-16 px-4 md:px-8 lg:px-20">
                <div className="text-center mb-12 lg:mb-16">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Cara Melapor!
                    </h2>
                    <p className="mt-2 text-sm md:text-base text-gray-600">
                        Langkah mudah melaporkan masalah di sekitar Anda.
                    </p>
                </div>

                <div className="hidden lg:flex relative justify-between items-start max-w-6xl mx-auto mb-14">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className={`w-1/4 px-4 text-center transition ${step.offset}`}
                        >
                            <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold text-lg shadow-md">
                                {step.id}
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-gray-800">
                                {step.title}
                            </h3>
                            <p className="mt-2 text-gray-600 text-sm">{step.desc}</p>

                            {index < steps.length - 1 && (
                                <svg
                                    className="absolute w-32 h-20 text-gray-400"
                                    style={{
                                        top: index % 2 === 0 ? "-20px" : "0px",
                                        left: "calc(100% - 70px)",
                                    }}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 100 50"
                                >
                                    <defs>
                                        <marker
                                            id="arrowhead"
                                            markerWidth="6"
                                            markerHeight="6"
                                            refX="5"
                                            refY="3"
                                            orient="auto"
                                        >
                                            <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" />
                                        </marker>
                                    </defs>
                                    {index % 2 === 0 ? (
                                        <path
                                            d="M10,40 C50,15 60,15 90,40"
                                            strokeDasharray="4 4"
                                            markerEnd="url(#arrowhead)"
                                        />
                                    ) : (
                                        <path
                                            d="M10,10 C50,35 60,35 90,10"
                                            strokeDasharray="4 4"
                                            markerEnd="url(#arrowhead)"
                                        />
                                    )}
                                </svg>
                            )}
                        </motion.div>
                    ))}
                </div>

                <div className="lg:hidden grid grid-cols-2 gap-8 max-w-lg mx-auto">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center text-center"
                        >
                            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold text-lg shadow-md">
                                {step.id}
                            </div>
                            <h3 className="mt-3 text-base font-semibold text-gray-800">
                                {step.title}
                            </h3>
                            <p className="mt-1 text-sm text-gray-600">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StepSection;