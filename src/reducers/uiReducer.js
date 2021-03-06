export const SET_NODE_REORDERING = 'SET_NODE_REORDERING';
export const setNodeReordering = (reordering) => ({ type: SET_NODE_REORDERING, reordering });

export const RESTORE_DEFAULT_UI = 'RESTORE_DEFAULT_UI';
export const restoreDefaultUI = () => ({ type: RESTORE_DEFAULT_UI });

export const SET_SHOW_CHOOSE_NODE_DIALOG = 'SET_SHOW_CHOOSE_NODE_DIALOG';
export const setShowChooseNodeDialog = (show) => ({ type: SET_SHOW_CHOOSE_NODE_DIALOG, show });

export const SET_CHOOSE_NODE_DIALOG_VALUE = 'SET_CHOOSE_NODE_DIALOG_VALUE';
export const setChooseNodeDialogValue = (value) => ({ type: SET_CHOOSE_NODE_DIALOG_VALUE, value });

export const SET_CHOICE_REORDERING = 'SET_CHOICE_REORDERING';
export const setChoiceReordering = (reordering) => ({ type: SET_CHOICE_REORDERING, reordering });

export const SET_ITEM_MENU = 'SET_ITEM_MENU';
export const setItemMenu = (anchorEl, showMenu) => ({ type: SET_ITEM_MENU, anchorEl, showMenu });

export const SET_SHOW_CHOOSE_COMPONENT_DIALOG = 'SET_SHOW_CHOOSE_COMPONENT_DIALOG';
export const setShowChooseComponentDialog = (show) => ({ type: SET_SHOW_CHOOSE_COMPONENT_DIALOG, show });

export const SET_CHOOSE_COMPONENT_DIALOG_VALUE = 'SET_CHOOSE_COMPONENT_DIALOG_VALUE';
export const setChooseComponentDialogValue = (value) => ({ type: SET_CHOOSE_COMPONENT_DIALOG_VALUE, value });

export const SET_COMPONENT_SORTING = 'SET_COMPONENT_SORTING';
export const setConditionSorting = (sorting) => ({ type: SET_COMPONENT_SORTING, sorting });

export const SET_FLOWCHART_OFFSET = 'SET_FLOWCHART_OFFSET';
export const setFlowchartOffset = (offset) => ({ type: SET_FLOWCHART_OFFSET, offset });

export const SET_FLOWCHART_DRAGGING = 'SET_FLOWCHART_DRAGGING';
export const setFlowchartDragging = (dragging) => ({ type: SET_FLOWCHART_DRAGGING, dragging });

export const SET_FLOWCHART_MOUSE = 'SET_FLOWCHART_MOUSE';
export const setFlowchartMouse = (mouse) => ({ type: SET_FLOWCHART_MOUSE, mouse });

export const SET_TAB_VIEW_VALUE = 'SET_TAB_VIEW_VALUE';
export const setTabViewValue = (id, value) => ({ type: SET_TAB_VIEW_VALUE, id, value });

export const SET_ACTIVE_PROJECT = 'SET_ACTIVE_PROJECT';
export const setActiveProject = (projectId) => ({ type: SET_ACTIVE_PROJECT, projectId });

export const SET_ITEM_LIST_SORTING = 'SET_ITEM_LIST_SORTING';
export const setItemListSorting = (id, sorting) => ({ type: SET_ITEM_LIST_SORTING, id, sorting });

export const RESET_LOGIN = 'RESET_LOGIN';
export const resetLogin = () => ({ type: RESET_LOGIN });

export const SET_REGISTER = 'SET_REGISTER';
export const setRegister = (register) => ({ type: SET_REGISTER, register });

export const SET_USERNAME = 'SET_USERNAME';
export const setUsername = (name) => ({ type: SET_USERNAME, name });

export const SET_PASSWORD = 'SET_PASSWORD';
export const setPassword = (password) => ({ type: SET_PASSWORD, password });

export const SET_EMAIL = 'SET_EMAIL';
export const setEmail = (email) => ({ type: SET_EMAIL, email });

export const SET_SHOW_CREATE_PROJECT = 'SET_SHOW_CREATE_PROJECT';
export const setShowCreateProject = (show) => ({ type: SET_SHOW_CREATE_PROJECT, show });

export const SET_NAME_CREATE_PROJECT = 'SET_NAME_CREATE_PROJECT';
export const setNameCreateProject = (name) => ({ type: SET_NAME_CREATE_PROJECT, name });

export const CREATE_PROJECT_FILE_LOADED = 'CREATE_PROJECT_FILE_LOADED';
export const createProjectFileLoaded = (file) => ({ type: CREATE_PROJECT_FILE_LOADED, file });

export const VALUE_NEW_PROJECT = 'VALUE_NEW_PROJECT';
export const VALUE_IMPORT_PROJECT = 'VALUE_IMPORT_PROJECT';
const createProjectTab = [VALUE_NEW_PROJECT, VALUE_IMPORT_PROJECT];
export const SET_TAB_CREATE_PROJECT = 'SET_TAB_CREATE_PROJECT';
export const setTabCreateProject = (tab) => ({ type: SET_TAB_CREATE_PROJECT, tab });


