import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";

type Props = {
    show: boolean;
    route: string;
};
function EditButton({ show, route }: Props) {
    const navigate = useNavigate();
    return (
        <>
            {show ? (
                <Button size="sm" onClick={() => navigate(`${route}`)}>
                    <Pencil className="h-4 w-4" />{" "}
                </Button>
            ) : null}
        </>
    );
}

export default EditButton;
