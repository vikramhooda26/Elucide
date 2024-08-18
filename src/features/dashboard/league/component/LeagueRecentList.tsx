import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { toast } from 'sonner';
import useNavigator from '../../../../hooks/useNavigator';
import { useUser } from '../../../../hooks/useUser';
import { HTTP_STATUS_CODES } from '../../../../lib/constants';
import ErrorService from '../../../../services/error/ErrorService';
import LeagueService from '../../../../services/features/LeagueService';
import { listLoadingAtom } from '../../../../store/atoms/global';
import { league } from '../../../../types/league/LeagueListTypes';
import { useAuth } from '../../../auth/auth-provider/AuthProvider';
import RecentList from '../../components/RecentList';

function LeagueRecentList() {
  const navigator = useNavigator();
  const [leagueList, setLeagueList] = useState<any[]>([]);
  const setIsLoading = useSetRecoilState(listLoadingAtom);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const userRole = useUser()?.role;
  if (!userRole) {
    return;
  }

  const fetchLeagues = async () => {
    try {
      setIsLoading(true);
      const response = await LeagueService.getAll();
      if (response.status === HTTP_STATUS_CODES.OK) {
        const leagues = response.data?.slice(0, 6);
        leagues.forEach((brand: league, i: number) => {
          leagues[i].createdBy = brand?.createdBy?.email || "";
          leagues[i].modifiedBy = brand?.modifiedBy?.email || "";
        });
        setLeagueList(leagues);
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
    fetchLeagues();
  }, []);

  return (
    <>
      <RecentList title={'Added Leagues'} list={leagueList} operation={'created by'} nameKey={'name'} dateKey={'createdDate'} operationKey={'createdBy'} />
      <RecentList title={'Modified Leagues'} list={leagueList} operation={'modified by'} nameKey={'name'} dateKey={'modifiedDate'} operationKey={'modifiedBy'} />
    </>
  )
}

export default LeagueRecentList;