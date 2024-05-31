import NavBar from "./NavBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

const Homescreen = () => {
    const [userName, setUserName] = useState();
    const navigate = useNavigate();

    const handleCreate = () => {
        navigate(`/documents/${uuidV4()}`);
    }

    const handleRedirect = () => {
      navigate(`/documents/${userName}`);
    }
  return (
    <>
      <NavBar />
      <div className="p-12 flex gap-16 justify-center">
        <div className="h-96 w-96 shadow-xl flex flex-col justify-center items-center">
            <img src="create_doc.svg" height={120} width={120} className="my-4"/>
            <h3 className="text-xl font-bold">New Document</h3>
            <button className="border-2 border-gray-500 px-4 py-2 my-4 rounded-md" onClick={handleCreate}>Create</button>
            
        </div>
        <div className="h-96 w-96 shadow-xl flex flex-col justify-center items-center">
            <img src="shared_doc.svg" height={120} width={120} className="my-4"/>
            <h3 className="text-xl font-bold">Shared Document</h3>
            <div>
                <input type="text" className="border-gray outline-none border-2 py-2 mx-2 px-2 rounded-md" value={userName} onChange={(e) => setUserName(e.target.value)}/>
            <button onClick={handleRedirect} className="border-2 border-gray-500 px-4 py-2 my-4 rounded-md">Open</button>
            </div>
            
            
        </div>
      </div>
    </>
  );
};

export default Homescreen;
