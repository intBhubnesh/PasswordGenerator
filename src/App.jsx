import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
 // length need to be consistetky uodaed ans used throughtout the page with default value 8
  const [length, setLength] = useState(8)
  const [ numberAllowed, setNumberAllowed ] = useState(false);
  const [ charecterAllowed, setCharectedAllowed ] = useState(false);
  const [ password, setPassword ] = useState("")
  const [buttonText, setButtonText ] = useState('copy')


    const copyToClip = useCallback(() => {
        // Task : change the copy text to copied, it should change when any of the dependecy changes -> creat a new callback function
        window.navigator.clipboard.writeText(password)
        setButtonText(() => "copied!")

    }, [password])
    //cache a function definition : optimise the methord for the given set of the dependencies
    const passwordGenerator = useCallback(() => {
        let password = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

        // logic to add the numbers
        if(numberAllowed){
            str = str.concat("123456789")
        }

        // logic if charecter are allowe
        if(charecterAllowed){
            str += "!@#$%^&*()_+=-:'?><,./]}{[`~"
        }

        // logic to generate the password base on the input
        let i = 0
        while(i < length){
            let charIndex = Math.floor(Math.random()*str.length)
            password += str[charIndex]
            i++
        }

        setPassword(password)

    }, [length, numberAllowed, charecterAllowed, setPassword]);

  // event syncronisation : excute the callback function when ever there is a chaneg in any of the dependencies
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charecterAllowed, passwordGenerator]);
  // **here we use the password generator for the optimisation throught the concept of the memonisation - ?


  useEffect(() => {

        // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
        const timeoutId = setTimeout(() => {
            setButtonText(() => 'copy')
        }, 2000);


          // Cleanup function to clear the timeout if the component unmounts
          return () => clearTimeout(timeoutId);


}, [buttonText])
  return (
    <>
        <div className='container overflow-hidden mx-auto mt-4 font-geo'>
            {/* main div */}
            <div className='flex justify-between items-center bg-[linear-gradient(114deg, bg-white/11 -2.84%, bg-white/27 19.84%, bg-white/75 89.74%)] rounded-[40px] pr-6 gap-10 border-4  border-white'>
                {/* right image div */}
                <div className='w-5/6 h-[600px]  bg-cover bg-center rounded-[40px] ' style={{backgroundImage: 'url("/public/assets/Studious Girl with Cat.jpeg")' }} >
                </div>
                {/* left div */}
                <div className='bg-white/90 h-[580px] w-[80%] rounded-[50px] flex flex-col justify-around  items-center'>
                   {/* div-wrapper */}
                   <div className='inline-flex flex-col items-start gap-10'>
                   <div className='flex items-center w-[100%] justify-center'>
                   <h1 className=' text-3xl font-bold mt-12 '>Password Generator</h1>
                   </div>
                    {/* attributes */}
                    <div className='flex flex-col gap-6 items-start text-xl text-zinc-600'>
                        {/* number */}
                        <div className='inline-flex gap-5 items-center'>
                        <input
                        type="checkbox"
                        name="number"
                        defaultChecked={numberAllowed}
                        id="allowedNumber"
                        onChange={() => {
                            setNumberAllowed((prev) => !prev)
                        }}
                        className='size-6 fill-slate-400' />
                        <label htmlFor="numberAllowed">Number</label>
                        </div>

                        {/* Charecter */}
                        <div className='inline-flex gap-5 items-center' >
                        <input
                        type="checkbox"
                        name="charecter"
                        defaultChecked={charecterAllowed}
                        id="charecterAllowed"
                        onChange={() => {
                            setCharectedAllowed((prev) => !prev)
                        }}
                        className='size-6' />
                        <label htmlFor="charecterAllowed">Charecter</label>
                        </div>

                        {/* Symbol */}
                        {/* <div className='inline-flex gap-5 items-center'>
                        <input
                        type="checkbox"
                        name="symbol"
                        defaultChecked={symbolAllowed}
                        id="symbolAllowed"
                        className='size-6'/>
                        <label htmlFor="symbolAllowed">Symbol</label>
                        </div> */}

                    </div>

                    {/* password length */}
                    <div className='text-xl font-medium inline-flex gap-4 '>
                        <label className='w-28 -mr-4 text-zinc-600' htmlFor="length">Length : {length}</label>
                        <input
                        type="range"
                        name="passwordLength"
                        value={length}
                        min={8}
                        max={20}
                        onChange={(e) => {
                            setLength(e.target.value)
                        }}
                        id="lengthInput" />
                    </div>
                   </div>

                    {/* password generator button */}
                    <button
                    onClick={copyToClip}
                    type="copy"
                    defaultValue={buttonText}
                    className='text-3xl font-bold text-black/90  w-[90%] h-[90px] bg-green-300/90 hover:bg-green-300 hover:shadow-md rounded-[30px]'>{buttonText}</button>
                    <div className='h-[120px] w-[95%] rounded-[40px] bg-green-300 bg-opacity-20 relative'>
                        <p className='absolute left-[50px] top-[15px] text-lg text-black/45'>Password</p>
                        <h1  id='password' className='font-pop font-bold text-3xl min-w-[100%] text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>{password}</h1>
                    </div>
                </div>

            </div>
        </div>
    </>
  )
}

export default App
