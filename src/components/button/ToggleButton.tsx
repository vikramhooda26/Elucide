import React from "react";

type Props = {
    setToggle: (b: boolean) => void;
    isToggled: boolean;
};
function ToggleButton({ setToggle, isToggled }: Props) {
    return (
        <div
            onClick={() => setToggle(!isToggled)}
            className={`flex h-7 w-16 items-center rounded-xl border p-1 ${!isToggled ? "border-gray-400 bg-primary-foreground" : "border-primary bg-primary-foreground"}`}
        >
            <div
                className={`h-5 w-5 rounded-full transition-transform duration-700 ${!isToggled ? "translate-x-0 transform bg-gray-400" : "translate-x-9 transform bg-primary"} `}
            ></div>
        </div>
    );
}

export default ToggleButton;
