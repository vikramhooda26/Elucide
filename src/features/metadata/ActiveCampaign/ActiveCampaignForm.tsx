import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { FormItemWrapper } from "../../../components/form/item-wrapper";
import { FormField } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { userAtom } from "../../../store/atoms/user";
import { TActivationFormSchema } from "../../activations/constants/metadata";
import { SingleInputForm } from "../SingleInputForm";
import { activeCampaignFormSchema, TActiveCampaignFormSchema } from "./constants/metadata";
import MetadataService from "../../../services/features/MetadataService";
import { HTTP_STATUS_CODES } from "../../../lib/constants";
import { toast } from "sonner";
import ErrorService from "../../../services/error/ErrorService";
import { useAuth } from "../../auth/auth-provider/AuthProvider";
import { FormSkeleton } from "../../../components/core/form/form-skeleton";

function ActiveCampaignForm() {
  const { logout } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams();

  const user = useRecoilValue(userAtom);

  const navigate = useNavigate();

  const form = useForm<TActiveCampaignFormSchema>({
    resolver: zodResolver(activeCampaignFormSchema),
    defaultValues: {
      userId: user?.id
    }
  });

  useEffect(() => {
    const fetchActiveCampaignDetails = async (id: string) => {
      try {
        setIsLoading(true);
        const response = await MetadataService.getOneActiveCampaign(id);
        if (response.status === HTTP_STATUS_CODES.OK) {
          form.reset({
            activeCampaignName: response.data.activeCampaignName
          });
        }
      } catch (error) {
        const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);
        if (unknownError.response.status === HTTP_STATUS_CODES.NOT_FOUND) {
          toast.error("This active campaign does not exists");
          navigate(-1);
        } else {
          toast.error("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchActiveCampaignDetails(id);
    }
  }, [id]);

  const onSubmit = async (activeCampaignFormValues: TActivationFormSchema) => {
    try {
      setIsSubmitting(true);
      const requestBody = {
        ...activeCampaignFormValues,
        userId: user?.id
      };
      if (id) {
        const response = await MetadataService.editActiveCampign(id, requestBody);
        if (response.status === HTTP_STATUS_CODES.OK) {
          toast.success("Active campaign updated successfully");
        }
        return;
      }
      const response = await MetadataService.createActiveCampaign(requestBody);
      if (response.status === HTTP_STATUS_CODES.OK) {
        toast.success("Active campaign created successfully");
        form.reset({
          activeCampaignName: ""
        });
      }
    } catch (error) {
      console.error(error);
      const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);
      if (unknownError) {
        toast.error("An unknown error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
      isSubmitting={isSubmitting || isLoading}
      isEdit={Boolean(id)}
    >
      {isLoading ? (
        <FormSkeleton />
      ) : (
        <FormField
          control={form.control}
          name="activeCampaignName"
          render={({ field }) => (
            <FormItemWrapper label="Campaign Name">
              <Input {...field} placeholder="Campaign name" />
            </FormItemWrapper>
          )}
        />
      )}
    </SingleInputForm>
  );
}

export default ActiveCampaignForm;
