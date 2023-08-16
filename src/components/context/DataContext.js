import React, { Component } from 'react'
import { collection, getDocs,doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const DataContext = React.createContext();

export class DataProvider extends Component {
    state = {
        data: [],
        users: [],
        isAdmin: false,
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
        const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        list.push({id: doc.id, ...doc.data()});
      });
      this.setState({users: list})
      }
      catch(err){
        console.log(err)
      }
    }

    componentDidMount(){
        this.fetch();
        this.fetchUsers();
      //   const userName = JSON.parse(localStorage.getItem('user'));
      

      // const foundObject = this.state.users.find(obj => obj.Name === userName.displayName);

      // if(foundObject){
      //   const admin = foundObject.Role;
      //   console.log(foundObject)
      //   if(admin === "admin"){
      //     this.setState({isAdmin: true})
      //   }
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
        const {handleDelete} = this;
        return (

            <DataContext.Provider 
            value={{data,users,isAdmin,handleDelete}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
    
}
