import { ContactUI } from '@/components/user/ContactUI'
import { MainLayout } from '@/pages/layouts/MainLayout'
import { Card, CardContent } from "@/components/ui/card";
import { BannerUI, Map } from "@/components/BannerUI";
import { motion } from "framer-motion";
import React from 'react'

const ContactUs = ({ kecamatans, auth }) => {
    return (
        <div className="w-full">
            <BannerUI
                image="/assets/image/6.jpg"
                title="Contact Us"
                subtitle="Laporin siap memberikan solusi tepat sesuai kebutuhan Anda"
            />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-6xl mx-auto px-4 -mt-24 relative z-10">
                <Card className="shadow-lg rounded-2xl overflow-hidden">
                    <CardContent className="p-0">
                        <ContactUI kecamatans={kecamatans} auth={auth}/>
                    </CardContent>
                </Card>
            </motion.div>

            <Map />
        </div>
    )
}

ContactUs.layout = page => <MainLayout>{page}</MainLayout>
export default ContactUs