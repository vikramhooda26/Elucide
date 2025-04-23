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
import { countryFormSchema, TCountryFormSchema } from "./constants/metadata";
import { FormSkeleton } from "../../../components/core/form/form-skeleton";

function CountryForm() {
  const { logout } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams();

  const user = useRecoilValue(userAtom);

  const navigate = useNavigate();

  const form = useForm<TCountryFormSchema>({
    resolver: zodResolver(countryFormSchema),
    defaultValues: {
      userId: user?.id
    }
  });

  useEffect(() => {
    const fetchNationalityDetails = async (id: string) => {
      try {
        setIsLoading(true);
        const response = await MetadataService.getOneNationality(id);
        if (response.status === HTTP_STATUS_CODES.OK) {
          form.reset({
            nationality: response.data.nationalityName
          });
        }
      } catch (error) {
        const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);
        if (unknownError.response.status === HTTP_STATUS_CODES.NOT_FOUND) {
          toast.error("This nationality does not exists");
          navigate(-1);
        } else {
          toast.error("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchNationalityDetails(id);
    }
  }, [id]);

  const onSubmit = async (countryFormValues: TCountryFormSchema) => {
    try {
      setIsSubmitting(true);
      const requestBody = {
        ...countryFormValues,
        userId: user?.id
      };
      if (id) {
        const response = await MetadataService.editNationality(id, requestBody);
        if (response.status === HTTP_STATUS_CODES.OK) {
          toast.success("Country updated successfully");
        }
        return;
      }
      const response = await MetadataService.createNationality(requestBody);
      if (response.status === HTTP_STATUS_CODES.OK) {
        toast.success("Country created successfully");
        form.reset({
          nationality: ""
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
      title="Country"
      isSubmitting={isSubmitting || isLoading}
      isEdit={Boolean(id)}
    >
      {isLoading ? (
        <FormSkeleton />
      ) : (
        <FormField
          control={form.control}
          name="nationality"
          render={({ field }) => (
            <FormItemWrapper label="Country name">
              <Input {...field} placeholder="Country name" />
            </FormItemWrapper>
          )}
        />
      )}
    </SingleInputForm>
  );
}

export default CountryForm;
