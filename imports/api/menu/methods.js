import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { moment } from 'meteor/momentjs:moment';
import { Meteor } from 'meteor/meteor';

import { requireAdmin } from '../utils';
import Dishes from './models/dishes';
import Menus from './models/menus';

export const insertDish = new ValidatedMethod({
  name: 'Dishes.insert',
  validate: new SimpleSchema({
    name: { type: String },
    price: { type: Number },
    ingredients: { type: Array },
    'ingredients.$': { type: String },
    spicyLevel: { type: String },
    notes: { type: String },
  }).validator(),
  run({ name, price, ingredients, spicyLevel, notes }) {
    requireAdmin(this.userId);

    Dishes.insert({
      name,
      price,
      ingredients,
      spicyLevel,
      notes,
      createdBy: this.userId,
      createdAt: moment().utc().format(),
    });
  },
});

export const updateDish = new ValidatedMethod({
  name: 'Dishes.update',
  validate: new SimpleSchema({
    dishId: { type: String },
    name: { type: String },
    price: { type: Number },
    ingredients: { type: Array },
    'ingredients.$': { type: String },
    spicyLevel: { type: String },
    notes: { type: String },
  }).validator(),
  run({ dishId, name, price, ingredients, spicyLevel, notes }) {
    requireAdmin(this.userId);

    Dishes.update({
      _id: dishId
    }, {
      $set: {
        name,
        price,
        ingredients,
        spicyLevel,
        notes,
        updatedAt: moment().utc().format()
      }
    });
  },
});

export const updateDishImage = new ValidatedMethod({
  name: 'Dishes.update.image',
  validate: new SimpleSchema({
    dishId: { type: String },
    imageUrl: { type: String }
  }).validator(),
  run({ dishId, imageUrl }) {
    requireAdmin(this.userId);

    Dishes.update({ _id: dishId }, { $set: { imageUrl } });
  },
});

export const insertMenu = new ValidatedMethod({
  name: 'Menus.insert',
  validate: new SimpleSchema({
    dishId: String,
    stock: Number,
    serveFrom: String,
    serveTo: String,
    area: String,
  }).validator(),
  run({ dishId, stock, serveFrom, serveTo, area }) {
    requireAdmin(this.userId);

    return Menus.insert({
      dishId,
      stock,
      serveFrom,
      serveTo,
      area,
      createdAt: moment().utc().format(),
    });
  },
});

export const updateMenu = new ValidatedMethod({
  name: 'Menus.update',
  validate: new SimpleSchema({
    menuId: String,
    serveFrom: String,
    serveTo: String,
  }).validator(),
  run({ menuId, serveFrom, serveTo }) {
    requireAdmin(this.userId);

    Menus.update({
      _id: menuId
    }, {
      $set: {
        serveFrom,
        serveTo,
        updatedAt: moment().utc().format(),
      }
    });
  },
});

export const deleteMenu = new ValidatedMethod({
  name: 'Menus.delete',
  validate: new SimpleSchema({
    menuId: String,
  }).validator(),
  run({ menuId }) {
    requireAdmin(this.userId);

    Menus.remove(menuId);
  },
});

export const checkStock = new ValidatedMethod({
  name: 'Menus.checkStock',
  validate: new SimpleSchema({
    menuId: String,
    stock: Number
  }).validator(),
  run({ menuId, stock }) {
    const menuObj = Menus.findOne({ _id: menuId });
    if (menuObj.stock < stock) {
      throw new Meteor.Error('required amount is larger than stocks');
    }

    return 'Operation valid';
  }
});