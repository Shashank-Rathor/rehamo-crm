import React from 'react';
import classes from './Edit.module.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useState,useEffect } from 'react';
import { addDoc, collection, doc, setDoc,updateDoc,getDoc,get  } from "firebase/firestore"; 
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/modal/Modal';
import AddBoxIcon from '@mui/icons-material/AddBox';

const Edit = () => {
    
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
    const [data,setData] = useState([]);
    const [order_id,setOrderID] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataArray, setDataArray] = useState([]);

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
                    contact: res.data().Contact,
                    email: res.data().Email,
                    product: res.data().Product,
                    typeofpurchase: res.data().TypeOfPurchase,
                    remarks: res.data().Remarks,
                    status: res.data().Status,
                })
                setDataArray(res.data().Remarks)
            }
          })
          }
          fetchData();
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
                    Contact: formData.contact,
                    Email: formData.email,
                    Product: formData.product,
                    TypeOfPurchase: formData.typeofpurchase,
                    Remarks: dataArray,
                    Status: formData.status,
                    
              })
              .then(()=>{
                navigate("/enquiries")
              })
        }
        catch(err){
            console.log(err)
        }
    
    }
    
    const handleModalOpen = () => {
        setIsModalOpen(true);
      };
    
      const handleModalClose = () => {
        setIsModalOpen(false);
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
             <Modal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    onSubmit={handleDataSubmit}
                    />
                <form onSubmit={handleAdd}>
                <div className={classes.formInput}>
                        <label>Date</label>
                        <input 
                        disabled    
                        id ="date" 
                        type="date" 
                        placeholder='date'
                        value={formData.date}
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
                        <label >Remarks <AddBoxIcon style={{cursor: "pointer"}} onClick={handleModalOpen}/></label>
                        <ul style={{paddingLeft: "0px",marginTop: "10px"}}>
                         {dataArray.map((data, index) => (
                            <li key={index}>
                             <b>Date: </b> {data.input1}, <b>Remarks:</b> {data.input2}
                            </li>
                         ))}
                        </ul>
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

export default Edit