import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./styles.css";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ],
};


const CreateDoc = () => {
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState("");

  const { id : documentId } = useParams(); 

  // CREATING WEBSOCKET CONNECTION
  useEffect(() => {
    const s = io(process.env.SERVER_URL);
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  // RECEIVING THE CHANGES FROM SOCKET
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };

    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  // SENDING CHANGES TO WEBSOCKET
  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };

    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  // SENDING DOCUMENT-ID TO WEBSOCKET
  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-document", document => {
      console.log("load-documenttttt",document);
      quill.setContents(document);
      quill.enable();
    })

    // Only sending the document Id to the websocket.
    socket.emit("get-document", documentId);

  }, [socket, quill, documentId])

  // SENDING THE WHOLE CONTENT FOR STORING INTO SUPABASE DATA
  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, 2000);

    return () => {
      clearInterval(interval);
    }

  }, [socket, quill])


  const wrapperRef = useCallback((wrapper) => {
    if (!wrapper) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);

    const q = new Quill(editor, { theme: "snow", modules: modules });
    q.disable();
    q.setText("Loading ...");
    setQuill(q);
  }, []);
 
  return <div id="container" ref={wrapperRef}></div>;
};

export default CreateDoc;
