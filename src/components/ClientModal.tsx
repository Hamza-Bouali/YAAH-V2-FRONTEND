import React from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { PatientData } from '../hooks/usePatients';

interface ClientModalProps {
  open: boolean;
  setOpen: (arg0: boolean) => void;
  clients: PatientData[];
  onSelectClient: (clientName: string) => void;
}

const ClientModal: React.FC<ClientModalProps> = ({ open, setOpen, clients, onSelectClient }) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-20">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-20 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" className="text-lg font-semibold text-gray-900">
                    Select a Client
                  </DialogTitle>
                  <div className="mt-4 space-y-3">
                    {clients.map((client) => (
                      <div
                        key={client.id}
                        onClick={() => onSelectClient(client.name)}
                        className="cursor-pointer p-2 hover:bg-gray-100 rounded-md"
                      >
                        {client.name}
                      </div>
                    ))}

                    <div className="mt-4">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          alert('Create new client functionality goes here.');
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        + Create New Client
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ClientModal;