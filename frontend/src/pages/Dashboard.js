import React from 'react'
import Button from "../components/Button";
import { Link } from "react-router-dom"

const Dashboard = () => {
  return (
    <div>
      <p>dashboard</p>
      <Button secondary rounded><Link to="/classes/new">New class</Link></Button>
    </div>
  )
}

export default Dashboard
