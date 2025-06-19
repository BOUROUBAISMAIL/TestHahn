import { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ExclamationTriangleIcon, CheckCircleIcon, SparklesIcon } from '@heroicons/react/24/outline';

const Popup = ({ isOpen, onClose, type = 'error', title, message }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const getIcon = () => {
    if (type === 'success') {
      return (
        <div className="relative">
          <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
          <CheckCircleIcon className="h-8 w-8 text-green-400 relative z-10" />
        </div>
      );
    }
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-20"></div>
        <ExclamationTriangleIcon className="h-8 w-8 text-red-400 relative z-10" />
      </div>
    );
  };

  const getBackgroundGradient = () => {
    return type === 'success' 
      ? 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20' 
      : 'from-red-500/20 via-pink-500/20 to-rose-500/20';
  };

  const getBorderGradient = () => {
    return type === 'success'
      ? 'from-emerald-400 via-teal-400 to-cyan-400'
      : 'from-red-400 via-pink-400 to-rose-400';
  };

  const getButtonGradient = () => {
    return type === 'success'
      ? 'from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700'
      : 'from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700';
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-400"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-400"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4"
            >
              <Dialog.Panel className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl shadow-2xl transition-all border border-white/20">
                {/* Animated background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getBackgroundGradient()} opacity-50`} />
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-sm" />
                
                {/* Border gradient */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${getBorderGradient()} p-[1px]`}>
                  <div className="absolute inset-0 rounded-2xl bg-white/80 backdrop-blur-xl" />
                </div>

                <div className="relative p-6">
                  {/* Close button */}
                  <button
                    type="button"
                    className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 transition-all duration-200 backdrop-blur-sm"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>

                  {/* Content */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {getIcon()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Dialog.Title as="h3" className="text-lg font-bold text-gray-900 mb-2">
                        {title}
                      </Dialog.Title>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {message}
                      </p>
                    </div>
                  </div>

                  {/* Action button */}
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      className={`inline-flex items-center px-6 py-3 rounded-xl text-sm font-semibold text-white shadow-lg transition-all duration-200 bg-gradient-to-r ${getButtonGradient()} transform hover:scale-105 active:scale-95`}
                      onClick={onClose}
                    >
                      <SparklesIcon className="h-4 w-4 mr-2" />
                      Got it!
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Popup; 