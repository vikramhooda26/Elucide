import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { toast } from 'sonner';
import useNavigator from '../../../../hooks/useNavigator';
import { useUser } from '../../../../hooks/useUser';
import { HTTP_STATUS_CODES } from '../../../../lib/constants';
import ErrorService from '../../../../services/error/ErrorService';
import TeamService from '../../../../services/features/TeamService';
import { listLoadingAtom } from '../../../../store/atoms/global';
import { team } from '../../../../types/team/TeamListTypes';
import { useAuth } from '../../../auth/auth-provider/AuthProvider';
import RecentList from '../../components/RecentList';

function TeamRecentList() {
  const navigator = useNavigator();
  const [teamList, setTeamList] = useState<any[]>([]);
  const setIsLoading = useSetRecoilState(listLoadingAtom);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const userRole = useUser()?.role;
  if (!userRole) {
    return;
  }

  const fetchTeams = async () => {
    try {
      setIsLoading(true);
      const response = await TeamService.getAll({});
      if (response.status === HTTP_STATUS_CODES.OK) {
        const teams = response.data?.slice(0, 6);
        teams.forEach((brand: team, i: number) => {
          teams[i].createdBy = brand?.createdBy?.email || "";
          teams[i].modifiedBy = brand?.modifiedBy?.email || "";
        });
        setTeamList(teams);
      }
    } catch (error) {
      const unknownError = ErrorService.handleCommonErrors(
        error,
        logout,
        navigate
      );
      if (unknownError) {
        toast.error("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <>
      <RecentList title={'Added Teams'} list={teamList} operation={'created by'} nameKey={'name'} dateKey={'createdDate'} operationKey={'createdBy'} />
      <RecentList title={'Modified Teams'} list={teamList} operation={'modified by'} nameKey={'name'} dateKey={'modifiedDate'} operationKey={'modifiedBy'} />
    </>
  )
}

export default TeamRecentList;