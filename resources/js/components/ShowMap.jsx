import React from 'react'

export const ShowMap = () => {
    return (
        <div className="bg-white shadow px-6 py-10 rounded-lg ">
            <div className="">
                <h1 className="text-xl font-bold uppercase">Lokasi Terkini</h1>
                <p className='text-base font-normal'>Lihat lokasi yang ingin Anda laporkan</p>
            </div>
            <div className="py-6">
                <div className="w-full h-[500px]">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1010463.5366873118!2d113.60756998167848!3d-8.389542645679375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd154169714acef%3A0x3027a76e352bce0!2sBanyuwangi%20Regency%2C%20East%20Java!5e0!3m2!1sid!2sid!4v1756213262542!5m2!1sid!2sid"
                        className="w-full h-full border-0 rounded-sm"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
            <div className="">
                <h1 className='font-light text-base'>Lihat pada peta untuk melihat lokasi persis dari masalah Anda Laporkan</h1>
            </div>
        </div>
    )
}