import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

export const FormSkeleton: React.FC = (): JSX.Element => {
  return (
    <div className="relative h-dvh w-full animate-pulse">
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2">
          <CardWrapper options={[{ rows: 4 }]} />
          <CardWrapper options={[{ rows: 2, multiple: true }]} />
          <CardWrapper options={[{ rows: 1, multiple: true }, { rows: 1 }]} />
          <CardWrapper options={[{ rows: 1 }, { rows: 1, multiple: true }]} />
        </div>
        <div className="grid auto-rows-max items-start gap-4">
          <CardWrapper options={[{ rows: 4 }]} />
          <CardWrapper options={[{ rows: 4 }]} />
          <CardWrapper options={[{ rows: 3 }]} />
        </div>
      </div>
    </div>
  );
};

function CardWrapper({ multiple, options }: { multiple?: boolean; options?: { rows: number; multiple?: boolean }[] }) {
  return (
    <Card x-chunk="dashboard-07-chunk-3">
      <SkeletonHeader />
      <SkeletonBody>
        {options?.length ? (
          options.map((values) =>
            Array.from({ length: values.rows }).map((_, index) =>
              values.multiple ? <SkeletonMultipleContent key={index} /> : <SkeletonSingleContent key={index} />
            )
          )
        ) : multiple ? (
          <SkeletonMultipleContent />
        ) : (
          <SkeletonSingleContent />
        )}
      </SkeletonBody>
    </Card>
  );
}

function SkeletonHeader() {
  return (
    <CardHeader>
      <CardTitle>
        <div className="h-4 w-[30%] rounded-full bg-gray-500" />
      </CardTitle>
    </CardHeader>
  );
}

function SkeletonSingleContent() {
  return (
    <div className="grid gap-3">
      <div className="h-6 w-[100%] rounded-xl bg-gray-500" />
    </div>
  );
}

function SkeletonMultipleContent() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="grid gap-3">
        <div className="h-6 rounded-xl bg-gray-500" />
      </div>
      <div className="grid gap-3">
        <div className="h-6 rounded-xl bg-gray-500" />
      </div>
    </div>
  );
}

function SkeletonBody({ children }: { children?: React.ReactNode }) {
  return (
    <CardContent>
      <div className="grid gap-6">{children}</div>
    </CardContent>
  );
}
