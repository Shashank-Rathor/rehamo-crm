import React from 'react';
import classes from './New.module.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useState,useEffect } from 'react';
import { addDoc, collection, doc, serverTimestamp, setDoc,getDocs,updateDoc  } from "firebase/firestore"; 
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const New = () => {
    
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        id:'',
        date: '',
        crm:'',
        source:'',
        enquirytype:'',
        name: '',
        address: '',
        contact: '',
        email:'',
        product: '',
        remarks:'',
        typeofpurchase: '',
        status: '',
    });
    const [order_id,setOrderID] = useState("");
    const [order_number,setOrderNumber] = useState("");
    const [currentDate, setCurrentDate] = useState('');

    var OrderID = '';
    var ordernumber = 10000;

    
    useEffect(() => {

        setCurrentDate(getFormattedDate());

        const fetchData = async() => {
          let list = []
          try{
            const querySnapshot = await getDocs(collection(db, "enquiryid"));
          querySnapshot.forEach((doc) => {
            list.push({id: doc.id, ...doc.data()});
          });
          OrderID = list[0].EnquiryID
          ordernumber = parseInt(list[0].Number)
          ordernumber = ordernumber + 1
          OrderID = 'RE'+ordernumber

          setOrderID(OrderID);
          setOrderNumber(ordernumber);
          }
          catch(err){
            console.log(err)
          }
        };
        fetchData()
      },[]);

      const getFormattedDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };


    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    }


    const handleAdd = async(e) => {
        e.preventDefault();
        

        try{
            const res = await setDoc(doc(db, "enquiries",order_id), {
                    ID: order_id,
                    Date: formData.date,
                    Crm: formData.crm,
                    Source: formData.source,
                    EnquiryType: formData.enquirytype,
                    Name: formData.name,
                    Address: formData.address,
                    Contact: formData.contact,
                    Email: formData.email,
                    Product: formData.product,
                    TypeOfPurchase: formData.typeofpurchase,
                    Remarks: formData.remarks,
                    Status: formData.status,
                    
              })
              .then(()=>{
                navigate("/enquiries")
                const enquiryRef = doc(db, "enquiryid", "T6k1a5DIQ6JLml1SKpCc");

                const docRef = updateDoc(enquiryRef, {
                    Number: order_number,
                    EnquiryID: order_id
                  });
              })
        }
        catch(err){
            console.log(err)
        }

    }

  return (
    <div className={classes.new}>
        <Sidebar/>
        <div className={classes.newContainer}>
            <Navbar/>
             <div className={classes.top}>
             <h1>Add New Enquiry</h1></div>
             <div className={classes.bottom}>
                <form onSubmit={handleAdd}>
                    <div className={classes.formInput}>
                        <label>Date</label>
                        <input 
                        id ="date" 
                        type="date" 
                        placeholder='date'
                        value={formData.date || currentDate}
                        onChange={handleInput}
                        />
                    </div>
                    <div className={classes.formInput}>
                        <label>CRM</label>
                        <select 
                        id="crm" 
                        name="crm"
                        value={formData.crm}
                        onChange={handleInput}
                        >
                            <option value="Default">Select</option>
                            <option value="Vicky">Vicky</option>
                            <option value="Ramya">Ramya</option>
                        </select>
                    </div>
                    <div className={classes.formInput}>
                        <label>Source</label>
                        <select 
                        id="source" 
                        name="source"
                        value={formData.source}
                        onChange={handleInput}
                        >
                            <option value="Default">Select</option>
                            <option value="WebSearch">Web Search</option>
                            <option value="OldClient">Old Client</option>
                            <option value="WordOfMouth">Word Of Mouth</option>
                            <option value="Generated">Generated</option>
                        </select>
                    </div>
                    <div className={classes.formInput}>
                        <label>Enquiry Type</label>
                        <select 
                        id="enquirytype" 
                        name="enquirytype"
                        value={formData.enquirytype}
                        onChange={handleInput}
                        >
                            <option value="Default">Select</option>
                            <option value="Call">Call</option>
                            <option value="Tidio">Tidio</option>
                            <option value="Mail">Mail</option>
                            <option value="SocialMedia">Social Media</option>
                            <option value="Showroom">Showroom</option>
                            <option value="Whatsapp">Whatsapp</option>
                        </select>
                    </div>
                    <div className={classes.formInput}>
                        <label>Name</label>
                        <input 
                        id="name" 
                        type="text" 
                        placeholder='name'
                        value={formData.name}
                        onChange={handleInput}
                        />
                    </div>
                    <div className={classes.formInput}>
                        <label>Address</label>
                        <input 
                        id="address" 
                        type="text" 
                        placeholder='address'
                        value={formData.address}
                        onChange={handleInput}
                        />
                    </div>
                    <div className={classes.formInput}>
                        <label>Contact</label>
                        <input 
                        id="contact" 
                        type="tel" 
                        placeholder='contact'
                        value={formData.contact}
                        onChange={handleInput}
                        />
                    </div>
                    <div className={classes.formInput}>
                        <label>Email</label>
                        <input 
                        id="email" 
                        type="email" 
                        placeholder='email'
                        value={formData.email}
                        onChange={handleInput}
                        />
                    </div>
                    <div className={classes.formInput}>
                        <label>Product</label>
                        <input 
                        id="product" 
                        type="text" 
                        placeholder='product'
                        value={formData.product}
                        onChange={handleInput}
                        />
                    </div>
                    <div className={classes.formInput}>
                        <label>Type of Purchase</label>
                        <select 
                        id="typeofpurchase" 
                        name="typeofpurchase"
                        value={formData.typeofpurchase}
                        onChange={handleInput}
                        >
                            <option value="Default">Select</option>
                            <option value="Shop">Shop</option>
                            <option value="Rent">Rent</option>
                            <option value="Customized">Customized</option>
                            <option value="Repair">Repair</option>
                            <option value="Marketing">Marketing</option>
                        </select>
                    </div>
                    <div className={classes.formInput}>
                        <label>Remarks</label>
                        <input 
                        id="remarks" 
                        type="text" 
                        placeholder='remarks'
                        value={formData.remarks}
                        onChange={handleInput}
                        />
                    </div>
                    <div className={classes.formInput}>
                        <label>Status</label>
                        <select 
                        id="status" 
                        name="status"
                        value={formData.status}
                        onChange={handleInput}
                        >
                            <option value="default">Select</option>
                            <option value="active">Active</option>
                            <option value="closed">Closed</option>
                            <option value="sold">Sold</option>
                        </select>
                    </div>
                    <button type="submit" className={classes.sendButton}>Send</button>
                </form>
             </div>
        </div>
    </div>
  )
}

export default New