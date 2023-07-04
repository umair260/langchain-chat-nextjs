import { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios'

export default function Home() {

  const fileInput = useRef();
  const [userInput, setUserInput] = useState("");
  const [history, setHistory] = useState([]);
  const [loadedValue, setloadedValue] = useState("aaa");
  const [loading, setLoading] = useState(false);
  const [loadedData, setloadedData]= useState("default");
  const [messages, setMessages] = useState([
    {
      "message": "Hi there! How can I help?",
      "type": "apiMessage"
    }
  ]);

  const messageListRef = useRef(null);
  const textAreaRef = useRef(null);

  // Auto scroll chat to bottom
  useEffect(() => {
    const messageList = messageListRef.current;
    messageList.scrollTop = messageList.scrollHeight;
  }, [messages]);

  // Focus on text field on load
  useEffect(() => {
    textAreaRef.current.focus();
  }, []);

  // Handle errors
  const handleError = () => {
    setMessages((prevMessages) => [...prevMessages, { "message": "Oops! There seems to be an error. Please try again.", "type": "apiMessage" }]);
    setLoading(false);
    setUserInput("");
  }

  const [loadingLoad, setLoadingLoad] = useState(false);

//Handle form loading
const handleLoad= async (e)=>{ 

  setLoadingLoad(true);
  
 const response = await axios.get('/api/load/');
//  console.log(response.data)
 setloadedData(response.data.arr);
 console.log(response.data.arr)
 setLoadingLoad(false);
 setfile(response.data.arre)

}
  const handleSubmit = async(e) => {
    e.preventDefault();

    if (userInput.trim() === "") {
      return;
    }

    setLoading(true);
    setMessages((prevMessages) => [...prevMessages, { "message": userInput, "type": "userMessage" }]);
  
    // Send user question and history to API
    //const response = await axios.get('/api/chat/');

  const resss= await axios({
    method: 'post',
    url: '/api/chat/',
    data: {
      loadedData,
      userInput,
    }
    });
    console.log(resss.data.text)
    setMessages((prevMessages) => [...prevMessages, { "message": resss.data.text, "type": "apiMessage" }]);
      setLoading(false);
      setUserInput("");
      
    return;    
  };
 
  // Prevent blank submissions and allow for multiline input
  const handleEnter = (e) => {
    if (e.key === "Enter" && userInput) {
      if(!e.shiftKey && userInput) {
        handleSubmit(e);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
    }
    
  };
  const [file, setfile] = useState([]);
  const handleFolderSelect= async (e)=>{
    // await fileInput.current.click();
    // console.log(fileInput)
    const files = fileInput.current.files;
    for(let i = 0; i < files.length; i++) {
      setfile(prevItems => [...prevItems,files[i].name ])
     
    }
  }


  // Keep history in sync with messages
  useEffect(() => {
    if (messages.length >= 3) {
      setHistory([[messages[messages.length - 2].message, messages[messages.length - 1].message]]);
    }
    }, [messages, file])

  return (
    <>
      <Head>
        <title>Talking to CV's</title>
        <meta name="description" content="Talking to CV's" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/cbsol.png" />
      </Head>
      <div className={styles.topnav}>
      <div className = {styles.navlogo}>
    <a href="/">Talking to Documents</a>
    </div>
    
</div>
      <main className={styles.main}>
        <div className={styles.abcd}>
        <div className={styles.load}>
        {file.length!=0 ? <ul className={styles.arrlist}>
            {Array.isArray(file) && file.map((item, index) => <li key={index}>{index+1}- {item}</li>)}
      </ul>: <div style={{marginTop:'30px'}}>
        No Data set Selected
      </div>
        }
        {/* <input style={{display:'none'}} type="file" directory="" webkitdirectory="" ref={fileInput} /> */}
        {/* <button className={styles.loadButton} onClick={ () => { fileInput.current.click(); handleFolderSelect(); console.log('s')} }>Choose Directory</button>
          <button className={styles.loadButton} onClick={handleFolderSelect}>Upload Files</button> */}
      <button className={styles.loadButton} onClick={handleLoad}>

      {loadingLoad ? <div className={styles.loadprogress} ><CircularProgress size={15}/> </div> : 'Load' }

      </button>
        </div>
      <div className = {styles.cloud}>
        <div ref={messageListRef} className = {styles.messagelist}>
        {messages.map((message, index) => {
          return (
            // The latest message sent by the user will be animated while waiting for a response
              <div key = {index} className = {message.type === "userMessage" && loading && index === messages.length - 1  ? styles.usermessagewaiting : message.type === "apiMessage" ? styles.apimessage : styles.usermessage}>
                {/* Display the correct icon depending on the message type */}
                {message.type === "apiMessage" ? <Image src = "/chatgpt.jpeg" alt = "AI" width = "30" height = "30" className = {styles.boticon} priority = {true} /> : <Image src = "/cbsol.png" alt = "Me" width = "30" height = "30" className = {styles.usericon} priority = {true} />}
              <div className = {styles.markdownanswer}>
                {/* Messages are being rendered in Markdown format */}
                <ReactMarkdown linkTarget = {"_blank"}>{message.message}</ReactMarkdown>
                </div>
              </div>
          )
        })}
        </div>
            </div>
            </div>
           <div className={styles.center}>
            
            <div className = {styles.cloudform}>
           <form onSubmit = {handleSubmit}>
          <textarea 
          disabled = {loading}
          onKeyDown={handleEnter}
          ref = {textAreaRef}
          autoFocus = {false}
          rows = {1}
          maxLength = {512}
          type="text" 
          id="userInput" 
          name="userInput" 
          placeholder = {loading? "Waiting for response..." : "Type your question..."}  
          value = {userInput} 
          onChange = {e => setUserInput(e.target.value)} 
          className = {styles.textarea}
          />
            <button 
            type = "submit" 
            disabled = {loading}
            className = {styles.generatebutton}
            >
            {loading ? <div className = {styles.loadingwheel}><CircularProgress color="inherit" size = {20}/> </div> : 
            // Send icon SVG in input field
            <svg viewBox='0 0 20 20' className={styles.svgicon} xmlns='http://www.w3.org/2000/svg'>
            <path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z'></path>
          </svg>}
            </button>
            </form>
            </div>
            
        </div>
      </main>
    </>
  )
}
