import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CardWrapper } from "../../components/card/card-wrapper";
import Loader from "../../components/Loader";
import { Button } from "../../components/ui/button";
import { Form } from "../../components/ui/form";

type TSingleInputFormProps = {
  form: any;
  title: string;
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
  children?: React.ReactNode;
  isEdit?: boolean;
};

export const SingleInputForm: React.FC<TSingleInputFormProps> = ({
  title,
  form,
  onSubmit,
  children,
  isSubmitting,
  isEdit
}): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 gap-4 sm:px-6 sm:py-0 md:gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto grid flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7" type="button" onClick={() => navigate(-1)}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              {`${isEdit ? "Edit" : "Create"} ${title}`}
            </h1>

            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm" disabled={isSubmitting} onClick={() => navigate(-1)} type="button">
                Discard
              </Button>
              <Button type="submit" size="sm" className="gap-1" disabled={isSubmitting}>
                <span>{`Save ${title}`}</span>
                <Loader visible={isSubmitting} />
              </Button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2">
              <CardWrapper title={`${title} Details`}>
                <div className="grid gap-6">
                  <div className="grid gap-3">{children}</div>
                </div>
              </CardWrapper>
            </div>
          </div>

          <div className="mt-3 flex flex-col items-center justify-center gap-3 md:hidden">
            <Button type="submit" size="sm" className="w-full gap-1 py-5" disabled={isSubmitting}>
              <span>{`Save ${title}`}</span>
              <Loader visible={isSubmitting} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full py-5"
              disabled={isSubmitting}
              onClick={() => navigate(-1)}
              type="button"
            >
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
