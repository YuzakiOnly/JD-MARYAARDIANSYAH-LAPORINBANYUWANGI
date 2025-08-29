import { InputForm } from '@/components/InputForm'
import { MainLayout } from '@/pages/layouts/MainLayout'
import { BannerUI } from "@/components/BannerUI";
import React from 'react'

const FormLaporan = () => {
    return (
        <div className="w-full">
            <BannerUI
                image="./assets/image/6.jpg"
                title="Form Laporan"
                subtitle="Isi laporan Anda dengan lengkap dan jelas"
            />

            <div className="max-w-screen-xl mx-auto px-4 -mt-24 relative z-10 mb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <InputForm />
                    </div>
                </div>
            </div>

        </div>
    )
}

FormLaporan.layout = page => <MainLayout>{page}</MainLayout>
export default FormLaporan