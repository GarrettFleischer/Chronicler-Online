
import { DELETE_VARIABLE } from '../Variable/reducers';


export const SET_VARIABLE_CHANGED = 'SET_VARIABLE_CHANGED';
export const SET_OP_CHANGED = 'SET_OP_CHANGED';
export const SET_VALUE_CHANGED = 'SET_VALUE_CHANGED';
export const SET_IS_VARIABLE = 'SET_IS_VARIABLE';

export const setVariableChanged = (id, variableId) => ({ type: SET_VARIABLE_CHANGED, id, variableId });
export const setOpChanged = (id, op) => ({ type: SET_OP_CHANGED, id, op });
export const setValueChanged = (id, value) => ({ type: SET_VALUE_CHANGED, id, value });
export const setIsVariable = (id, isVariable) => ({ type: SET_IS_VARIABLE, id, isVariable });

export const setActionReducer = (state, action) => {
  if (action.id !== state.id) {
    return {
      ...state,
      variableId: (action.type === DELETE_VARIABLE && action.id === state.variableId) ? '' : state.variableId,
      value: (state.isVariable && action.type === DELETE_VARIABLE && action.id === state.variableId) ? '' : state.value,
    };
  }

  switch (action.type) {
    case SET_VARIABLE_CHANGED:
      return { ...state, variableId: action.variableId };

    case SET_OP_CHANGED:
      return { ...state, op: action.op };

    case SET_VALUE_CHANGED:
      return { ...state, value: action.value };

    case SET_IS_VARIABLE:
      return { ...state, isVariable: action.isVariable, value: '' };

    default:
      return state;
  }
};
