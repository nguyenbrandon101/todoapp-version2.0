import React from "react";

export default function Navbar() {
    /* Date function */
    const date = new Date();
    let day = date.getDate();
    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let month = date.getMonth();
    let year = date.getFullYear()
    let currDate = monthNames[month]+"-"+day+"-"+year
    /** */
    console.log(window.innerWidth)
    return (
        <div className="navBar">
            <img src={require('./todoIcon.png')} className ="navIcon"/>
            <h1> Daily Planner</h1>
            <div className="date">
                <h2> Today's Date</h2>
                <h3> {currDate}</h3>
            </div>
        </div>
    )
}