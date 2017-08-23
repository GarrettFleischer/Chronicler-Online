import { base, cChoice, cIf, cLink, cNext, cText, DataType, LinkType, node, scene } from './nodes';


export function getBase(state) {
  return state.chronicler.present.data;
}


export const initialState = {
  chronicler: {
    past: [],
    present: {
      guid: 18,
      uid: 18,
      avail: [],
      data: initData(),
    },
    future: [],
    canUndo: false,
    canRedo: false,
  },
};


const pouchApiState = {
  users: [pouchUser],
  projects: [pouchProject],
  version: '0.1.0',
  serverAddress: 'https://gamesmith.ddns.net:5000',
};

const pouchUser = {
  _id: 0,
  userName: '',
  firstName: '',
  lastName: '',
  email: '',
  projects: {
    created: [0, 1, 2], // project ids
    collaborating: [0, 1, 2], // project ids
  },
};

const pouchProject = {
  _id: 0,
  version: '0.1.0', // version based on last saved update
  creator: 0,
  collaborators: [0, 1, 2],
  dbName: '', // unique name for separate db
};

export const pouchInitialState = {
  user: pouchUser,          // current logged in user
  projects: [pouchProject], // api - only projects the user has access to
  ui: {},
  history: {
    past: [],
    present: {
      guid: 0,
      uid: 0,
      avail: [],
      data: {
        projectName: '',
        authorName: '',
        variables: [pouchVariable],
        scenes: [pouchScene],
        nodes: [pouchNode],
        components: [pouchComponent],
        changesets: [pouchChangeset],
      },
    },
    future: [],
    canUndo: false,
    canRedo: false,
  },
};

const pouchVariable = {
  _id: 0,
  type: DataType.VARIABLE,
  name: '',
  value: '',
  scene: null, // null or scene id if local var
};

const pouchScene = {
  _id: 0,
  type: DataType.SCENE,
  label: '',
  nodes: [0, 1, 2], // ids of related nodes
  variables: [0, 1, 2], // ids of local variables
};

const pouchNode = {
  _id: 0,
  type: DataType.NODE,
  scene: 0, // id of related scene
  label: '',
  components: [0, 1, 2], // ids of related components
};

const pouchComponent = {
  _id: 0,
  type: DataType.COMPONENT,
  node: 0, // id
  changesets: [0, 1, 2], // ids of related changesets
  componentType: DataType.TEXT, // specific component type
  // type specific data
};

const pouchChangeset = {
  _id: 0,
  type: DataType.CHANGESET,
  component: 0, // id of related component
  owner: 0, // id of user
  parent: 0, // id of parent changeset
  children: [0, 1, 2], // ids of child changesets
  changesetType: DataType.CHANGESET, // specific changeset type
  // type specific data
};

const pouchGet = (id, includeChildren, type) => ({ id: 0, includeChildren: false, type: DataType.NODE });


function initData() {
  return {
    ...base([

      scene(1, 'scene 1', [

        node(2, 'startup page', [
          cText(3, 'text 3'),
          cNext(4, 'next 4', 5),
        ]),

        node(5, 'startup page', [
          cText(6, 'text 6'),
          cChoice(7, [
            cLink(8, LinkType.NORMAL, 'choice 8', 2, []),
          ]),
        ]),

      ]),

      scene(9, 'scene 9', [

        node(10, null, [
          cText(11, 'text 3'),
          cNext(12, 'next 4', 13),
        ]),

        node(13, null, [
          cText(14, 'text 6'),

          cIf(15, '',
            [cText(16, '')],
            [cChoice(17, [
              cLink(18, LinkType.NORMAL, 'choice 18', 10, []),
            ]),
            ]),


        ]),

      ]),

    ]),
  };

  // return base([
  //   // SCENE 1
  //   scene(1, 'startup', [
  //     // NodeType 2
  //     node(2, 'Start', [
  //       cText(3, 'A knight...'),
  //       cChoice(4, [
  //         cLink(5, LinkType.NORMAL, 'Fly...', 3, [
  //           cSet(6, 'disdain', '%+', '10'),
  //         ]),
  //         cLink(7, LinkType.NORMAL, 'Charge...', 4, null),
  //       ]),
  //     ]),
  //     // NodeType 3
  //     node(8, null, [
  //       cNext('End Act 1', 5),
  //     ]),
  //     // NodeType 4
  //     node(9, null, [
  //       cNext(10, null, 3),
  //     ]),
  //     // NodeType 5
  //     node(11, null, [
  //       cGotoScene(12, 6, 8),
  //     ]),
  //   ]),
  //   // SCENE 6
  //   scene(13, 'scene_2', [
  //     // NodeType 7
  //     node(14, null, [
  //       cText(15, '...'),
  //       // LABEL 8
  //       cLabel(16, 'middle'),
  //     ]),
  //   ]),
  // ]);
}
