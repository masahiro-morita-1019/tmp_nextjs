import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import ChangePassword from '@/pages/change-password';

type Props = {
  isDisplay: boolean;
  onClose: () => void;
};
const ChangePasswordModal: React.FC<Props> = ({ isDisplay, onClose }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const closeModal = () => {
    onClose();
    setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(isDisplay);
  }, [isOpen, isDisplay]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 overflow-auto" onClose={closeModal}>
          <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-900/25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="pointer-events-auto relative inline-block w-[40rem] space-y-4 overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all">
                <ChangePassword onClose={() => closeModal()} />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ChangePasswordModal;