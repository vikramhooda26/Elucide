import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { toast } from "sonner";
import { FormItemWrapper } from "../../../components/form/item-wrapper";
import { FormField } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { HTTP_STATUS_CODES } from "../../../lib/constants";
import ErrorService from "../../../services/error/ErrorService";
import MetadataService from "../../../services/features/MetadataService";
import { userAtom } from "../../../store/atoms/user";
import { useAuth } from "../../auth/auth-provider/AuthProvider";
import { SingleInputForm } from "../SingleInputForm";
import { tierFormSchema, TTierFormSchema } from "./constants/metadata";
import { FormSkeleton } from "../../../components/core/form/form-skeleton";

function TierForm() {
  const { logout } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams();

  const user = useRecoilValue(userAtom);

  const navigate = useNavigate();

  const form = useForm<TTierFormSchema>({
    resolver: zodResolver(tierFormSchema),
    defaultValues: {
      userId: user?.id
    }
  });

  useEffect(() => {
    const fetchTierDetails = async (id: string) => {
      try {
        setIsLoading(true);
        const response = await MetadataService.getOneTier(id);
        if (response.status === HTTP_STATUS_CODES.OK) {
          form.reset({
            tierName: response.data.tierName
          });
        }
      } catch (error) {
        const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);
        if (unknownError.response.status === HTTP_STATUS_CODES.NOT_FOUND) {
          toast.error("This tier does not exists");
          navigate(-1);
        } else {
          toast.error("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchTierDetails(id);
    }
  }, [id]);

  const onSubmit = async (tierFormValues: TTierFormSchema) => {
    try {
      setIsSubmitting(true);
      const requestBody = {
        ...tierFormValues,
        userId: user?.id
      };
      if (id) {
        const response = await MetadataService.updateTier(id, requestBody);
        if (response.status === HTTP_STATUS_CODES.OK) {
          toast.success("Tier updated successfully");
        }
        return;
      }
      const response = await MetadataService.createTier(requestBody);
      if (response.status === HTTP_STATUS_CODES.OK) {
        toast.success("Tier created successfully");
        form.reset({
          tierName: ""
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
      title="Tier"
      isSubmitting={isSubmitting || isLoading}
      isEdit={Boolean(id)}
    >
      {isLoading ? (
        <FormSkeleton />
      ) : (
        <FormField
          control={form.control}
          name="tierName"
          render={({ field }) => (
            <FormItemWrapper label="Tier name">
              <Input {...field} placeholder="Tier name" />
            </FormItemWrapper>
          )}
        />
      )}
    </SingleInputForm>
  );
}

export default TierForm;
