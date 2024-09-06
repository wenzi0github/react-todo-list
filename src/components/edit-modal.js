import { useEffect, useState } from "react";
import "./edit-modal.css";

const EditModal = ({ open, data, onCancel, onOk }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (open && data) {
      setValue(data.title);
    }
  }, [open, data]);

  if (!open) {
    return null;
  }

  const handleClick = () => {
    if (value) {
      onOk({ ...data, title: value });
    }
  };

  return (
    <div className="modal">
      <div className="modal-overlay"></div>
      <div className="modal-body">
        <button className="close" onClick={onCancel}>
          x
        </button>
        <div className="modal-content">
          <input className="input" placeholder="请输入内容" value={value} onInput={(e) => setValue(e.target.value)} />
        </div>
        <div className="btn-group">
          <button onClick={onCancel}>取消</button>
          <button onClick={handleClick}>确定</button>
        </div>
      </div>
    </div>
  );
};
export default EditModal;
