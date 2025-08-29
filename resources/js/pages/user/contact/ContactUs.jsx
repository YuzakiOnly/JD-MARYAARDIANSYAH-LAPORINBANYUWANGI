import { MainLayout } from '@/pages/layouts/MainLayout'
import { BannerUI, Map } from "@/components/BannerUI";
import React from 'react'

const ContactUs = () => {
    return (
        <div className="w-full">
            <BannerUI
                image="/assets/image/6.jpg"
                title="Contact Us"
                subtitle="Laporin siap memberikan solusi tepat sesuai kebutuhan Anda"
            />

            <Map />
        </div>
    )
}

ContactUs.layout = page => <MainLayout>{page}</MainLayout>
export default ContactUs