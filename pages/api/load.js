import { DirectoryLoader } from "langchain/document_loaders";
import { TextLoader, PDFLoader } from "langchain/document_loaders";

export default async function (req, res) {
   const  loader = await new DirectoryLoader("docs",{
    ".txt": (path) => new TextLoader(path),
     ".pdf": (path) => new PDFLoader(path, "text"),
  });
  const docsStored= await loader.load();
  // console.log(docsStored)
  let arr='';
  await docsStored.forEach(element => {
    arr+= element.pageContent;
  });
  res.send(arr)
  }
