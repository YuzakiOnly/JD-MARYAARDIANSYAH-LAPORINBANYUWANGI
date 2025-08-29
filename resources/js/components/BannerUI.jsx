import React from 'react'
import clsx from "clsx"
import { motion } from "framer-motion";

export const BannerUI = ({ image, title, subtitle, className }) => {
    return (
        <motion.div
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative h-[300px] bg-cover bg-center flex flex-col items-center justify-center text-white text-center overflow-hidden"
            style={{ backgroundImage: `url(${image})` }}>
            <div className="absolute inset-0 bg-black/40 z-0" />

            <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className={clsx(
                    "relative z-10 mb-20",
                    className
                )}
            >
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.6, ease: "backOut" }}
                    className="text-3xl md:text-4xl font-bold"
                >
                    {title}
                </motion.h1>

                {subtitle && (
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.8, ease: "backOut" }}
                        className="mt-2 text-lg"
                    >
                        {subtitle}
                    </motion.p>
                )}
            </motion.div>
        </motion.div>
    );
};

export const Map = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="mt-12">
            <iframe
                title="Peta Lokasi Laporin Banyuwangi"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1010463.5366873118!2d113.60756998167848!3d-8.389542645679375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd154169714acef%3A0x3027a76e352bce0!2sBanyuwangi%20Regency%2C%20East%20Java!5e0!3m2!1sid!2sid!4v1756213262542!5m2!1sid!2sid"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
            ></iframe>
        </motion.div>
    )
}
