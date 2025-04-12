interface EyeIconProps {
  colour?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
}

export default function EyeIcon({ colour = 'black', width = 100, height = 60, onClick }: EyeIconProps) {
  return (
    <div onClick={onClick}>
      <svg width={width} height={height} viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg"
        className='cursor-pointer hover:scale-110 transition-all duration-300 active:scale-90'
      >
        <path fill-rule="evenodd" clip-rule="evenodd" d="M100 29.6875C100 33.2031 80.2734 59.375 50 59.375C19.7266 59.375 0 33.3984 0 29.6875C0 25.9766 19.4336 0 50 0C80.5664 0 100 26.1719 100 29.6875ZM71.4844 29.6875C71.4844 41.553 61.8655 51.1719 50 51.1719C38.1345 51.1719 28.5156 41.553 28.5156 29.6875C28.5156 17.822 38.1345 8.20312 50 8.20312C61.8655 8.20312 71.4844 17.822 71.4844 29.6875ZM50 40.8203C56.1485 40.8203 61.1328 35.836 61.1328 29.6875C61.1328 23.539 56.1485 18.5547 50 18.5547C43.8515 18.5547 38.8672 23.539 38.8672 29.6875C38.8672 35.836 43.8515 40.8203 50 40.8203Z" fill={colour} />
      </svg>
    </div>
  )
}
