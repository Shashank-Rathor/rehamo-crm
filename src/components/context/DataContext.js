import React, { Component } from 'react'
import { collection, getDocs,doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const DataContext = React.createContext();

export class DataProvider extends Component {
    state = {
        data: JSON.parse(localStorage.getItem("data")) ,
        users: [],
        shouldFetch: true,
        isAdmin: JSON.parse(localStorage.getItem("Admin")) 
    };

     fetch = async() => {
        let list = []
      try{
        const querySnapshot = await getDocs(collection(db, "enquiries"));
      querySnapshot.forEach((doc) => {
        list.push({id: doc.id, ...doc.data()});
      });
      this.setState({data: list.reverse()});
      this.setState({shouldFetch: false});
      const jsonData = JSON.stringify(list);
      localStorage.setItem('data', jsonData);
      console.log("run function")
      }
      catch(err){
        console.log(err)
      }
    }

    addNewData = async(data) => {
      const currentData = JSON.parse(localStorage.getItem("data")) 
      const newdata = [data,...currentData]
      const jsonData = JSON.stringify(newdata);
      localStorage.setItem('data', jsonData);
      this.setState((prevState) => ({
        data: [data,...prevState.data]
      }))
    }

    editData = async(data) => {
      const currentData = JSON.parse(localStorage.getItem("data")); 
      const index = currentData.findIndex((item) => item.ID === data.ID)
      currentData[index] = data;
      const jsonData = JSON.stringify(currentData);
      localStorage.setItem('data', jsonData);
      this.setState({data: currentData})
    }


    fetchUsers = async() => {
      let list = []

      try{
        const querySnapshot =  await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        list.push({id: doc.id, ...doc.data()});
      });
      this.setState({users: list})
    }
      catch(err){
        console.log(err)
      }
    }

     checkAdmin = (email) => {
      const foundObject = this.state.users.find(obj => obj.Email === email);
      if(foundObject){
      if(foundObject.Role === "admin"){
        this.setState({isAdmin: true})
        localStorage.setItem("Admin", JSON.stringify(true))
      }
      else{
        this.setState({isAdmin: false})
        localStorage.setItem("Admin", JSON.stringify(false))

      }
    }
    }

    componentDidMount(){
        this.fetchUsers();
    }


    handleLoginData = async() => {
      this.fetch();
    }

    handleDelete = async(id) =>{
        try{
          console.log(id)
          await deleteDoc(doc(db, "enquiries", id));
          this.setState({data: this.state.data.filter((item) => item.id !== id)})
        }
        catch(err){
          console.log(err)
        }
    }

    render(){
        const {data,users,isAdmin} = this.state;
        const {handleDelete,checkAdmin,addNewData,editData,handleLoginData} = this;
        return (

            <DataContext.Provider 
            value={{data,users,checkAdmin,isAdmin,handleDelete,addNewData,editData,handleLoginData}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
    
}
