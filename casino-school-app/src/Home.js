import React from "react";
import Navbar from "./Navbar";
import CourseImage from "./CourseImage";

export default function Home() {
  
  const marginStyle = {
    margin: '0',
    padding: '0',
  }
  
  const centerStyle = {
    textAlign: 'center',
  }

    return (
    <div>
      <div style={ marginStyle }>
        <Navbar />
      </div>
      <div style={centerStyle}>
        <h1>Welcome to the Casino Gaming School Online Portal</h1>
        <p>We made it convenient to access our learning material via our online learning portal.</p>
      </div>
      <div style={centerStyle}>
        <h2>Get Started</h2>
        <p>Choose a game to start learning and practicing your skills!</p>
      </div>
      <div>
        <CourseImage />
      </div>

    </div>
  );
}