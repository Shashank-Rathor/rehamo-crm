import React from 'react';
import classes from './ViewModal.module.css';

const ViewModal = ({isOpen, onClose,viewData}) => {
  
  if (!isOpen) {
    return null;
  }

  return (
    <div className={classes.modaloverlay}>
        <div className={classes.modalcontent}>
        <button className={classes.closebutton} onClick={onClose}>
          Close
        </button>
        {viewData ?
        <>
        <div className={classes.mainContainer} style={{marginTop: "8%"}}>
        <div><strong>ID:</strong> {viewData.ID}</div>
        <div><strong>Date:</strong> {viewData.Date }</div>
        <div><strong>Name:</strong> {viewData.Name}</div> 
        </div> 
        <div className={classes.mainContainer}>
        <div><strong>Source:</strong> {viewData.Source}</div>
        <div><strong>CRM:</strong> {viewData.Crm}</div>
        <div><strong>Contact:</strong> {viewData.Contact}</div>
        </div> 
        <div className={classes.mainContainer}>
        <div><strong>Enquiry:</strong> {viewData.EnquiryType}</div>
        <div><strong>Category:</strong> {viewData.Category}</div>
        <div><strong>Product:</strong> {viewData.Product}</div>
        </div>
        <div className={classes.mainContainer}>
        <div><strong>Type:</strong> {viewData.TypeOfPurchase}</div>
        <div><strong>Status:</strong> {viewData.Status}</div>
        <div><strong>Revenue:</strong> {viewData.Revenue}</div>
        </div>
        <div className={classes.mainContainer}>
        <div style={{width: "300px"}}><strong>Reminder Date:</strong> {viewData.ReminderDate}</div>
        </div>
        <div className={classes.remarksContainer}>
              <div className={classes.detailItem} style={{width: "100%"}}>
                        <ul style={{paddingLeft: "5px"}}>
                            <li className={classes.remarkValue} >
                              <strong> Recent Remarks</strong>
                              <div className={classes.remarksHeader}>
                              <div className={classes.remarksLeft}><b>CRM:</b>{viewData.Remarks[viewData.Remarks.length-1].input3}</div>
                              <div className={classes.remarksRight}><b>Date: </b> {viewData.Remarks[viewData.Remarks.length-1].input1}</div>
                              </div>
                              <div> 
                              <b>Remarks:</b> {viewData.Remarks[viewData.Remarks.length-1].input2}
                              </div>
                            </li>
                        </ul>
                    </div>  
              </div>
        </> : <></>}
        </div>
    </div>
  )
}

export default ViewModal