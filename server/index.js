const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
const { db } = require("./drizzle/db");
const { documentTable } = require("./drizzle/schema");
const { eq } = require("drizzle-orm");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabaseURL = process.env.SUPABASE_URL;
const supabaseKEY = process.env.SUPABASE_ANON_KEY;

if (!supabaseURL || !supabaseKEY)
  throw new Error("Supabase URL or API key not defined");
const supabase = createClient(supabaseURL, supabaseKEY);

const io = require("socket.io")(8080, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connected in the server side");
  socket.on("get-document", async (documentId) => {
    const doc = await findorCreateDocument(documentId);
    socket.join(documentId);

    // pre-fill the content in the document with previous data
    socket.emit("load-document", doc[0]["data"]);

    // send document changes to only document Id Room
    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    // save document in supabase after every 2 seconds (timeinterval)
    socket.on("save-document", async (completeData) => {
      await db.update(documentTable).set({data : completeData}).where(eq(documentId, documentTable.id))
    });
  });
});

async function findorCreateDocument(docId){
    if (docId == null) return;

    const doc = await db.select().from(documentTable).where(eq(documentTable.id, docId));
    console.log("Document Found",doc.length);
    if (doc.length > 0) return doc;
    
    await db.insert(documentTable).values({id: docId, data : {}});
    
    const newDoc = [{id: docId, data : {}}];
    return newDoc;

}
