import { useState } from 'react';
import EyeIcon from './EyeIcon';
import devnotes from '../assets/devnotes.ts';

export default function DevNotes() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='DevNotes'>

      {isOpen && (
        <div className='fixed inset-0 w-screen h-screen bg-black/90 backdrop-blur-sm  p-[2rem] overflow-y-auto'>
          <div className='text-white max-w-3xl px-8 italic tracking-wider' style={{ whiteSpace: 'pre-wrap' }}>{devnotes}</div>
        </div>
      )}

      <div className={`fixed top-0 right-0 w-[5.8rem] h-[5.8rem]  ${!isOpen ? 'bg-black' : ''}`}
        style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%)' }}>
        <div className='absolute top-0 right-0 flex items-center justify-center pt-[1rem] pr-[1rem]'>
          <EyeIcon colour='white'
            width={30}
            height={18}
            onClick={() => setIsOpen(!isOpen)} />
        </div>
      </div>
    </div>
  )
}
