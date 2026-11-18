import * as userService from '../services/user.service.js';

export const getAll = async (req, res, next) => {
  try {
    const users = await userService.getAll();
    res.json({ success: true, users });
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const user = await userService.getById(req.params.id);
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const user = await userService.update(req.params.id, req.body);
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await userService.remove(req.params.id);
    res.json({ success: true, message: 'User deleted.' });
  } catch (error) {
    next(error);
  }
};

