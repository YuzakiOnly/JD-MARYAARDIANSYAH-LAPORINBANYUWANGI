import Swal from 'sweetalert2';

const defaultConfig = {
    confirmButtonColor: '#3B82F6',
    cancelButtonColor: '#6B7280'
};

const alertConfigs = {
    success: {
        icon: 'success',
        confirmButtonText: 'OK'
    },
    error: {
        icon: 'error',
        confirmButtonText: 'OK'
    },
    warning: {
        icon: 'warning',
        confirmButtonText: 'OK'
    },
    question: {
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ya, Kirim',
        cancelButtonText: 'Batal'
    },
    confirm: {
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }
};

export const showAlert = (type, title, content = null, callback = null) => {
    const config = {
        ...defaultConfig,
        ...alertConfigs[type],
        title,
        ...(content && (typeof content === 'string' ? { text: content } : { html: content }))
    };

    if (callback) {
        return Swal.fire(config).then(callback);
    }
    
    return Swal.fire(config);
};

export const showSuccessAlert = (title, message, callback = null) => 
    showAlert('success', title, message, callback);

export const showErrorAlert = (title, message, callback = null) => 
    showAlert('error', title, message, callback);

export const showWarningAlert = (title, message, callback = null) => 
    showAlert('warning', title, message, callback);

export const showConfirmAlert = (title, message, callback = null) => 
    showAlert('question', title, message, callback);

export const alerts = {
    formIncomplete: (errors) => showWarningAlert(
        'Form Belum Lengkap', 
        errors.map(error => `${error}`)
    ),
    
    submitConfirm: (callback) => showConfirmAlert(
        'Konfirmasi Pengiriman',
        'Apakah Anda yakin ingin mengirim laporan ini?',
        callback
    ),
    
    submitSuccess: (callback) => showSuccessAlert(
        'Laporan Berhasil Dikirim!',
        'Terima kasih, laporan Anda telah diterima dan akan segera diproses.',
        callback
    ),
    
    submitError: (errors) => showErrorAlert(
        'Validasi Gagal',
        Object.values(errors).flat().map(error => `• ${error}`).join('<br>')
    ),
    
    fileError: (title, message) => showErrorAlert(title, message)
};