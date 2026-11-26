import { Trash2 } from "lucide-react";
import Modal from "./Modal.jsx";

// Confirmation dialog shown before deleting
function ConfirmModal({ productName, onConfirm, onCancel }) {
  return (
    <Modal title="Delete product?" onClose={onCancel}>
      <div className="confirm-body">
        <span className="confirm-icon">
          <Trash2 size={26} />
        </span>
        <p>
          <strong>{productName}</strong> will be permanently deleted. This action cannot be undone.
        </p>
      </div>
      <div className="modal-actions">
        <button className="btn btn-outline" onClick={onCancel}>
          Keep product
        </button>
        <button className="btn btn-danger" onClick={onConfirm}>
          Delete product
        </button>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
