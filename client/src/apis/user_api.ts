import axios from "axios";
export const signUpUser = async (formData: FormData) => {
  try {
    const { data } = await axios.post("/api/v1/create-user", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
