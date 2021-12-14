import useSWR, { SWRHook } from 'swr';
import usePrevious from './usePrevious';

const useStickySWR: SWRHook = (...args: unknown[]) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const val = useSWR(...args);
    const previous = usePrevious(val.data, Boolean);

    return { ...val, data: val.data ?? previous };
};

export default useStickySWR;
