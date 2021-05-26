import { useEffect, useState } from "react";
import styled from "styled-components";
import ListContainer from "./components/lists/ListContainer";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import db from "./firebase";

function App() {
  const [sidebarVisible, setSidebarVisibility] = useState(true);
  const [projectArray, setProjectArray] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState();

  const addProject = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newData = {
      text: formData.get("AddProject"),
      createdAt: Date.now(),
    };
    const newDoc = await db.collection("projects").add(newData);
    newData.id = newDoc.id;
    const temp = [...projectArray, newData];
    setProjectArray(temp);
    e.target.reset();
    setSelectedProjectId(newDoc.id);
    console.log(temp);
  };

  useEffect(() => {
    const fetchData = async () => {
      let docs = await db.collection("projects").orderBy("createdAt").get();
      const temp = [];
      docs.forEach((record) => {
        temp.push({ ...record.data(), id: record.id });
      });
      setProjectArray(temp);
      temp.length && setSelectedProjectId(temp[0].id);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <Navbar onClick={setSidebarVisibility} sidebarVisible={sidebarVisible} />
      <BodyContainer>
        {sidebarVisible && (
          <Sidebar
            addProject={addProject}
            projectArray={projectArray}
            setProjectArray={setProjectArray}
            selectedProjectId={selectedProjectId}
            setSelectedProjectId={setSelectedProjectId}
          />
        )}
        <ListContainer
          addProject={addProject}
          projectArray={projectArray}
          setProjectArray={setProjectArray}
          selectedProjectId={selectedProjectId}
          setSelectedProjectId={setSelectedProjectId}
        />
      </BodyContainer>
    </div>
  );
}
const BodyContainer = styled.div`
  display: flex;
  height: calc(100vh - 40px);
  width: 100vw;
`;
export default App;
