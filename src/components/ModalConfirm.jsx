"use client"
import { AlertTriangle, X } from "lucide-react"

const ModalConfirm = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Konfirmasi",
  cancelLabel = "Batal",
  titleColor = "#ef4444",
  messageColor = "#666",
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold" style={{ color: titleColor }}>
                {title}
              </h3>
            </div>
            <button
              onClick={onCancel}
              className="ml-auto p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-sm leading-relaxed" style={{ color: messageColor }}>
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="p-6 pt-0 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200 font-medium"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all duration-200 font-medium"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalConfirm
