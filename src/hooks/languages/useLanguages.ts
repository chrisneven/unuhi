import axios from 'axios';
import useSWRImmutable from 'swr/immutable';
import { GetLanguagesResponse } from '../../pages/api/languages';

const fetcher = (url: string) => axios.get<GetLanguagesResponse>(url).then((res) => res.data);

const useLanguages = () => useSWRImmutable('/api/languages', fetcher);

export default useLanguages;
