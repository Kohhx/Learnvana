import React from 'react'
import Input from "../components/Input";

const New = () => {
  return (
    <div>
      <form>

        <Input type="text" label="Email" placeholder="Enter email" errorMessage="Please enter a valid email"></Input>
      </form>
    </div>
  )
}

export default New
