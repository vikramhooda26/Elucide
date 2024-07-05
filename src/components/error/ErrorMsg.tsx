import React from 'react'

type Props = { msg: string; }
function ErrorMsg({ msg }: Props) {
    return (
        <span className="text-red-600 text-xs">
            {msg}
        </span>
    )
}

export default ErrorMsg;