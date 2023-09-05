import React, { useEffect, useState } from 'react';
import classes from './Widget.module.css';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Widget = ({type, closedData,activeData, soldData,list,activeRevenue,soldRevenue,closedRevenue}) => {
    let data;

        switch(type){
            case "active":
                data={
                    title: "ACTIVE ENQUIRIES",
                    count: `${activeData.length}`,
                    link: "See all orders",
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
                    title: "SOLD ENQUIRIES",
                    count: `${soldData.length}`,
                    link: "See all orders",
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
                        title: "CLOSED ENQUIRIES",
                        count: `${closedData.length}`,
                        link: "See all orders",
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
                            title: "TOTAL ENQUIRIES",
                            count: `${list.length}`,
                            link: "",
                            icon: <AddCircleIcon 
                            className={classes.icon} 
                            style={{
                                color: "blue",
                                backgroundColor:"rgb(188, 228, 255)"
                            }}/>,
                        };
                        break;
                        case "revenueGenerated":
                        data={
                            title: "REVENUE GENERATED",
                            count: `${soldRevenue}`,
                            link: "",
                            icon: <AddCircleIcon 
                            className={classes.icon} 
                            style={{
                                color: "blue",
                                backgroundColor:"rgb(188, 228, 255)"
                            }}/>,
                        };
                        break;
                        case "revenueMissed":
                        data={
                            title: "REVENUE MISSED",
                            count: `${closedRevenue}`,
                            link: "",
                            icon: <AddCircleIcon 
                            className={classes.icon} 
                            style={{
                                color: "blue",
                                backgroundColor:"rgb(188, 228, 255)"
                            }}/>,
                        };
                        break;
                        case "revenueExpected":
                        data={
                            title: "REVENUE EXPECTED",
                            count: `${activeRevenue}`,
                            link: "",
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

        </div>
        <div className={classes.right}>
            <div className={classes.percentage}>
               {data.percent}
            </div>
        </div>
    </div>
  )
}

export default Widget