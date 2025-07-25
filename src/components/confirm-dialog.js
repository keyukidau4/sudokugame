import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertTriangle, X } from "lucide-react";
export default function ConfirmDialog({ isOpen, title, message, confirmText = "Confirm", cancelText = "Cancel", onConfirm, onCancel, variant = "warning" }) {
    if (!isOpen)
        return null;
    const variantStyles = {
        danger: {
            icon: "text-red-500",
            confirmButton: "bg-red-600 hover:bg-red-700 text-white",
            iconBg: "bg-red-100"
        },
        warning: {
            icon: "text-amber-500",
            confirmButton: "bg-amber-600 hover:bg-amber-700 text-white",
            iconBg: "bg-amber-100"
        },
        info: {
            icon: "text-blue-500",
            confirmButton: "bg-blue-600 hover:bg-blue-700 text-white",
            iconBg: "bg-blue-100"
        }
    };
    const styles = variantStyles[variant];
    return (_jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center", children: [_jsx("div", { className: "absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm", onClick: onCancel }), _jsxs("div", { className: "relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-200 scale-100", children: [_jsx("button", { onClick: onCancel, className: "absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors", children: _jsx(X, { className: "w-5 h-5" }) }), _jsxs("div", { className: "p-6", children: [_jsx("div", { className: `w-12 h-12 ${styles.iconBg} rounded-full flex items-center justify-center mb-4`, children: _jsx(AlertTriangle, { className: `w-6 h-6 ${styles.icon}` }) }), _jsxs("div", { className: "mb-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: title }), _jsx("p", { className: "text-gray-600 text-sm leading-relaxed", children: message })] }), _jsxs("div", { className: "flex space-x-3", children: [_jsx("button", { onClick: onCancel, className: "flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors", children: cancelText }), _jsx("button", { onClick: onConfirm, className: `flex-1 px-4 py-2 ${styles.confirmButton} rounded-lg text-sm font-medium transition-colors`, children: confirmText })] })] })] })] }));
}
