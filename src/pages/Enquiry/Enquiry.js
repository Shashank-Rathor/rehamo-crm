import React, { useEffect, useState } from 'react';
import classes from './Enquiry.module.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from 'react-router-dom';
import { getDoc,doc } from 'firebase/firestore';
import {db} from "../../firebase";

const Enquiry = () => {
  const [name, setName] = useState([]);
  const [data,setData] = useState({});

  var id='';

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
   setName(user.displayName);
  }
    const fetchData = async () => {
      var mainurl = document.location.href,
      params = mainurl.split('?')[1].split('&'),
      data = {},
      tmp
    for (var i = 0, l = params.length; i < l; i++) {
      tmp = params[i].split('=')
      data[tmp[0]] = tmp[1]
    }
    id = data.id
    
    const docRef = doc(db, "enquiries", id);
    const docSnap = await getDoc(docRef);
    setData(docSnap.data())
    }
    fetchData();
  },[])

  console.log(data.Crm)
  console.log(name)
  
  return (
    <div className={classes.single}>
        <Sidebar/>
        <div className={classes.singleContainer}>
            <Navbar/>
              <div className={classes.enquiryContainer}>
                {name == data.Crm ? <Link to={`/enquiry/edit?id=${data.ID}`}>
                <div className={classes.editButton}>Edit</div>
                </Link> : <></>}
                <h1 className={classes.title}>User Name</h1>
                <div className={classes.detailContainer}>
                    <div className={classes.detailItem}>
                      <span className={classes.itemKey}>ID:</span>
                      <span className={classes.itemValue}>{data.ID}</span>
                    </div>
                    <div className={classes.detailItem}>
                      <span className={classes.itemKey}>Date:</span>
                      <span className={classes.itemValue}>{data.Date}</span>
                    </div>
                    <div className={classes.detailItem}>
                      <span className={classes.itemKey}>CRM:</span>
                      <span className={classes.itemValue}>{data.Crm}</span>
                    </div>
                    <div className={classes.detailItem}>
                      <span className={classes.itemKey}>Source:</span>
                      <span className={classes.itemValue}>{data.Source}</span>
                    </div>
                    <div className={classes.detailItem}>
                      <span className={classes.itemKey}>Enquiry Type:</span>
                      <span className={classes.itemValue}>{data.EnquiryType}</span>
                    </div>
                    <div className={classes.detailItem}>
                      <span className={classes.itemKey}>Name:</span>
                      <span className={classes.itemValue}>{data.Name}</span>
                    </div>
                    <div className={classes.detailItem}>
                      <span className={classes.itemKey}>Address:</span>
                      <span className={classes.itemValue}>{data.Address}</span>
                    </div>
                    <div className={classes.detailItem}>
                      <span className={classes.itemKey}>Contact:</span>
                      <span className={classes.itemValue}>{data.Contact}</span>
                    </div>
                    <div className={classes.detailItem}>
                      <span className={classes.itemKey}>Email:</span>
                      <span className={classes.itemValue}>{data.Email}</span>
                    </div>
                    <div className={classes.detailItem}>
                      <span className={classes.itemKey}>Product:</span>
                      <span className={classes.itemValue}>{data.Product}</span>
                    </div>
                    <div className={classes.detailItem}>
                      <span className={classes.itemKey}>Type of Purchase:</span>
                      <span className={classes.itemValue}>{data.TypeOfPurchase}</span>
                    </div>
                    <div className={classes.detailItem}>
                      <span className={classes.itemKey}>Remarks:</span>
                      <span className={classes.itemValue}>{data.Remarks}</span>
                    </div>
                    <div className={classes.detailItem}>
                      <span className={classes.itemKey}>Status:</span>
                      <span className={classes.itemValue}>{data.Status}</span>
                    </div>
                    <div className={classes.detailItem}/>
                </div>
              </div>
        </div>
    </div>
  )
}

export default Enquiry