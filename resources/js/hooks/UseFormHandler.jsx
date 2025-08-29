import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { validateForm } from '@/lib/validation';
import { alerts } from '@/lib/alert';

const initialFormData = {
    judul_laporan: '',
    no_telpon: '',
    category_id: '',
    kecamatan_id: '',
    lokasi_asli: '',
    deskripsi: '',
    tanggal_kejadian: '',
    waktu_kejadian: '',
    image: null
};

export const useFormHandler = (submitUrl = '/laporin') => {
    const [dateTime, setDateTime] = useState();
    const [imagePreview, setImagePreview] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm(initialFormData);

    const handleDateTimeChange = (selectedDateTime) => {
        setDateTime(selectedDateTime);
        if (selectedDateTime) {
            setData('tanggal_kejadian', format(selectedDateTime, "yyyy-MM-dd"));
            setData('waktu_kejadian', format(selectedDateTime, "HH:mm"));
        } else {
            setData('tanggal_kejadian', '');
            setData('waktu_kejadian', '');
        }
    };

    const handleImageChange = (file) => {
        setData('image', file);
        
        const reader = new FileReader();
        reader.onload = (e) => setImagePreview(e.target.result);
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        setData('image', null);
    };

    const clearAllFields = () => {
        reset();
        setDateTime(null);
        setImagePreview(null);
        
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
    };

    const handlePhoneChange = (value) => {
        const numericValue = value.replace(/\D/g, '');
        setData('no_telpon', numericValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const validationErrors = validateForm(data);
        if (validationErrors.length > 0) {
            return alerts.formIncomplete(validationErrors);
        }

        alerts.submitConfirm((result) => {
            if (result.isConfirmed) {
                post(submitUrl, {
                    onSuccess: () => {
                        alerts.submitSuccess(() => clearAllFields());
                    },
                    onError: (errors) => {
                        alerts.submitError(errors);
                    }
                });
            }
        });
    };

    const getFieldError = (fieldName) => errors[fieldName];
    
    const getFieldProps = (fieldName, additionalProps = {}) => ({
        value: data[fieldName],
        onChange: (e) => setData(fieldName, e.target.value),
        className: getFieldError(fieldName) ? 'border-red-500' : '',
        ...additionalProps
    });

    return {
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
        clearAllFields,

        getFieldError,
        getFieldProps
    };
};

export default useFormHandler;