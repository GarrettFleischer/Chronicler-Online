import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import Schema from 'simpl-schema';
import { Id } from '../customTypes';


export const INSERT = 'scenes.insert';
export const REMOVE = 'scenes.remove';

export const AddScene = (name, projectId) => Meteor.call(INSERT, name, projectId);
export const RemoveScene = (id) => Meteor.call(REMOVE, id);

export const SceneSchema = new Schema({
  owner: Id,
  name: String,
  projectId: Id,
});

export const Scenes = new Mongo.Collection('scenes');
Scenes.attachSchema(SceneSchema);