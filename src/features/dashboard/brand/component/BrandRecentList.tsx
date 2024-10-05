import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { toast } from "sonner";
import useNavigator from "../../../../hooks/useNavigator";
import { useUser } from "../../../../hooks/useUser";
import { HTTP_STATUS_CODES } from "../../../../lib/constants";
import ErrorService from "../../../../services/error/ErrorService";
import { listLoadingAtom } from "../../../../store/atoms/global";
import { useAuth } from "../../../auth/auth-provider/AuthProvider";
import RecentList from "../../components/RecentList";
import BrandService from "../../../../services/features/BrandService";
import { brand } from "../../../../types/brand/BrandListTypes";

type Props = {
    recentlyCreated: Array<any>;
    recentlyModified: Array<any>;
};

function BrandRecentList({ recentlyCreated, recentlyModified }: Props) {
    return (
        <>
            <RecentList
                title={"Added Brands"}
                list={recentlyCreated || []}
                operation={"created by"}
                nameKey={"name"}
                dateKey={"createdAt"}
                operationKey={"createdBy"}
            />
            <RecentList
                title={"Modified Brands"}
                list={recentlyModified || []}
                operation={"modified by"}
                nameKey={"name"}
                dateKey={"modifiedAt"}
                operationKey={"modifiedBy"}
            />
        </>
    );
}

export default BrandRecentList;
