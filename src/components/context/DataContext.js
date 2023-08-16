import React, { Component } from 'react'
import { collection, getDocs,doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const DataContext = React.createContext();

export class DataProvider extends Component {
    state = {
        data: [],
        users: [],
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
        const {data,users} = this.state;
        const {handleDelete} = this;
        return (

            <DataContext.Provider 
            value={{data,users,handleDelete}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
    
}
