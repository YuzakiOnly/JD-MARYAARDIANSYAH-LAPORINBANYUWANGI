import { useState, useCallback } from 'react';
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
    const { data, setData, post, processing, errors, reset } = useForm(initialFormData);

    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null
    });

    const [dateTime, setDateTime] = useState();
    const [imagePreview, setImagePreview] = useState(null);

    const handleLocationSelect = useCallback((locationString, lat, lng) => {
        setData('lokasi_asli', locationString);
        setCoordinates({ lat, lng });
    }, [setData]);

    const handleDateTimeChange = useCallback((selectedDateTime) => {
        setDateTime(selectedDateTime);
        if (selectedDateTime) {
            setData('tanggal_kejadian', format(selectedDateTime, "yyyy-MM-dd"));
            setData('waktu_kejadian', format(selectedDateTime, "HH:mm"));
        } else {
            setData('tanggal_kejadian', '');
            setData('waktu_kejadian', '');
        }
    }, [setData]);

    const handleImageChange = useCallback((file) => {
        setData('image', file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
        }
    }, [setData]);

    const removeImage = useCallback(() => {
        setImagePreview(null);
        setData('image', null);
    }, [setData]);

    const clearAllFields = useCallback(() => {
        reset();
        setDateTime(null);
        setImagePreview(null);
        setCoordinates({ lat: null, lng: null });

        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
    }, [reset]);

    const handlePhoneChange = useCallback((value) => {
        const numericValue = value.replace(/\D/g, '');
        setData('no_telpon', numericValue);
    }, [setData]);

    const handleSubmit = useCallback((e) => {
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
    }, [data, post, submitUrl, clearAllFields]);

    const getFieldError = useCallback((fieldName) => errors[fieldName], [errors]);

    const getFieldProps = useCallback((fieldName, additionalProps = {}) => ({
        value: data[fieldName] || '',
        onChange: (e) => setData(fieldName, e.target.value),
        className: errors[fieldName] ? 'border-red-500' : '',
        ...additionalProps
    }), [data, setData, errors]);

    return {
        data,
        setData,
        processing,
        errors,
        dateTime,
        imagePreview,
        coordinates,

        handleSubmit,
        handleDateTimeChange,
        handleImageChange,
        handlePhoneChange,
        removeImage,
        clearAllFields,
        handleLocationSelect,

        getFieldError,
        getFieldProps
    };
};

export default useFormHandler;