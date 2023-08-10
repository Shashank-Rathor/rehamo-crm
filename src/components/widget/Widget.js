import React from 'react';
import classes from './Widget.module.css';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Widget = ({type}) => {
    let data;


        switch(type){
            case "active":
                data={
                    title: "ACTIVE",
                    count: "100",
                    link: "See all orders",
                    percent:"15%",
                    icon: <ContactSupportIcon 
                    className={classes.icon} 
                    style={{
                        color: "orange",
                        backgroundColor: "rgb(255, 225, 168)"
                    }}/>,
                };
                break;
                case "sold":
                data={
                    title: "SOLD",
                    count: "120",
                    link: "See all orders",
                    percent:"20%",
                    icon: <CheckCircleIcon 
                    className={classes.icon} 
                    style={{
                        color: "green",
                        backgroundColor:"rgb(175, 255, 175)"
                    }}/>,
                };
                break;
                case "closed":
                    data={
                        title: "CLOSED",
                        count: "200",
                        link: "See all orders",
                        percent:"30%",
                        icon: <CancelIcon 
                        className={classes.icon} 
                        style={{
                            color: "red",
                            backgroundColor:"rgb(255, 178, 178)"
                        }}/>,
                    };
                    break;
                    case "total":
                        data={
                            title: "TOTAL",
                            count: "420",
                            link: "See all orders",
                            icon: <AddCircleIcon 
                            className={classes.icon} 
                            style={{
                                color: "blue",
                                backgroundColor:"rgb(188, 228, 255)"
                            }}/>,
                        };
                        break;
                default:
                    break;
        }

  return (
    <div className={classes.widget}>
        <div className={classes.left}>
            <span className={classes.title}>{data.title}</span>
            <span className={classes.counter}>{data.count}</span>
            <span className={classes.link}>{data.link}</span>

        </div>
        <div className={classes.right}>
            <div className={classes.percentage}>
               {data.percent}
            </div>
            {data.icon}
        </div>
    </div>
  )
}

export default Widget