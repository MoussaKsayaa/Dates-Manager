import {useContext, createContext, useState, useEffect} from "react";

const DataContext = createContext();

export function FetchingDataProvider({children}) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    console.log('data has been fetched')
    fetch("https://mocki.io/v1/38dad93a-b8fb-4275-b6db-aad1be7f7c8a")
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error: " + response.status)
      } else {
          return response.json()
        }
      })
    .then(data => setItems(data))
    .catch(error => console.error(error))
  }, []);

  return (
    <DataContext.Provider value={[items]}>
      {children}
    </DataContext.Provider>
  )
}

export const useFetchingContext = () => useContext(DataContext);