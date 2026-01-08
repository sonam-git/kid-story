'use client';

import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  storyTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({ isOpen, storyTitle, onConfirm, onCancel }: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-linear-to-r from-red-500 to-orange-500 text-white p-6 flex items-center gap-3">
          <AlertTriangle className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Delete Story?</h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-lg text-gray-700">
            Are you sure you want to delete <span className="font-bold text-gray-900">&quot;{storyTitle}&quot;</span>?
          </p>
          <p className="text-base text-gray-600">
            This action cannot be undone. The story and all its scenes will be permanently deleted. 😢
          </p>
        </div>

        {/* Buttons */}
        <div className="p-6 pt-0 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-linear-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-bold text-lg hover:shadow-lg transition-all hover:scale-105"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
