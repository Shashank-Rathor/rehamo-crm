import React, { useState } from 'react';
import classes from './Modal.module.css';

const Modal = ({isOpen, onClose, onSubmit}) => {

    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');

    const handleInputChange1 = (e) => {
        setInputValue1(e.target.value);
      };
    
      const handleInputChange2 = (e) => {
        setInputValue2(e.target.value);
      };

      const handleSubmit = () => {
        onSubmit({ input1: inputValue1, input2: inputValue2 });
        setInputValue1('');
        setInputValue2('');
        onClose();
      };

      if (!isOpen) {
        return null;
      }

  return (
    <div className={classes.modal}>
    <div className={classes.remarksModal}>
        <label style={{marginBottom: "10%"}}>Add Remarks</label>
        <input id="RemarksDate" className={classes.remarksInput} type="date"  value={inputValue1} placeholder="date" onChange={handleInputChange1}/>
        <textarea id="Remark" className={classes.remarksInput} type="textArea" placeholder="remarks" value={inputValue2} onChange={handleInputChange2}/>
        <button className={classes.remarksButton} onClick={handleSubmit}>Add</button>
    </div>
    </div>
  )
}

export default Modal