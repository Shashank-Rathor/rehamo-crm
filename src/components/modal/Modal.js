import React, { useState,useContext } from 'react';
import { DataContext } from '../../components/context/DataContext';
import classes from './Modal.module.css';

const Modal = ({isOpen, onClose, onSubmit,crm,handleInputChange}) => {


    const {users} = useContext(DataContext);

      if (!isOpen) {
        return null;
      }

  return (
    <div className={classes.modaloverlay}>
      <div className={classes.modalcontent}>
        <button className={classes.closebutton} onClick={onClose}>
          Close
        </button>
        <div className={classes.modalbody}>
          <h2>CRM Operators</h2>
          {users.length > 0 ? (
          <select
          style={{marginTop: "20px", marginBottom: "25px"}}
          value={crm}
          onChange={handleInputChange}
          >
            <option value="default">Select</option>
            {users.map((item) => (
              <option value={item.Name}>{item.Name}</option>
            ))}
          </select>):(
            <p>Loading options...</p>
          )}
          <button onClick={onSubmit} className={classes.submitButton}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Modal