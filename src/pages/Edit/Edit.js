import React,{useContext} from 'react';
import classes from './Edit.module.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useState,useEffect } from 'react';
import { addDoc, collection, doc, setDoc,updateDoc,getDoc,get  } from "firebase/firestore"; 
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/context/AuthContext';

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
        address: '',
        city: '',
        pincode: '',
        contact: '',
        email:'',
        product: '',
        remarks:'',
        typeofpurchase: '',
        status: '',
    });
    const [data,setData] = useState([]);
    const [order_id,setOrderID] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataArray, setDataArray] = useState([]);
    const [inputValue2, setInputValue2] = useState('');

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
                    date: res.data().Date,
                    crm: res.data().Crm,
                    source: res.data().Source,
                    enquirytype: res.data().EnquiryType,
                    address: res.data().Address,
                    city: res.data().City,
                    pincode: res.data().Pincode,
                    contact: res.data().Contact,
                    email: res.data().Email,
                    product: res.data().Product,
                    typeofpurchase: res.data().TypeOfPurchase,
                    remarks: res.data().Remarks,
                    status: res.data().Status,
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
        

        try{
            const res = await updateDoc(doc(db, "enquiries",order_id), {
                    ID: order_id,
                    Date: formData.date,
                    Crm: formData.crm,
                    Source: formData.source,
                    EnquiryType: formData.enquirytype,
                    Name: formData.name,
                    Address: formData.address,
                    City: formData.city,
                    Pincode: formData.pincode,
                    Contact: formData.contact,
                    Email: formData.email,
                    Product: formData.product,
                    Revenue: formData.revenue,
                    TypeOfPurchase: formData.typeofpurchase,
                    Remarks: dataArray,
                    Status: formData.status,
                    ReminderDate: formData.reminderDate || null,
              })
              .then(()=>{
                navigate(`/enquiries/${currentUser.displayName}`)
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
            <Navbar/>
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
                            <li key={index}>
                             <b>Date: </b> {data.input1}, <b>CRM:</b>{data.input3}, <b>Remarks:</b> {data.input2}
                            </li>
                         ))}
                        </ul>
                        <input id="RemarksDate" className={classes.remarksInput} type="datetime-local"  hidden value={formData.date} placeholder="date"/>
                        <input id="CRM" className={classes.remarksInput} type="text"  hidden value={formData.crm} placeholder="date"/>
                        <textarea id="Remark" className={classes.remarksInput} type="textArea" rows="4" cols="50" placeholder="remarks" value={inputValue2} onChange={handleInputChange2}/>
                        <div className={classes.remarksButton} onClick={handleRemarkSubmit}>Add</div>
                    </div> 
                    <button type="submit" className={classes.sendButton}>Send</button>
                </form>
             </div>
        </div>
    </div>
  )
}

export default Edit