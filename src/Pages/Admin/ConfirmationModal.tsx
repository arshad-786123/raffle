import React from 'react';
import { Modal } from 'flowbite-react';

// Define the props type for the ConfirmationModal component
interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
    return (
        <Modal show={isOpen} onClose={onClose} style={{ fontFamily: "poppins, sans-serif" }}>
            <Modal.Header>Confirm Deletion</Modal.Header>
            <Modal.Body>
                <div className="text-center">
                    <h3 className="text-lg font-bold">Are you sure you want to delete this user?</h3>
                    <div className="mt-4 flex justify-center gap-4">
                        <button
                            className="bg-red-600 text-white px-4 py-2 rounded"
                            onClick={onConfirm}
                        >
                            Yes, Delete
                        </button>
                        <button
                            className="bg-gray-300 text-black px-4 py-2 rounded"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ConfirmationModal;
