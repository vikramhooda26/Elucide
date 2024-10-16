import RecentList from "../../components/RecentList";

type Props = {
    recentlyCreated: Array<any>;
    recentlyModified: Array<any>;
    viewRoute: string;
};

function AthleteRecentList({ recentlyCreated, recentlyModified, viewRoute }: Props) {
    return (
        <>
            <RecentList
                title={"Added Athletes"}
                list={recentlyCreated || []}
                operation={"created by"}
                nameKey={"name"}
                dateKey={"createdAt"}
                operationKey={"createdBy"}
                viewRoute={viewRoute}
            />
            <RecentList
                title={"Modified Athletes"}
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

export default AthleteRecentList;
