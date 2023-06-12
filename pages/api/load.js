import { DirectoryLoader } from "langchain/document_loaders";
import { TextLoader, PDFLoader } from "langchain/document_loaders";
import path, { dirname } from 'path'



export default async function (req, res) {
const tt= [ 'Resume-Umair-Ali.pdf', 'Resume-Umair-Ali.pdf' ];
const alpha= 'Resume-Umair-Ali.pdf';

// if (!tt.includes(alpha)){
//   console.log(true)
// }
// res.send('AA')
// return;
  const dirName = path.dirname("/Users/umair/Documents/CV's/New folder/Zahid's Resume May 2022.pdf");
// console.log(dirName); 
const arre=[];
   const  loader = await new DirectoryLoader(dirName,{
    ".txt": (path) => new TextLoader(path),
     ".pdf": (path) => new PDFLoader(path, "text"),
  });
  const docsStored= await loader.load();
  // console.log(docsStored)
  let arr='';
if(!true){
console.log('hurray')}
  for (let i=0;i<docsStored.length;i++)
  {
    arr+= docsStored[i].pageContent;
    if (arre.includes(path.basename(docsStored[i].metadata.source)))
    {
      console.log('Exists')
    } else{
      arre.push(path.basename(docsStored[i].metadata.source))
    }
  }
console.log(arre)
  // for (let i=0;i<docsStored.length;i++)
  // {
  //   arr+= docsStored[i].pageContent;
  //   console.log(arr);
  //   if(!arre.includes(docsStored[i].metadata.source)){
  //     arre.push(path.basename(docsStored[i].metadata.source))
  //     console.log(i);
  //   } 
  // }



  // await docsStored.forEach(element => {
    

  //   arr+= element.pageContent;
  //   console.log(element.metadata.source)
  // });
  // console.log(arre)
  res.json({
    arr,
    arre})
  }
