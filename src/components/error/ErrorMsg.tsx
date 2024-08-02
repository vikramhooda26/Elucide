type Props = { msg: string; show: Boolean }
function ErrorMsg({ msg, show = false }: Props) {
    return (
        <>{show ?
            <span className="text-red-600 text-xs">
                {msg}
            </span>
            : null}
        </>
    )
}

export default ErrorMsg;