const fetchFromApi = async (url) => {
  const response = await fetch(url);
  const entries = await response.json();
  return entries;
};

export default fetchFromApi;
