import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { toast } from "sonner";
import { FormSkeleton } from "../../../components/core/form/form-skeleton";
import { FormItemWrapper } from "../../../components/form/item-wrapper";
import { FormField } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { HTTP_STATUS_CODES } from "../../../lib/constants";
import ErrorService from "../../../services/error/ErrorService";
import MetadataService from "../../../services/features/MetadataService";
import { userAtom } from "../../../store/atoms/user";
import { useAuth } from "../../auth/auth-provider/AuthProvider";
import { SingleInputForm } from "../SingleInputForm";
import { associationSchema, TAssociationSchema } from "./constants/metadata";

function AssociationLevelForm() {
  const { logout } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams();

  const user = useRecoilValue(userAtom);

  const navigate = useNavigate();

  const form = useForm<TAssociationSchema>({
    resolver: zodResolver(associationSchema),
    defaultValues: {
      userId: user?.id
    }
  });

  useEffect(() => {
    const fetchAssociationLevelDetails = async (id: string) => {
      try {
        setIsLoading(true);
        const response = await MetadataService.getOneAssociationLevel(id);
        if (response.status === HTTP_STATUS_CODES.OK) {
          form.reset({
            associationLevelName: response.data.associationLevelName
          });
        }
      } catch (error) {
        const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);
        if (unknownError.response.status === HTTP_STATUS_CODES.NOT_FOUND) {
          toast.error("This association level does not exists");
          navigate(-1);
        } else {
          toast.error("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchAssociationLevelDetails(id);
    }
  }, [id]);

  const onSubmit = async (associationLevelFormValues: TAssociationSchema) => {
    try {
      setIsSubmitting(true);

      const requestBody = {
        ...associationLevelFormValues,
        userId: user?.id
      };

      if (id) {
        const response = await MetadataService.editAssociationLevel(id, requestBody);

        if (response.status === HTTP_STATUS_CODES.OK) {
          toast.success("Association level updated successfully");
        }
        return;
      }

      const response = await MetadataService.createAssociationLevel(requestBody);

      if (response.status === HTTP_STATUS_CODES.OK) {
        toast.success("Association level created successfully");
        form.reset({
          associationLevelName: ""
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
      title="Association Level"
      isSubmitting={isSubmitting || isLoading}
      isEdit={Boolean(id)}
    >
      {isLoading ? (
        <FormSkeleton />
      ) : (
        <FormField
          control={form.control}
          name="associationLevelName"
          render={({ field }) => (
            <FormItemWrapper label="Association level name">
              <Input {...field} placeholder="Association level name" />
            </FormItemWrapper>
          )}
        />
      )}
    </SingleInputForm>
  );
}

export default AssociationLevelForm;
