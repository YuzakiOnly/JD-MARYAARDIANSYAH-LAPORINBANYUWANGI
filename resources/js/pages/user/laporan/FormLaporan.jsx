import { InputForm } from '@/components/InputForm'
import { MainLayout } from '@/pages/layouts/MainLayout'
import { BannerUI } from "@/components/BannerUI";
import React, { useRef, useCallback } from 'react'
import { ShowMap } from '@/components/ShowMap';
import { StepByStep } from '@/components/StepByStep';

const FormLaporan = () => {
    const inputFormRef = useRef(null);

    const handleLocationSelect = useCallback((locationString, lat, lng) => {
        if (inputFormRef.current) {
            inputFormRef.current.selectLocation(locationString, lat, lng);
        }
    }, []);

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
                        <InputForm ref={inputFormRef} />
                    </div>
                    <div className="space-y-6">
                        <ShowMap onLocationSelect={handleLocationSelect} />
                        <StepByStep/>
                    </div>
                </div>
            </div>
        </div>
    )
}

FormLaporan.layout = page => <MainLayout>{page}</MainLayout>
export default FormLaporan