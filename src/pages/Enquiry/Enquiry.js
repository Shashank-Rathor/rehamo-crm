import React, { useEffect, useState,useContext } from 'react';
import classes from './Enquiry.module.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from 'react-router-dom';
import { getDoc,doc,updateDoc } from 'firebase/firestore';
import {db} from "../../firebase";
import Modal from '../../components/modal/Modal';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/context/AuthContext';

const Enquiry = () => {
  const navigate = useNavigate();
  const {currentUser} = useContext(AuthContext);
  const [name, setName] = useState([]);

const [data,setData] = useState([]);
const [dataArray, setDataArray] = useState([]);
const [isModalOpen, setIsModalOpen] = useState(false);
const [crm, setCrm] = useState('');
const [order_id, setOrderID] = useState('');


  var id='';

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
   setName(user.displayName);
  }
  const fetchData =  () => {
    var mainurl = document.location.href,
    params = mainurl.split('?')[1].split('&'),
    data = {},
    tmp
  for (var i = 0, l = params.length; i < l; i++) {
    tmp = params[i].split('=')
    data[tmp[0]] = tmp[1]
  }
  id = data.id
  setOrderID(id);
  
  const docRef = doc(db, "enquiries", id);
   
  return getDoc(docRef)
  .then((res) =>{
    if(res){
        setData(res.data())
        setDataArray(res.data().Remarks)
    }
  })
  }
  fetchData();
  },[])

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };
  const handleInputChange = (e) => {
    setCrm(e.target.value);
    };

    const handleUpdateField = async () => {
      try {
        await updateDoc(doc(db, "enquiries",order_id), {
          Crm: crm,
        })
        .then(()=>{
          navigate(`/enquiries/${currentUser.displayName}`)
        })
  
        console.log('Field updated successfully.');
      } catch (error) {
        console.error('Error updating field:', error);
      }
  
      handleCloseModal();
    };
  


  return (
    <div className={classes.single}>
        <Sidebar/>
        <div className={classes.singleContainer}>
            
              <div className={classes.enquiryContainer}>
              <Link to={`/enquiries/add?id=${data.ID}`}>
                <div className={classes.addButton}>Add Old Client</div>
                </Link>
                {name == data.Crm ?
                <>
                <Link to={`/enquiry/edit?id=${data.ID}`}>
                <div className={classes.editButton}>Edit</div>
                </Link> 
                <button className={classes.transferButton} onClick={handleButtonClick}>Transfer</button> </> : <></>}
                <h1 className={classes.title}>{data.Name}</h1>
                <div className={classes.detailContainer}>
                  <Modal 
                  isOpen={isModalOpen} 
                  onClose={handleCloseModal}
                  crm={crm}
                  handleInputChange={handleInputChange}
                  onSubmit={handleUpdateField}
                  />
                    <div className={classes.detailItem}>
                      <span className={classes.itemKey}>ID: <span>{data.ID}</span></span>
                    </div>
                    <div className={classes.detailItem}>
                      <span className={classes.itemKey}>Date: <span>{data.Date}</span></span>
                    </div>
                    <div className={classes.detailItem}>
                      <span className={classes.itemKey}>CRM: <span>{data.Crm}</span></span>
                    </div>
                    <div className={classes.detailItem}>
                      <span className={classes.itemKey}>Source: <span>{data.Source}</span></span>
                    </div>
                    <div className={classes.detailItem}>
                      <span className={classes.itemKey}>Enquiry Type: <span>{data.EnquiryType}</span></span>
                    </div>
                    <div className={classes.detailItem}>
                      <span className={classes.itemKey}>Name: <span>{data.Name}</span></span>
                    </div>
                    <div className={classes.detailItem}>
                      <span className={classes.itemKey}>Address: <span>{data.Address}</span></span>
                    </div>
                    <div className={classes.detailItem}>
                      <span className={classes.itemKey}>City: <span>{data.City}</span></span>
                    </div>
                    <div className={classes.detailItem}>
                      <span className={classes.itemKey}>Pincode: <span>{data.Pincode}</span></span>
                    </div>
                    <div className={classes.detailItem}>
                      <span className={classes.itemKey}>Contact: <span>{data.Contact}</span></span>
                    </div>
                    <div className={classes.detailItem}>
                      <span className={classes.itemKey}>Email: <span>{data.Email}</span></span>
                    </div>
                    <div className={classes.detailItem}>
                      <span className={classes.itemKey}>Category: <span>{data.Category}</span></span>
                    </div>
                    <div className={classes.detailItem}>
                      <span className={classes.itemKey}>Product: <span>{data.Product}</span></span>
                    </div>
                    <div className={classes.detailItem}>
                      <span className={classes.itemKey}>Type of Purchase: <span>{data.TypeOfPurchase}</span></span>
                    </div>
                    <div className={classes.detailItem}>
                      <span className={classes.itemKey}>Status: <span>{data.Status}</span></span>
                    </div>
                    <div className={classes.detailItem}>
                      <span className={classes.itemKey}>Revenue: <span>Rs. {data.Revenue}</span></span>
                    </div>
                    {data.ReminderDate !== null ? 
                    <div className={classes.detailItem}>
                    <span className={classes.itemKey}>Reminder Date: <span>{data.ReminderDate}</span></span>
                  </div>:<></>}
                    
                </div>
              </div>
              
              <span className={classes.itemKey}>Remarks</span>
              <div className={classes.remarksContainer}>
              <div className={classes.detailItem} style={{width: "100%"}}>
                        <ul style={{paddingLeft: "5px"}}>
                         {dataArray.map((data, index) => (
                            <li key={index} className={classes.remarkValue} >
                              <div className={classes.remarksHeader}>
                              <div className={classes.remarksLeft}><b>CRM:</b>{data.input3}</div>
                              <div className={classes.remarksRight}><b>Date: </b> {data.input1}</div>
                              </div>
                              <div> 
                              <b>Remarks:</b> {data.input2}
                              </div>
                            </li>
                         ))}
                        </ul>
                    </div>  
              </div>
        </div>
    </div>
  )
}

export default Enquiry