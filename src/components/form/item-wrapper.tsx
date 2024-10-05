import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";

type TFormItemWrapperProps = {
    label?: string;
    children?: React.ReactNode;
};

export const FormItemWrapper: React.FC<TFormItemWrapperProps> = ({ label, children }): JSX.Element => {
    return (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>{children}</FormControl>
            <FormMessage />
        </FormItem>
    );
};
