import axios from 'axios';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { PER_PAGE } from '../../components/Pagination';
import { GetMessageVariables, GetMessagesResponse } from '../../pages/api/messages';

const fetcher = (url: string, params: GetMessageVariables) =>
    axios.get<GetMessagesResponse | null>(url, { params }).then((res) => res.data);

const useMessages = (currentPage: number, vars?: GetMessageVariables) => {
    const router = useRouter();
    const variables: GetMessageVariables = { skip: Math.max(currentPage - 1, 0) * PER_PAGE, take: PER_PAGE, ...vars };

    return useSWR(router.isReady && ['/api/messages', variables], fetcher);
};

export default useMessages;
