import React, { Component } from 'react'
import { collection, getDocs,doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const DataContext = React.createContext();

export class DataProvider extends Component {
    state = {
        data: [],
        users: [],
        isAdmin: JSON.parse(localStorage.getItem("Admin")) 
    };

    async fetch (){
        let list = []
      try{
        const querySnapshot = await getDocs(collection(db, "enquiries"));
      querySnapshot.forEach((doc) => {
        list.push({id: doc.id, ...doc.data()});
      });
      this.setState({data: list})
      
      }
      catch(err){
        console.log(err)
      }
    }

     async fetchUsers() {
      let list = []

      try{
        const querySnapshot =  await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        list.push({id: doc.id, ...doc.data()});
      });
      this.setState({users: list})
      console.log(list) 
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
        this.fetch();
        this.fetchUsers();
    }

    // componentDidUpdate(){
    //   this.fetch();
    //   this.fetchUsers();
    // }


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
        const {handleDelete,checkAdmin} = this;
        return (

            <DataContext.Provider 
            value={{data,users,checkAdmin,isAdmin,handleDelete}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
    
}
