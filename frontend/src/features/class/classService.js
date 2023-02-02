import axios from "axios";

const PROXY = "http://localhost:5000"

const API_NEW_CLASS_URL = PROXY.concat("/api/classes/create");


// post new class
const newClass = async (classData) => {
  const response = await axios.post(API_NEW_CLASS_URL, classData);
  if (response.data) {
    return response.data;
  }
};


// Put all the function into authService object before exporting
const classService = {
  newClass,
};

export default classService;
