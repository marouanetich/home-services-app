export const fetchData = (endpoint, setData) => {
  fetch(`${process.env.REACT_APP_API_BASE_URL}/${endpoint}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    })
    .then(data => setData(data))
    .catch(error => {
      console.error('Error fetching data:', error);
    });
};