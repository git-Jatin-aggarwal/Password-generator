import { useCallback, useEffect, useRef, useState } from 'react'


function App() {

  const [length , setLength] = useState(8)
  const [numberAllowed , setNumberAllowed] = useState(false)
  const [charAllowed , setCharAllowed] = useState(false)
  const [password , setPassword] = useState("")
  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(()=>{
    let pass= ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmonpqrstuvwxyz"
    
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*(){}_=<>[]"

    for (let index = 1; index <= length; index++){
      let char  = Math.floor(Math.random() * str.length +1)

      pass += str.charAt(char)
1     
    }

    setPassword(pass)


  } , [length,numberAllowed, charAllowed , password])

  const copyPassword = (()=>{
        window.navigator.clipboard.writeText(password)
  })

    useEffect(()=>{
            passwordGenerator()
    },[length , numberAllowed , charAllowed])

  return (
    
   <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800 py-3 flex flex-col '> <h1 className='text-white text-center my-3'>Password Generator</h1>
   <div className='flex shadow rounded-lg overflow-hidden mb-4'>
    <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly ref={passwordRef} />

    <button onClick={copyPassword} className='outline-none bg-blue-700 hover:bg-blue-400 text-white px-3 py-0.5 shrink-0'>copy</button>
    </div>

    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range" min={6} max={20} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}} />
        <label> length:{length }</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={()=>{
          setNumberAllowed((prev)=>!prev)
        }}/>
         <label htmlFor='numberInput'>Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox" defaultChecked={charAllowed} id="charInput" onChange={()=>{
          setCharAllowed((prev)=>!prev)
        }}/>
         <label htmlFor='charInput'>Characters</label>
      </div>
      
    </div>
    <button className='border-2 px-2 py-1 rounded-xl mt-2 bg-zinc-200 hover:bg-zinc-500' onClick={passwordGenerator}>Generate</button>
   </div>
 
  )
}

export default App
