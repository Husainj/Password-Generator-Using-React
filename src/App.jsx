import { useState, useCallback, useEffect, useRef } from 'react'


function App() {

  //taking all the values which i will be needed to display or the values which aree needed to be changed
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //took the refrence that which text should be selected 
  const passwordRef = useRef(null)

  //usecallback function is used to optimize the code , without using USECALLBACK we can still make this wesite by only using useeffect hook.
  const passgenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword]);


  //function to copy password , here also useCallback is used for optimization only .
  const copyPassword = useCallback(() => {

    //The below line takes refrence of the password wherever it is being displayed and ==> gets highlighted whenever user copies it.
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);

  }, [password])


  // This useEffect hook is used to run the setPassword function whenever any value is changed from the dependency array or page is refreshed.
  useEffect(() => {
    passgenerator();
  }, [length, numberAllowed, charAllowed, setPassword]);



  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button className='focus:ring-2 focus:ring-red-500 hover:text-gray-900' 
            onClick={copyPassword}
          >Copy</button>
        </div>

        <div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input type='range'
                min={6}
                max={100}
                value={length}
                className='cursor-pointer'
                onChange={(e) => { setLength(e.target.value) }}
              />
              <label>Length: {length}</label>
            </div>

            <div className='flex items-center gap-x-1'>
              <input
                type='checkbox'
                id='numberInput'
                defaultChecked={numberAllowed}
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor='numberInput'>Numbers</label>
            </div>

            <div className='flex items-center gap-x-1'>
              <input
                type='checkbox'
                id='charInput'
                defaultChecked={charAllowed}
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor='charInput'>Characters</label>
            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default App
