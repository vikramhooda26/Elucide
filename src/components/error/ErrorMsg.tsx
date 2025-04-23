type Props = { msg: string; show: Boolean };
function ErrorMsg({ msg, show = false }: Props) {
  return <>{show ? <span className="text-xs text-red-600">{msg}</span> : null}</>;
}

export default ErrorMsg;
