type Props = {
  strategy: string | undefined;
};
function StrategyOverview({ strategy }: Props) {
  return (
    <div className="p-6 text-sm">
      <ul className="grid gap-3">
        <li className="flex flex-col gap-3">
          <span className="text-lg">Strategy Overview</span>
          <span className="text-muted-foreground">{strategy || "N/A"}</span>
        </li>
      </ul>
    </div>
  );
}

export default StrategyOverview;
