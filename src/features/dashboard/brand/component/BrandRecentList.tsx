import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { toast } from 'sonner';
import useNavigator from '../../../../hooks/useNavigator';
import { useUser } from '../../../../hooks/useUser';
import { HTTP_STATUS_CODES } from '../../../../lib/constants';
import ErrorService from '../../../../services/error/ErrorService';
import { listLoadingAtom } from '../../../../store/atoms/global';
import { useAuth } from '../../../auth/auth-provider/AuthProvider';
import RecentList from '../../components/RecentList';
import BrandService from '../../../../services/features/BrandService';
import { brand } from '../../../../types/brand/BrandListTypes';

function BrandRecentList() {
  const navigator = useNavigator();
  const [brandList, setBrandList] = useState<any[]>([]);
  const setIsLoading = useSetRecoilState(listLoadingAtom);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const userRole = useUser()?.role;
  if (!userRole) {
    return;
  }

  const fetchBrands = async () => {
    try {
      setIsLoading(true);
      const response = await BrandService.getAll({});
      if (response.status === HTTP_STATUS_CODES.OK) {
        const brands = response.data?.slice(0, 6);
        brands.forEach((brand: brand, i: number) => {
          brands[i].createdBy = brand?.createdBy?.email || "";
          brands[i].modifiedBy = brand?.modifiedBy?.email || "";
        });
        setBrandList(brands);
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
    fetchBrands();
  }, []);

  return (
    <>
      <RecentList title={'Added Brands'} list={brandList} operation={'created by'} nameKey={'name'} dateKey={'createdDate'} operationKey={'createdBy'} />
      <RecentList title={'Modified Brands'} list={brandList} operation={'modified by'} nameKey={'name'} dateKey={'modifiedDate'} operationKey={'modifiedBy'} />
    </>
  )
}

export default BrandRecentList;