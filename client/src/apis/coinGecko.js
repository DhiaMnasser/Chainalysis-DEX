import axios from "axios";

export default axios.create({
  baseURL: "https://chainalysis-dex2.herokuapp.com"
});
