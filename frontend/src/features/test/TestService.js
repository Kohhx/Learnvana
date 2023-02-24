import { axiosInstance } from "../../config/axios";
import formatUtil from "../../utilities/FormatUtil";

/**
 * =============================================================================
 * Misc End Points
 * =============================================================================
 */

// Upload photo end point
const uploadPhoto = async (newInstructorProfile, token) => {
  const { instructorId } = newInstructorProfile;

  const newInstructorProfileFD =
    formatUtil.convertObjToFormData(newInstructorProfile);

  const URL = `photo`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const response = await axiosInstance.post(
    URL,
    newInstructorProfileFD,
    config
  );
  if (response.data) {
    return response.data;
  }
};



// Put all the function into authService object before exporting
const testService = {
  uploadPhoto,
};

export default testService;
