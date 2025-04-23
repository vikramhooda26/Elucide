import { Control, FieldValues, Path } from "react-hook-form";
import { CardWrapper } from "../../card/card-wrapper";
import { FormItemWrapper } from "../../form/item-wrapper";
import { PhoneInput } from "../../phone-input";
import { FormField } from "../../ui/form";
import { Input } from "../../ui/input";
import SelectBox from "../../ui/multi-select";
import { Resp } from "../../../services/AjaxService";
import { ZodObject } from "zod";
import { InputDrawer } from "../../form/input-drawer";
import { PlusCircle } from "lucide-react";
import { TRoles } from "../../../lib/constants";
import { useUser } from "../../../hooks/useUser";

export type TDisplayFields<T> =
  | {
      showAddButton: true;
      register: Path<T>;
      type: "DROPDOWN" | "INPUT" | "PHONE";
      options?: any[];
      multiple?: boolean;
      input?: {
        type: string;
      };
      placeholder?: string;
      title?: string;
      createFn: (params: any) => Promise<Resp>;
      fetchMetadataFn: () => Promise<void>;
      drawerRegister: string;
      schema: ZodObject<any>;
      accessLevel: TRoles[];
    }
  | {
      showAddButton?: false;
      register: Path<T>;
      type: "DROPDOWN" | "INPUT" | "PHONE";
      options?: any[];
      multiple?: boolean;
      input?: {
        type: string;
      };
      placeholder?: string;
      title?: string;
      createFn?: never;
      fetchMetadataFn?: never;
      drawerRegister?: never;
      schema?: never;
    };

type TVerticalFieldsCardProps<T extends FieldValues> = {
  title: string;
  displayFields: TDisplayFields<T>[];
  control: Control<T>;
};

export const VerticalFieldsCard = <T extends FieldValues>({
  title,
  displayFields,
  control
}: TVerticalFieldsCardProps<T>): JSX.Element => {
  const userRole = useUser()?.role;
  return (
    <CardWrapper title={title}>
      <div className="grid gap-6">
        {displayFields?.map((fieldDetails, index) => (
          <div className="grid gap-3" key={index}>
            <FormField
              control={control}
              name={fieldDetails.register}
              render={({ field }) => (
                <FormItemWrapper label={fieldDetails.title}>
                  <>
                    {fieldDetails.type === "DROPDOWN" && (
                      <div className="flex w-full items-center gap-3">
                        <SelectBox
                          options={fieldDetails.options || []}
                          className="w-full"
                          value={field.value}
                          onChange={field.onChange}
                          placeholder={`Select ${fieldDetails.title?.toLowerCase()}`}
                          inputPlaceholder={`Search for ${fieldDetails.title?.toLowerCase()}...`}
                          emptyPlaceholder={`No ${fieldDetails.title?.toLowerCase()} found`}
                          multiple={fieldDetails.multiple}
                        />
                        {fieldDetails.showAddButton && fieldDetails.accessLevel.some((role) => role === userRole) && (
                          <InputDrawer
                            title={fieldDetails.title || ""}
                            description={`Create a new ${fieldDetails.title} to add to the dropdown`}
                            register={fieldDetails.drawerRegister}
                            schema={fieldDetails.schema}
                            createFn={fieldDetails.createFn}
                            fetchMetadataFn={fieldDetails.fetchMetadataFn}
                          >
                            <PlusCircle className="size-5 cursor-pointer text-green-500" />
                          </InputDrawer>
                        )}
                      </div>
                    )}
                    {fieldDetails.type === "INPUT" && (
                      <Input {...field} type={fieldDetails.input?.type} placeholder={fieldDetails.placeholder} />
                    )}
                    {fieldDetails.type === "PHONE" && <PhoneInput {...field} defaultCountry="IN" />}
                  </>
                </FormItemWrapper>
              )}
            />
          </div>
        ))}
      </div>
    </CardWrapper>
  );
};
