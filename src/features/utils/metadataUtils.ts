import AuthService from "../../services/auth/AuthService";
import { HTTP_STATUS_CODES } from "../../lib/constants";
import { TMetadataStore } from "../../store/atoms/metadata";
import { SetStateAction } from "react";

export const getMetadata = async (
    metadataStore: TMetadataStore,
    setMetadataStore: React.Dispatch<SetStateAction<TMetadataStore>>,
    metadataType: Record<string, string>
) => {
    if (metadataStore === null) {
        const requestBody = metadataKeysToRequestBody(metadataType);

        const metadata = await populateMetadataStore(requestBody);

        setMetadataStore((prevStore) => ({
            ...prevStore,
            ...metadata
        }));
    }

    const metadataHasUpdated = await getMetadataHasUpdated();

    const metadataToGet = determineMetadataToGet(
        metadataStore,
        metadataHasUpdated,
        metadataType
    );

    if (Object.keys(metadataToGet).length > 0) {
        const metadata = await populateMetadataStore(metadataToGet);

        setMetadataStore((prevStore) => ({
            ...prevStore,
            ...metadata
        }));
    }
};

const metadataKeysToRequestBody = (metadataType: Record<string, string>) => {
    return Object.values(metadataType).reduce(
        (acc, key) => {
            acc[key] = true;
            return acc;
        },
        {} as Record<string, boolean>
    );
};

const determineMetadataToGet = (
    metadataStore: TMetadataStore,
    metadataHasUpdated: Record<string, boolean>,
    metadataType: Record<string, string>
) => {
    const metadataToGet: { [key: string]: boolean } = {};

    Object.values(metadataType).forEach((key) => {
        if (metadataStore) {
            if (!(key in metadataStore)) {
                metadataToGet[key] = true;
            }
        }
    });

    Object.entries(metadataHasUpdated).forEach(([key, value]) => {
        if (value) {
            metadataToGet[key] = true;
        }
    });

    return metadataToGet;
};

const populateMetadataStore = async (requestBody: any) => {
    try {
        const response = await AuthService.getMetadata(requestBody);

        if (response.status === HTTP_STATUS_CODES.OK) {
            console.log("metadata response", response.data);
            return response.data;
        }
    } catch (error) {
        throw error;
    }
};

const getMetadataHasUpdated = async () => {
    try {
        const response = await AuthService.getMetadataHasUpdated();

        if (response.status === HTTP_STATUS_CODES.OK) {
            console.log("metadata status response", response.data);
            return response.data;
        }
    } catch (error) {
        throw error;
    }
};
