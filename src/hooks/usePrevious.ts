import { useEffect, useRef } from 'react';

const usePrevious = <T>(value: T, predicate?: (value: T) => boolean) => {
    const ref = useRef<T>(value);
    useEffect(() => {
        if (predicate && !predicate(value)) {
            return;
        }
        ref.current = value;
    });
    return ref.current;
};

export default usePrevious;
