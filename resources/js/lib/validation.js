
export const validationRules = {
    phone: { 
        min: 11, 
        max: 14, 
        regex: /^[0-9]+$/ 
    },
    description: { 
        min: 10 
    },
    image: { 
        maxSize: 10 * 1024 * 1024, 
        types: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'] 
    }
};

const validationMessages = {
    required: (field) => `${field} wajib diisi.`,
    phone: {
        invalidFormat: 'Nomor telepon hanya boleh berisi angka.',
        minLength: (min) => `Nomor telepon minimal ${min} digit.`,
        maxLength: (max) => `Nomor telepon maksimal ${max} digit.`
    },
    description: {
        minLength: (min) => `Deskripsi minimal ${min} karakter.`
    },
    image: {
        tooLarge: 'Ukuran file maksimal 10MB',
        invalidFormat: 'Hanya file PNG, JPG, JPEG, dan GIF yang diperbolehkan'
    }
};

// Validate individual field
export const validateField = (field, value) => {
    switch (field) {
        case 'no_telpon':
            if (!validationRules.phone.regex.test(value)) {
                return validationMessages.phone.invalidFormat;
            }
            if (value.length < validationRules.phone.min) {
                return validationMessages.phone.minLength(validationRules.phone.min);
            }
            if (value.length > validationRules.phone.max) {
                return validationMessages.phone.maxLength(validationRules.phone.max);
            }
            break;
        case 'deskripsi':
            if (value.length < validationRules.description.min) {
                return validationMessages.description.minLength(validationRules.description.min);
            }
            break;
    }
    return null;
};

export const validateForm = (data) => {
    const errors = [];
    const requiredFields = {
        judul_laporan: 'Judul laporan',
        no_telpon: 'Nomor telepon',
        category_id: 'Kategori',
        kecamatan_id: 'Kecamatan',
        lokasi_asli: 'Lokasi asli',
        deskripsi: 'Deskripsi',
        tanggal_kejadian: 'Tanggal kejadian',
        waktu_kejadian: 'Waktu kejadian',
        image: 'Gambar'
    };

    Object.entries(requiredFields).forEach(([field, label]) => {
        if (!data[field]) {
            errors.push(validationMessages.required(label));
        }
    });

    if (data.no_telpon) {
        const phoneError = validateField('no_telpon', data.no_telpon);
        if (phoneError) errors.push(phoneError);
    }

    if (data.deskripsi) {
        const descError = validateField('deskripsi', data.deskripsi);
        if (descError) errors.push(descError);
    }

    return errors;
};

export const validateFile = (file) => {
    if (!file) return null;

    if (file.size > validationRules.image.maxSize) {
        return {
            type: 'error',
            title: 'File Terlalu Besar',
            message: validationMessages.image.tooLarge
        };
    }

    if (!validationRules.image.types.includes(file.type)) {
        return {
            type: 'error',
            title: 'Format File Tidak Didukung',
            message: validationMessages.image.invalidFormat
        };
    }

    return null;
};