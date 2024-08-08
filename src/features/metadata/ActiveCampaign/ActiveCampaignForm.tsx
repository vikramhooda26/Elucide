import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { FormItemWrapper } from "../../../components/form/item-wrapper";
import { FormField } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { userAtom } from "../../../store/atoms/user";
import { TActivationFormSchema } from "../../activations/constants/metadata";
import { SingleInputForm } from "../SingleInputForm";
import { activeCampaignFormSchema } from "./constants/metadata";

function ActiveCampaignForm() {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const onSubmit = () => {};

    const user = useRecoilValue(userAtom);

    const navigate = useNavigate();

    const form = useForm<TActivationFormSchema>({
        resolver: zodResolver(activeCampaignFormSchema),
        defaultValues: {
            userId: user?.id,
        },
    });

    useEffect(() => {
        if (isSubmitting) {
            form.control._disableForm(true);
        } else {
            form.control._disableForm(false);
        }
    }, [isSubmitting]);

    return (
        <SingleInputForm
            onSubmit={onSubmit}
            form={form}
            title="Active Campaign"
            isSubmitting={isSubmitting}
        >
            <FormField
                control={form.control}
                name="activationName"
                render={({ field }) => (
                    <FormItemWrapper label="Active Campaign Name">
                        <Input
                            {...field}
                            placeholder="Active Campaign name"
                        />
                    </FormItemWrapper>
                )}
            />
        </SingleInputForm>
    );
}

export default ActiveCampaignForm;
