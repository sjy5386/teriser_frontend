import React, {useCallback, useReducer} from "react";

type UseInputsAction = {
    name: string;
    value: string;
};

function reducer<T>(state: T, action: UseInputsAction | null) {
    if (!action) {
        const initialState: any = {};
        Object.keys(state).forEach(key => {
            initialState[key] = '';
        });
        return initialState;
    }

    return {
        ...state,
        [action.name]: action.value
    };
}

export default function useInputs<T>(defaultValues: T) {
    const [state, dispatch] = useReducer(reducer, defaultValues);

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(e.target);
    }, []);

    const onReset = useCallback(() => {
        dispatch(null);
    }, []);

    return [state, onChange, onReset, dispatch] as [T, typeof onChange, typeof onReset, typeof dispatch];
}
