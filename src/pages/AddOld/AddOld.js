import React from 'react';
import classes from './AddOld.module.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useState,useEffect } from 'react';
import { addDoc, collection, doc, getDoc, setDoc,getDocs,updateDoc  } from "firebase/firestore"; 
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/modal/Modal';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


const options = [
  'N/A',
  'Wheelchairs',
  'Grab Bars',
  'Shower Chair',
  'Commode Chair',
  'Shower Commode Chair',
  'Bedroom Aids',
  'Transfer Aids',
  'Walkers',
  'Canes',
  'Crutches',
  'Rollators',
  'Orthotics',
  'Footwears',
  'Pediatrics',
  'Hospital Care',
  'Incontinence',
  'Complaint'
];

const AddOld = () => {
    
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        id:'',
        date: '',
        reminderDate:'',
        crm:'',
        source:'',
        enquirytype:'',
        name: '',
        address: '',
        city:'',
        pincode:'',
        contact: '',
        contact2: '',
        email:'',
        category:'',
        product: '',
        remarks:'',
        typeofpurchase: '',
        status: '',
        revenue: '',
    });
    const [order_id,setOrderID] = useState("");
    const [order_number,setOrderNumber] = useState("");
    const [dataArray, setDataArray] = useState([]);
    const [inputValue2, setInputValue2] = useState('');


    var id="";
    var OrderID = '';
    var ordernumber = 10000;
    
    useEffect(() => {

        

        const fetchDataID = async() => {
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
        const fetchData =  () => {
          const user = JSON.parse(localStorage.getItem('user'))
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
              setFormData({
                  name: res.data().Name,
                  date: getFormattedDate(),
                  crm: user.displayName,
                  source: "OldClient",
                  enquirytype: "",
                  address: res.data().Address,
                  city: res.data().City,
                  pincode: res.data().Pincode,
                  contact: res.data().Contact,
                  contact2: res.data().Contact2,
                  email: res.data().Email,
                  category: "",
                  product: "",
                  typeofpurchase: "",
                  remarks: "",
                  status: "",
                  reminderDate: "",
                  revenue: "",
              })
          }
        })
        }
        fetchData();
        fetchDataID()
      },[]);

      const getFormattedDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
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
        
        if(formData.date && formData.crm && formData.source && formData.enquirytype && formData.name && formData.revenue && formData.product && formData.typeofpurchase && formData.status)
        {
        try{
            const res = await setDoc(doc(db, "enquiries",order_id), {
                    ID: order_id,
                    Date: formData.date,
                    Crm: formData.crm,
                    Source: formData.source,
                    EnquiryType: formData.enquirytype,
                    Name: formData.name,
                    Address: formData.address || null,
                    City: formData.city || null,
                    Pincode: formData.pincode || null,
                    Contact: formData.contact || null,
                    Contact2: formData.contact2 || null,
                    Email: formData.email || null,
                    Category: formData.category || null,
                    Product: formData.product,
                    Revenue: formData.revenue,
                    TypeOfPurchase: formData.typeofpurchase,
                    Remarks: dataArray,
                    Status: formData.status,
                    ReminderDate: formData.reminderDate || null,
                    
              })
              .then(()=>{
                navigate(`/enquiries/${formData.crm.replace(/\s/g, '')}`)
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
    else{
        alert("Enter all details")
    }

    }

    
      const handleInputChange2 = (e) => {
        setInputValue2(e.target.value);
      };

      const handleRemarkSubmit = () => {
        const getFormattedDate = () => {
          const now = new Date();
          const year = now.getFullYear();
          const month = String(now.getMonth() + 1).padStart(2, '0');
          const day = String(now.getDate()).padStart(2, '0');
          const hours = String(now.getHours()).padStart(2, '0');
          const minutes = String(now.getMinutes()).padStart(2, '0');
          return `${year}-${month}-${day}T${hours}:${minutes}`;
        };

        handleDataSubmit({ input1: getFormattedDate(), input2: inputValue2, input3: formData.crm });
        setInputValue2('');
      };

      const handleDataSubmit = (newData) => {
        setDataArray([...dataArray, newData]);
      };

  return (
    <div className={classes.new}>
        <Sidebar/>
        <div className={classes.newContainer}>
             <div className={classes.top}>
             <h1>Add OldClient Enquiry</h1></div>
             <div className={classes.bottom}>
                <form onSubmit={handleAdd}>
                    <div className={classes.formInput}>
                        <label>Date</label>
                        <input 
                        id ="date" 
                        type="datetime-local" 
                        placeholder='date'
                        required
                        value={formData.date}
                        onChange={handleInput}
                        />
                    </div>
                    <div className={classes.formInput}>
                        <label>CRM</label>
                        <input 
                        id="name" 
                        type="text" 
                        placeholder='name'
                        value={formData.crm}
                        disabled
                        style={{color: "grey", border: "none"}}
                        />
                    </div>
                    <div className={classes.formInput}>
                        <label>Source</label>
                        <input 
                        type="text"
                        id="source" 
                        name="source"
                        value={formData.source}
                        disabled
                        style={{color: "grey", border: "none"}}
                        />
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
                        disabled
                        style={{color: "grey", border: "none"}}
                        />
                    </div>
                    <div className={classes.formInput}>
                        <label>Address</label>
                        <input 
                        id="address" 
                        type="text" 
                        placeholder='address'
                        value={formData.address}
                        disabled
                        style={{color: "grey", border: "none"}}
                        />
                    </div>
                    <div className={classes.formInput}>
                        <label>City</label>
                        <input 
                        id="city" 
                        type="text" 
                        placeholder='city'
                        value={formData.city}
                        disabled
                        style={{color: "grey", border: "none"}}
                        />
                    </div>
                    <div className={classes.formInput}>
                        <label>Pincode</label>
                        <input 
                        id="pincode" 
                        type="number" 
                        placeholder='pincode'
                        value={formData.pincode}
                        disabled
                        style={{color: "grey", border: "none"}}
                        />
                    </div>
                    <div className={classes.formInput} style={{display: "flex"}}>
                        <label>Contact</label>
                        <input 
                        id="contact" 
                        type="tel" 
                        placeholder='contact'
                        value={formData.contact}
                        onChange={handleInput}
                        />
                        <label>Additional Contact</label>
                        <input 
                        id="contact2" 
                        type="tel" 
                        placeholder='contact'
                        value={formData.contact2}
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
                        disabled
                        style={{color: "grey", border: "none"}}
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
                    <div className={classes.formInput}>
                    <label>Revenue</label>
                        <input 
                        id="revenue" 
                        type="text" 
                        placeholder='revenue'
                        value={formData.revenue}
                        onChange={handleInput}
                        />
                    </div>
                    <div className={classes.formInput}>
                    <label>Reminder Date</label>
                        <input 
                        id ="reminderDate" 
                        type="date" 
                        placeholder='date'
                        value={formData.reminderDate}
                        onChange={handleInput}
                        />
                    </div>
                    <div className={classes.formInput}>
                    <Autocomplete
                        id="category" 
                        options={options}
                        getOptionLabel={(option) => option}
                        value={formData.category}
                        onChange={(event, newValue) =>  
                            setFormData({
                            ...formData,
                            category: newValue,
                          })
                        }
                        renderInput={(params) => <TextField {...params} label="Category" />}
                    />
                    </div>  
                    <div className={classes.formInput}></div>
                    <div className={classes.formInput}>
                        <label>Product</label>
                        <textarea 
                        id="product" 
                        type="textArea" 
                        rows="5" cols="50"  
                        placeholder='product'
                        className={classes.remarksInput}
                        value={formData.product}
                        onChange={handleInput}
                        />
                    </div>
                    <div className={classes.formInput}>
                        <label >Remarks </label>
                        <ul style={{padding: "0"}}>
                         {dataArray.map((data, index) => (
                            <li key={index}>
                             <b>Date: </b> {data.input1}, <b>CRM:</b>{data.input3}, <b>Remarks:</b> {data.input2}
                            </li>
                         ))}
                        </ul>
                        <input id="RemarksDate" className={classes.remarksInput} type="datetime-local"  hidden value={formData.date} placeholder="date"/>
                        <input id="CRM" className={classes.remarksInput} type="text"  hidden value={formData.crm} placeholder="date"/>
                        <textarea id="Remark" className={classes.remarksInput} type="textArea" rows="5" cols="50"   placeholder="remarks" value={inputValue2} onChange={handleInputChange2}/>
                        <div className={classes.remarksButton} onClick={handleRemarkSubmit}>Add</div>
                    </div>  
        
                    <button type="submit" className={classes.sendButton}>Save</button>
                </form>
             </div>
        </div>
    </div>
  ) 
}

export default AddOld