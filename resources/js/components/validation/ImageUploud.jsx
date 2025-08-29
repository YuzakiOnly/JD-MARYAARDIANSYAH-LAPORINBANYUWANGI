import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X } from 'lucide-react';
import { validateFile } from '@/lib/validation';
import { alerts } from '@/lib/alert';

export const ImageUpload = ({ 
    imagePreview, 
    onImageChange, 
    onRemoveImage,
    className = '',
    ...props 
}) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const fileError = validateFile(file);
        if (fileError) {
            alerts.fileError(fileError.title, fileError.message);
            e.target.value = '';
            return;
        }

        onImageChange(file);
    };

    const handleRemove = () => {
        onRemoveImage();
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
    };

    if (imagePreview) {
        return (
            <div className={`relative w-full h-64 border-2 border-gray-200 rounded-lg overflow-hidden ${className}`}>
                <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-full object-cover" 
                />
                <button
                    type="button"
                    onClick={handleRemove}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    title="Hapus gambar"
                >
                    <X size={16} />
                </button>
            </div>
        );
    }

    return (
        <Card className={`relative w-full h-64 border-2 border-dashed flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors ${className}`}>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                {...props}
            />
            <CardContent className="flex flex-col items-center justify-center space-y-2 p-4">
                <Upload className="w-10 h-10 text-gray-500" />
                <p className="text-sm text-center">
                    <span className="font-semibold">Klik untuk unggah</span> atau drag & drop
                </p>
                <p className="text-xs text-gray-500 text-center">
                    PNG, JPG, JPEG, atau GIF (MAX. 10 MB)
                </p>
            </CardContent>
        </Card>
    );
};

export default ImageUpload;