export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case RESTORE_DEFAULT_UI:
      return initialState;

    case SET_ACTIVE_PROJECT:
      return { ...state, activeProject: action.projectId };

    default:
      return {
        ...state,
        node: nodeReducer(state.node, action),
        link: linkReducer(state.link, action),
        choice: choiceReducer(state.choice, action),
        itemMenu: itemMenuReducer(state.itemMenu, action),
        chooseComponentDialog: chooseComponentDialogReducer(state.chooseComponentDialog, action),
        condition: conditionReducer(state.condition, action),
        flowchart: flowchartReducer(state.flowchart, action),
        tabView: tabViewReducer(state.tabView, action),
        itemList: itemListReducer(state.itemList, action),
        login: loginReducer(state.login, action),
        createProjectDialog: createProjectReducer(state.createProjectDialog, action),
      };
  }
}

export const initialState = {
  activeProject: undefined,
  node: {
    reordering: false,
  },
  link: {
    showChooseNodeDialog: undefined,
    chooseNodeDialogValue: undefined, // PropTypeId of selected node
  },
  choice: {
    reordering: false,
  },
  itemMenu: {
    anchorEl: null,
    showMenu: undefined,
  },
  chooseComponentDialog: {
    show: false,
    value: undefined,
  },
  condition: {
    sorting: false,
  },
  flowchart: {
    offset: { x: 100, y: 0 },
    mouse: { x: 0, y: 0, offx: 0, offy: 0 },
    dragging: false,
  },
  tabView: {
    value: {},
  },
  itemList: {
    sorting: {},
  },
  crumbTrail: {
    id: null,
  },
  login: {
    register: false,
    name: 'BenSeawalker',
    password: 'password',
    email: 'benseawalker@yahoo.com',
  },
  createProjectDialog: {
    show: false,
    value: { name: '', scenes: [] },
  },
};


const nodeReducer = (state, action) => {
  switch (action.type) {
    case SET_NODE_REORDERING:
      return { ...state, reordering: action.reordering };

    default:
      return state;
  }
};

const linkReducer = (state, action) => {
  switch (action.type) {
    case SET_SHOW_CHOOSE_NODE_DIALOG:
      return { ...state, showChooseNodeDialog: action.show };

    case SET_CHOOSE_NODE_DIALOG_VALUE:
      return { ...state, chooseNodeDialogValue: action.value };

    default:
      return state;
  }
};

const choiceReducer = (state, action) => {
  switch (action.type) {
    case SET_CHOICE_REORDERING:
      return { ...state, reordering: action.reordering };

    default:
      return state;
  }
};

const itemMenuReducer = (state, action) => {
  switch (action.type) {
    case SET_ITEM_MENU:
      return { ...state, anchorEl: action.anchorEl, showMenu: action.showMenu };

    default:
      return state;
  }
};


const chooseComponentDialogReducer = (state, action) => {
  switch (action.type) {
    case SET_SHOW_CHOOSE_COMPONENT_DIALOG:
      return { ...state, show: action.show };

    case SET_CHOOSE_COMPONENT_DIALOG_VALUE:
      return { ...state, value: action.value };

    default:
      return state;
  }
};

const conditionReducer = (state, action) => {
  switch (action.type) {
    case SET_COMPONENT_SORTING:
      return { ...state, sorting: action.sorting };

    default:
      return state;
  }
};

const flowchartReducer = (state, action) => {
  switch (action.type) {
    case SET_FLOWCHART_OFFSET:
      return { ...state, offset: action.offset };

    case SET_FLOWCHART_DRAGGING:
      return { ...state, dragging: action.dragging };

    case SET_FLOWCHART_MOUSE:
      return { ...state, mouse: action.mouse };

    default:
      return state;
  }
};

const tabViewReducer = (state, action) => {
  switch (action.type) {
    case SET_TAB_VIEW_VALUE:
      return { ...state, value: { ...state.value, [action.id]: action.value } };

    default:
      return state;
  }
};

const itemListReducer = (state, action) => {
  switch (action.type) {
    case SET_ITEM_LIST_SORTING:
      return { ...state, sorting: { [action.id]: action.sorting } };

    default:
      return state;
  }
};


const loginReducer = (state, action) => {
  switch (action.type) {
    case RESET_LOGIN:
      return { ...state, ...initialState.login };

    case SET_REGISTER:
      return { ...state, register: action.register };

    case SET_USERNAME:
      return { ...state, name: action.name };

    case SET_PASSWORD:
      return { ...state, password: action.password };

    case SET_EMAIL:
      return { ...state, email: action.email };

    default:
      return state;
  }
};


const createProjectReducer = (state, action) => {
  switch (action.type) {
    case SET_SHOW_CREATE_PROJECT:
      return { ...state, show: action.show };

    case SET_NAME_CREATE_PROJECT:
      return { ...state, value: { ...state.value, name: action.name } };

    case CREATE_PROJECT_FILE_LOADED:
      return { ...state, value: { ...state.value, scenes: [...state.value.scenes, action.file] } };

    case SET_TAB_CREATE_PROJECT:
      return { ...state, value: { ...state.value, type: createProjectTab[action.tab] } };
    default:
      return state;
  }
};
