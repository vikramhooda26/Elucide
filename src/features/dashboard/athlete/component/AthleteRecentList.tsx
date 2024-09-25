import RecentList from "../../components/RecentList";

type Props = {
    recentlyCreated: Array<any>;
    recentlyModified: Array<any>;
}

function AthleteRecentList({ recentlyCreated, recentlyModified }: Props) {

    return (
        <>
            <RecentList
                title={"Added Athletes"}
                list={recentlyCreated || []}
                operation={"created by"}
                nameKey={"name"}
                dateKey={"createdAt"}
                operationKey={"createdBy"}
            />
            <RecentList
                title={"Modified Athletes"}
                list={recentlyModified || []}
                operation={"modified by"}
                nameKey={"name"}
                dateKey={"modifiedAt"}
                operationKey={"modifiedBy"}
            />
        </>
    );
}

export default AthleteRecentList;
