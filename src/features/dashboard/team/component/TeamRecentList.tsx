import RecentList from "../../components/RecentList";

type Props = {
  recentlyCreated: Array<any>;
  recentlyModified: Array<any>;
  viewRoute: string;
};

function TeamRecentList({ recentlyCreated, recentlyModified, viewRoute }: Props) {
  return (
    <>
      <RecentList
        title={"Added Teams"}
        list={recentlyCreated || []}
        operation={"created by"}
        nameKey={"name"}
        dateKey={"createdAt"}
        operationKey={"createdBy"}
        viewRoute={viewRoute}
      />
      <RecentList
        title={"Modified Teams"}
        list={recentlyModified || []}
        operation={"modified by"}
        nameKey={"name"}
        dateKey={"modifiedAt"}
        operationKey={"modifiedBy"}
        viewRoute={viewRoute}
      />
    </>
  );
}

export default TeamRecentList;
