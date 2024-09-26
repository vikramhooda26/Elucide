import RecentList from "../../components/RecentList";

type Props = {
    recentlyCreated: Array<any>;
    recentlyModified: Array<any>;
}

function TeamRecentList({ recentlyCreated, recentlyModified }: Props) {

    return (
        <>
            <RecentList
                title={"Added Teams"}
                list={recentlyCreated || []}
                operation={"created by"}
                nameKey={"name"}
                dateKey={"createdAt"}
                operationKey={"createdBy"}
            />
            <RecentList
                title={"Modified Teams"}
                list={recentlyModified || []}
                operation={"modified by"}
                nameKey={"name"}
                dateKey={"modifiedAt"}
                operationKey={"modifiedBy"}
            />
        </>
    );
}

export default TeamRecentList;
