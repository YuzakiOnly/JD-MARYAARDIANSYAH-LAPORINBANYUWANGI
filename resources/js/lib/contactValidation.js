const gmailRegex = /^[\w.-]+@gmail\.com$/i;
const phoneRegex = /^[0-9]+$/;

export const contactValidator = (data) => {
    const errors = {};

    if (!data.nama_lengkap.trim()) {
        errors.nama_lengkap = 'Nama lengkap wajib diisi.';
    }

    if (!data.kecamatan_id) {
        errors.kecamatan_id = 'Pilih kecamatan.';
    }

    if (!data.no_telpon.trim()) {
        errors.no_telpon = 'Nomor telepon wajib diisi.';
    } else if (!phoneRegex.test(data.no_telpon)) {
        errors.no_telpon = 'Hanya angka diperbolehkan.';
    } else if (data.no_telpon.length > 15) {
        errors.no_telpon = 'Maksimal 15 digit.';
    }

    if (!data.alamat_email.trim()) {
        errors.alamat_email = 'Email wajib diisi.';
    } else if (!gmailRegex.test(data.alamat_email)) {
        errors.alamat_email = 'Gunakan email Gmail (@gmail.com).';
    }

    if (!data.deskripsi.trim()) {
        errors.deskripsi = 'Pesan wajib diisi.';
    } else if (data.deskripsi.trim().length < 10) {
        errors.deskripsi = 'Pesan minimal 10 karakter.';
    }

    return errors;
};