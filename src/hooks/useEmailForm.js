import { useReducer, useCallback } from 'react';
import { db } from '../firebase';

const initialState = {
  message: '',
  name: '',
  email: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'update':
      return { ...state, [action.field]: action.value };
    case 'reset':
      return { ...initialState };
    default:
      throw new Error();
  }
};

export default function useEmailForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const update = useCallback(evt =>
    dispatch({
      field: evt.target.name,
      type: 'update',
      value: evt.target.value,
    })
  );
  const sendEmail = useCallback(
    e => {
      e.preventDefault();
      db.collection(`messages`).add({
        ...state,
        createdAt: new Date(),
      });
      dispatch({ type: 'reset' });
    },
    [db, state]
  );
  return {
    update,
    sendEmail,
    state,
  };
}
