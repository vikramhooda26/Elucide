import RecentList from "../../components/RecentList";

type Props = {
    recentlyCreated: Array<any>;
    recentlyModified: Array<any>;
}

function LeagueRecentList({ recentlyCreated, recentlyModified }: Props) {

    return (
        <>
            <RecentList
                title={"Added Leagues"}
                list={recentlyCreated || []}
                operation={"created by"}
                nameKey={"name"}
                dateKey={"createdAt"}
                operationKey={"createdBy"}
            />
            <RecentList
                title={"Modified Leagues"}
                list={recentlyModified || []}
                operation={"modified by"}
                nameKey={"name"}
                dateKey={"modifiedAt"}
                operationKey={"modifiedBy"}
            />
        </>
    );
}

export default LeagueRecentList;
