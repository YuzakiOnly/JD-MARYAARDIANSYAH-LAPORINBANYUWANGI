import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { usePage } from "@inertiajs/react";
import { DateTimePicker24h } from '@/components/DateTimePicker24h';

import FormField, { FormFieldWithCounter } from '@/components/validation/FormField';
import ImageUpload from '@/components/validation/ImageUploud';
import { useFormHandler } from '@/hooks/useFormHandler';

export const InputForm = () => {
    const { categories, kecamatans } = usePage().props;
    
    const {
        data,
        setData,
        processing,
        errors,
        dateTime,
        imagePreview,
        handleSubmit,
        handleDateTimeChange,
        handleImageChange,
        handlePhoneChange,
        removeImage,
        getFieldError,
        getFieldProps
    } = useFormHandler();
    
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({ 
            opacity: 1, 
            y: 0, 
            transition: { delay: i * 0.08, duration: 0.4 } 
        })
    };

    return (
        <motion.form
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="bg-white shadow-sm px-6 py-10 rounded-lg space-y-6 max-w-3xl mx-auto">
            <motion.div variants={itemVariants} custom={0}>
                <h1 className="text-2xl font-bold uppercase">Isi Form Disini</h1>
                <p className="text-base text-slate-600">isi sesuai petunjuk yang tersedia</p>
            </motion.div>

            {/* Title Laporan */}
            <FormField 
                custom={1} 
                label="Judul Laporan" 
                required 
                error={getFieldError('judul_laporan')}
            >
                <Input
                    placeholder="Contoh: Jalan Berlubang di Jl. Ahmad Yani"
                    {...getFieldProps('judul_laporan')}
                />
            </FormField>

            {/* No Telpon */}
            <FormField 
                custom={2} 
                label="No. Telpon" 
                required 
                error={getFieldError('no_telpon')}
                helper="Masukkan nomor telepon tanpa spasi atau tanda (-). Minimal 11 digit, maksimal 14 digit."
            >
                <Input
                    type="tel"
                    placeholder="087564678345"
                    value={data.no_telpon}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    maxLength={14}
                    className={getFieldError('no_telpon') ? 'border-red-500' : ''}
                />
            </FormField>

            {/* categories */}
            <FormField 
                custom={3} 
                label="Kategori" 
                required 
                error={getFieldError('category_id')}
            >
                <Select 
                    value={data.category_id} 
                    onValueChange={(value) => setData('category_id', value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Kategori</SelectLabel>
                            {categories?.map((category) => (
                                <SelectItem key={category.id} value={category.id.toString()}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </FormField>

            {/* Kecamatans */}
            <FormField 
                custom={4} 
                label="Wilayah / Kecamatan" 
                required 
                error={getFieldError('kecamatan_id')}
            >
                <Select 
                    value={data.kecamatan_id} 
                    onValueChange={(value) => setData('kecamatan_id', value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Kecamatan" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Kecamatan</SelectLabel>
                            {kecamatans?.map((kecamatan) => (
                                <SelectItem key={kecamatan.id} value={kecamatan.id.toString()}>
                                    {kecamatan.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </FormField>

            {/* Location Real */}
            <FormField 
                custom={5} 
                label="Lokasi Asli" 
                required 
                error={getFieldError('lokasi_asli')}
            >
                <Input
                    placeholder="Contoh: Depan Toko Makmur, Jl. Ahmad Yani"
                    {...getFieldProps('lokasi_asli')}
                />
            </FormField>

            {/* Description */}
            <FormFieldWithCounter
                custom={6}
                label="Deskripsi"
                required
                error={getFieldError('deskripsi')}
                currentLength={data.deskripsi.length}
                minLength={10}
            >
                <Textarea
                    placeholder="Tulis detail laporan Anda di sini... (minimal 10 karakter)"
                    rows={4}
                    {...getFieldProps('deskripsi')}
                />
            </FormFieldWithCounter>

            {/* Date & Time */}
            <FormField 
                custom={7} 
                label="Tanggal & Waktu Kejadian" 
                required
            >
                <DateTimePicker24h
                    value={dateTime}
                    onChange={handleDateTimeChange}
                    placeholder="Pilih Tanggal & Waktu Kejadian"
                />
            </FormField>

            {/* image */}
            <FormField 
                custom={8} 
                label="Unggah Gambar" 
                required 
                error={getFieldError('image')}
            >
                <ImageUpload
                    imagePreview={imagePreview}
                    onImageChange={handleImageChange}
                    onRemoveImage={removeImage}
                />
            </FormField>

            {/* Button */}
            <motion.div variants={itemVariants} custom={9}>
                <Button
                    type="submit"
                    disabled={processing}
                    className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 py-5"
                >
                    {processing ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Mengirim...
                        </>
                    ) : (
                        'Kirim Laporan'
                    )}
                </Button>
            </motion.div>
        </motion.form>
    );
};

export default InputForm;