import React, { useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  helperText?: string;
  id?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  helperText = 'Paste an image URL or choose a file from your device',
  id,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (e.g. 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be under 5MB for optimal browser performance.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result;
      if (typeof result === 'string') {
        onChange(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleClear = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
        {label}
      </label>

      {/* Preview if image exists */}
      {value?.trim() ? (
        <div className="relative inline-block border border-stone-200 rounded-lg overflow-hidden bg-stone-100 max-h-48 group">
          <img
            src={value}
            alt={label}
            className="max-h-48 object-cover rounded-lg"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2 right-2 bg-black/70 hover:bg-red-700 text-white p-1 rounded-full shadow transition-colors"
            title="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : null}

      {/* Input controls */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <input
            type="text"
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://... or upload from device"
            className="w-full text-xs font-mono px-3 py-2 border border-stone-300 rounded-md focus:ring-1 focus:ring-red-800 focus:border-red-800 bg-white text-stone-900"
          />
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <button
          type="button"
          onClick={handleTriggerUpload}
          className="inline-flex items-center space-x-1.5 px-3 py-2 border border-stone-300 hover:border-stone-800 bg-stone-50 hover:bg-stone-100 text-stone-800 text-xs font-medium rounded-md transition-colors cursor-pointer shrink-0"
          title="Upload from device"
        >
          <Upload className="w-3.5 h-3.5 text-stone-600" />
          <span>Upload Image</span>
        </button>
      </div>

      {helperText && (
        <p className="text-[11px] text-stone-500 font-light flex items-center gap-1">
          <ImageIcon className="w-3 h-3 text-stone-400" />
          <span>{helperText}</span>
        </p>
      )}
    </div>
  );
};
