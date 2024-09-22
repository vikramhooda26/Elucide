import React from 'react'

type Props = {
    setToggle: (b: boolean) => void;
    isToggled: boolean;
}
function ToggleButton({ setToggle, isToggled }: Props) {
    return (
        <div onClick={() => setToggle(!isToggled)} className={`h-7 w-16 rounded-xl  flex items-center p-1 border ${!isToggled ? 'bg-primary-foreground border-gray-400 ' : 'bg-primary-foreground border-primary'}`}>
            <div className={` h-5 w-5  rounded-full transition-transform duration-700 ${!isToggled ? ' transform translate-x-0 bg-gray-400  ' : 'transform translate-x-9 bg-primary '} `}>
            </div>
        </div>
    )
}

export default ToggleButton;