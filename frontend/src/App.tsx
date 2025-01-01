import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

type Catagory = {
  id: number;
  name: string;
};

function App() {
  const [catagories, setCatagories] = useState(Array<Catagory>);

  useEffect(() => {
    getExpenseCatagories();
  }, []);

  const getExpenseCatagories = async () => {
    try {
      const response = await axios.get("http://localhost:5294/api/catagories");
      const data = response.data;
      setCatagories(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {catagories.map((c) => (
        <div key={c.id}>{c.name}</div>
      ))}
    </>
  );
}

export default App;
