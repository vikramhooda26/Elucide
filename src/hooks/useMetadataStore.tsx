import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { metadataStoreAtom } from '../store/atoms/metadata';
import { getMetadata } from '../features/utils/metadataUtils';
import { ALL_METADATA } from '../types/metadata/Metadata';
import ErrorService from '../services/error/ErrorService';
import { useAuth } from '../features/auth/auth-provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from '../lib/constants';
import { toast } from 'sonner';

function useMetadataStore() {
    const [metadataStore, setMetadataStore] = useRecoilState(metadataStoreAtom);
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchMetadata();
    }, [])

    const fetchMetadata = async () => {
        try {
            await getMetadata(
                metadataStore,
                setMetadataStore,
                ALL_METADATA
            );
        } catch (error) {
            console.error(error);
            const unknownError = ErrorService.handleCommonErrors(
                error,
                logout,
                navigate
            );
            if (unknownError.response.status !== HTTP_STATUS_CODES.NOT_FOUND) {
                toast.error("An unknown error occurred");
                navigate(NAVIGATION_ROUTES.DASHBOARD);
            }

        } finally {
            console.log('Metadata finally');
        }
    };
    return metadataStore;
}

export default useMetadataStore;
