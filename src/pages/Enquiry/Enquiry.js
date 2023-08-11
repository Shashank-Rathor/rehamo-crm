import React, { useEffect, useState } from 'react';
import classes from './Enquiry.module.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from 'react-router-dom';
import { getDoc,doc } from 'firebase/firestore';
import {db} from "../../firebase";

const Enquiry = () => {
  const [name, setName] = useState([]);
  const [remarks,setRemarks] = useState({});

const [data,setData] = useState([]);
const [dataArray, setDataArray] = useState([]);

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

  
  return (
    <div className={classes.single}>
        <Sidebar/>
        <div className={classes.singleContainer}>
            <Navbar/>
              <div className={classes.enquiryContainer}>
                {name == data.Crm ? <Link to={`/enquiry/edit?id=${data.ID}`}>
                <div className={classes.editButton}>Edit</div>
                </Link> : <></>}
                <h1 className={classes.title}>{data.Name}</h1>
                <div className={classes.detailContainer}>
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
                      <span className={classes.itemKey}>Contact: <span>{data.Contact}</span></span>
                    </div>
                    <div className={classes.detailItem}>
                      <span className={classes.itemKey}>Email: <span>{data.Email}</span></span>
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
                    <span className={classes.itemKey}>Remarks</span>
                        <ul style={{paddingLeft: "5px"}}>
                         {dataArray.map((data, index) => (
                            <li key={index} className={classes.itemValue} >
                             <b>Date: </b> {data.input1}, <b>Remarks:</b> {data.input2}
                            </li>
                         ))}
                        </ul>
                    </div>  
                    <div className={classes.detailItem}/>
                </div>
              </div>
        </div>
    </div>
  )
}

export default Enquiry