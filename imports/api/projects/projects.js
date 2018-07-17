import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import Schema from 'simpl-schema';
import { Id } from '../customTypes';

export const INSERT = 'projects.insert';
export const REMOVE = 'projects.remove';

export const AddProject = (name, author) => Meteor.call(INSERT, name, author);
export const RemoveProject = (id) => Meteor.call(REMOVE, id);

export const ProjectSchema = new Schema({
  owner: Id,
  name: String,
  author: String,
});

export const Projects = new Mongo.Collection('projects');
Projects.attachSchema(ProjectSchema);