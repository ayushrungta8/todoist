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

  /*-------------Add Project---------------*/
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

  /*-------------Get Project---------------*/
  const fetchData = async () => {
    let docs = await db.collection("projects").orderBy("createdAt").get();
    const temp = [];
    docs.forEach((record) => {
      temp.push({ ...record.data(), id: record.id });
    });
    setProjectArray(temp);
    temp.length && setSelectedProjectId(temp[0].id);
  };

  /*-------------Delete Project---------------*/
  const deleteProject = async (projectId) => {
    await db.collection("projects").doc(projectId).delete();
    const lists = await db
      .collection("lists")
      .where("projectId", "==", projectId)
      .get();

    lists.forEach((list) => {
      db.collection("lists").doc(list.id).delete();
    });
    const tasks = await db
      .collection("tasks")
      .where("projectId", "==", projectId)
      .get();

    tasks.forEach((task) => {
      db.collection("tasks").doc(task.id).delete();
    });
    await fetchData();
    !(projectArray.length - 1) && window.location.reload();
  };

  /*-------------UseEffect Get Data---------------*/
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Navbar onClick={setSidebarVisibility} sidebarVisible={sidebarVisible} />
      <BodyContainer>
        {sidebarVisible && (
          <Sidebar
            addProject={addProject}
            projectArray={projectArray}
            setProjectArray={setProjectArray}
            selectedProjectId={selectedProjectId}
            setSelectedProjectId={setSelectedProjectId}
            onDelete={deleteProject}
            fetchData={fetchData}
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
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;
const BodyContainer = styled.div`
  display: flex;
  height: calc(100vh - 40px);
  width: 100%;
  /* margin-right: 0; */
`;
export default App;
