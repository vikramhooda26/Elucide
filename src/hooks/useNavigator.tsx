import { useNavigate } from "react-router-dom";

function useNavigator() {
  const navigate = useNavigate();

  const navigator = (route: string, params: string[] = [], query: Record<string, string | number | boolean> = {}) => {
    const urlParams = params.length > 0 ? params.join("/") : "";
    const urlQuery = new URLSearchParams(query as Record<string, string>);
    const search = urlQuery.toString();
    const url = `${route}${urlParams ? `/${urlParams}` : ""}${search ? `?${search}` : ""}`;

    navigate(url);
  };

  return navigator;
}

export default useNavigator;
