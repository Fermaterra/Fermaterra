import axios from "axios";

const fetchFromApi = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

export default fetchFromApi;
