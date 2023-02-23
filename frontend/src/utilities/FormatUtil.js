/**
 * =============================================================================
 * Format Utilities
 * =============================================================================
 */

// Make utility function to convert JSON to formdata
const convertObjToFormData = (obj) => {
  let formData = new FormData();
  for (let key in obj) {
    console.log("Key", key);
    console.log("Value", obj[key]);
    formData.append(key, obj[key]);
  }

  return formData;
};











/**
 * =============================================================================
 * Export
 * =============================================================================
 */

const formatUtil = {
  convertObjToFormData,
}

export default formatUtil;
