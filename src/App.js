import logo from "./logo.svg"
import "./App.css"
import toast, { Toaster } from "react-hot-toast"
import { useState } from "react"
import img1 from "./assets/plane_1.png"
import img2 from "./assets/plane_2.png"
import img3 from "./assets/plane_3.png"
import img4 from "./assets/plane_4.png"
import img5 from "./assets/plane_5.png"
function App() {
   const [dragList, setdragList] = useState([img1, img2, img3, img4, img5])
   const [droppedList, setdroppedList] = useState([])

   const dropHandler = (event) => {
      const dropImg = event.dataTransfer.getData("imgUrl")
      console.log(dropImg)
      if (dropImg) {
         setdragList((prev) => prev.filter((e) => e !== dropImg))
         setdroppedList((prev) => [...prev, dropImg])
         toast.success("successfully landed")
      }
   }
   return (
      <div className="App">
         <button
            onClick={() => {
               setdragList([img1, img2, img3, img4, img5])
               setdroppedList([])
            }}
         >
            {" "}
            BACK TO HOME
         </button>
         <div className="main-container">
            <div className="take-on">
               <h3>take off</h3>
               <ul>
                  {dragList.length > 0 &&
                     dragList.map((e, index) => {
                        return (
                           <li
                              draggable
                              onDragStart={(event) => {
                                 event.dataTransfer.setData("imgUrl", e)
                                 event.dataTransfer.dropEffect = "dragging"
                              }}
                              key={index}
                           >
                              <img width="100" height="100" src={e} alt="plane-img" />
                           </li>
                        )
                     })}
               </ul>
            </div>
            <div className="landing" dropable="true" onDrop={dropHandler} onDragOver={(e) => e.preventDefault()}>
               <h3>landing</h3>
               <ul>
                  {droppedList.length > 0 &&
                     droppedList.map((e, index) => {
                        return (
                           <li key={index}>
                              <img width="100" height="100" src={e} alt="plane-img" />
                           </li>
                        )
                     })}
               </ul>
            </div>
            <Toaster />
         </div>
      </div>
   )
}

export default App
