import React,{useContext} from 'react';
import classes from './Edit.module.css';
import Sidebar from '../../components/sidebar/Sidebar';
import { useState,useEffect } from 'react';
import { doc,updateDoc,getDoc,get  } from "firebase/firestore"; 
import { DataContext } from '../../components/context/DataContext';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/context/AuthContext';
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
  const sourceoptions = [
    'Select',
    'Web Search',
    'Old Client',
    'Word Of Mouth',
    'Generated',
    'General',
    'Deepak Bafna',
    'Sunil Bafna',
    'Mahaveer',
    'Abinash',
    'Naveen',
    'Indiamart',
    "PSSPL",
  ];

const Edit = () => {
    
    const navigate = useNavigate();
    const {currentUser} = useContext(AuthContext);
    
    const [formData, setFormData] = useState({
        id:'',
        date: '',
        reminderDate:'',
        crm:'',
        source:'',
        enquirytype:'',
        name: '',
        companyname:'',
        gst:'',
        address: '',
        city: '',
        pincode: '',
        contact: '',
        contact2: '',
        email:'',
        category: '',
        product: '',
        remarks:'',
        typeofpurchase: '',
        status: '',
        reasonforclosing: ''
    });
    const [data,setData] = useState([]);
    const [order_id,setOrderID] = useState("");
   
    const [dataArray, setDataArray] = useState([]);
    const [inputValue2, setInputValue2] = useState('');
    const {editData} = useContext(DataContext);

    var id='';

    useEffect(() => {
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
          setOrderID(id)
          
          const docRef = doc(db, "enquiries", id);
           
          return getDoc(docRef)
          .then((res) =>{
            if(res){
                setData(res.data())
                setFormData({
                    name: res.data().Name,
                    companyname: res.data().CompanyName,
                    gst: res.data().GST,
                    date: res.data().Date,
                    crm: res.data().Crm,
                    source: res.data().Source,
                    enquirytype: res.data().EnquiryType,
                    address: res.data().Address,
                    city: res.data().City,
                    pincode: res.data().Pincode,
                    contact: res.data().Contact,
                    contact2: res.data().Contact2,
                    email: res.data().Email,
                    category: res.data().Category,
                    product: res.data().Product,
                    typeofpurchase: res.data().TypeOfPurchase,
                    remarks: res.data().Remarks,
                    status: res.data().Status,
                    reasonforclosing: res.data().Reasonforclosing,
                    reminderDate: res.data().ReminderDate,
                    revenue: res.data().Revenue,
                })
                setDataArray(res.data().Remarks)
            }
          })
          }
          fetchData();
          console.log(data)
      },[]);

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
        
        const data = {
            ID: order_id,
            id: order_id,
            Date: formData.date,
            Crm: formData.crm,
            Source: formData.source,
            EnquiryType: formData.enquirytype,
            Name: formData.name,
            CompanyName: formData.companyname || null,
            GST: formData.gst || null,
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
            Reasonforclosing: formData.reasonforclosing || null,
            ReminderDate: formData.reminderDate || null,
      }
        try{
            const res = await updateDoc(doc(db, "enquiries",order_id), data)
              .then(()=>{
                alert("Edited")
                editData(data);
                navigate(`/enquiries/${currentUser.displayName.replace(/\s/g, '')}`)
              })
        }
        catch(err){
            console.log(err)
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
             <h1>Edit Enquiry</h1></div>
             <div className={classes.bottom}>
             
                <form onSubmit={handleAdd}>
                <div className={classes.formInput}>
                        <label>Date</label>
                        <input 
                        disabled    
                        id ="date" 
                        type="datetime-local" 
                        placeholder='date'
                        value={formData.date}
                        style={{color: "grey", border: "none"}}
                        />
                    </div>
                    <div className={classes.formInput}>
                        <label>CRM</label>
                        <input 
                        type="text"
                        id="crm" 
                        name="crm"
                        value={formData.crm}
                        disabled
                        style={{color: "grey", border: "none"}}
                        >
                        </input>
                    </div>
                    {/* <div className={classes.formInput}>
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
                    </div> */}
                    <div className={classes.formSelection}>
                    <Autocomplete
                        id="source" 
                        options={sourceoptions}
                        getOptionLabel={(sourceoption) => sourceoption}
                        value={formData.source}
                        onChange={(event, newValue) =>  
                            setFormData({
                            ...formData,
                            source: newValue,
                          })
                        }
                        renderInput={(params) => <TextField {...params} label="Source" />}
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
                        onChange={handleInput}
                        />
                    </div>
                    <div className={classes.formInput}>
                        <label>Company Name</label>
                        <input 
                        id="companyname" 
                        type="text" 
                        placeholder='company name'
                        value={formData.companyname}
                        onChange={handleInput}
                        />
                    </div>
                    <div className={classes.formInput}>
                        <label>GST</label>
                        <input 
                        id="gst" 
                        type="text" 
                        placeholder='gst'
                        value={formData.gst}
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
                        <label>City</label>
                        <input 
                        id="city" 
                        type="text" 
                        placeholder='city'
                        value={formData.city}
                        onChange={handleInput}
                        />
                    </div>
                    <div className={classes.formInput}>
                        <label>Pincode</label>
                        <input 
                        id="pincode" 
                        type="number" 
                        placeholder='pincode'
                        value={formData.pincode}
                        onChange={handleInput}
                        />
                    </div>
                    <div className={classes.formContact} >
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
                            <option value="NA">NA</option>
                            <option value="Information">Information</option>
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
                        <label>Reason for Closing</label>
                        <select 
                        id="reasonforclosing" 
                        name="reasonforclosing"
                        value={formData.reasonforclosing}
                        onChange={handleInput}
                        >
                            <option value="default">Select</option>
                            <option value="Out of Stock">Out of Stock</option>
                            <option value="Not our product">Not our product</option>
                            <option value="Costly">Costly</option>
                            <option value="Quick delivery">Quick delivery</option>
                            <option value="No response">No response</option>
                            <option value="Others">Others</option>
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
                    <div className={classes.formSelection}>
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
                    <div className={classes.formInput}>
                        <label>Product</label>
                        <textarea 
                        id="product" 
                        type="textArea" 
                        placeholder='product'
                        className={classes.remarksInput}
                        rows="5" cols="50"
                        value={formData.product}
                        onChange={handleInput}
                        />
                    </div>
                    <div className={classes.formInput}>
                        <label >Remarks</label>
                        <ul style={{paddingLeft: "0px",marginTop: "10px"}}>
                         {dataArray.map((data, index) => (
                            <li key={index} className={classes.remarksDateTime}>
                             <b>Date: </b> {data.input1}, <b>CRM:</b>{data.input3}, <b>Remarks:</b> {data.input2}
                            </li>
                         ))}
                        </ul>
                        <input id="RemarksDate" className={classes.remarksInput} type="datetime-local"  hidden value={formData.date} placeholder="date"/>
                        <input id="CRM" className={classes.remarksInput} type="text"  hidden value={formData.crm} placeholder="date"/>
                        <textarea id="Remark" className={classes.remarksInput} type="textArea" rows="4" cols="50" placeholder="remarks" value={inputValue2} onChange={handleInputChange2}/>
                        <div className={classes.remarksButton} onClick={handleRemarkSubmit}>Add</div>
                    </div> 
                    <button type="submit" className={classes.sendButton}>Save</button>
                </form>
             </div>
        </div>
    </div>
  )
}

export default Edit