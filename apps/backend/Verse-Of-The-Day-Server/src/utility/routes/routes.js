import { get } from 'lodash';
import type { $Request, $Response } from 'express';
import { $log } from './../logging';
import type { Routes, Callbacks } from './../../types/Routes.type';
import {
  getVerseOfTheDay,
} from './../../feature/dailyVerse/dailyVerse';
import getListOfVersions from './../../feature/versions/versions';

const routeCallbacks: Callbacks = {
  echo: () => ({ success: true, message: 'This is an echo URL that confirms your connection.' }),
  getVerseOfTheDay,
  getListOfVersions,
};

function respondJSON(callback: Function, params: string = 'params.version'): Function {
  return async function getResponse(req: $Request, res: $Response): Promise<void> {
    try {
      const data = await callback(get(req, params));
      res.json(data);
    } catch (error) {
      $log().error(error);
      res.status(500).json({ err: error.message });
    }
  };
}

function routes(callbacks: Callbacks = routeCallbacks): Routes {
  return {
    echo: respondJSON(callbacks.echo),
    dailyVerse: respondJSON(callbacks.getVerseOfTheDay),
    psalm: respondJSON(callbacks.getPsalm),
    proverb: respondJSON(callbacks.getProverb),
    random: respondJSON(callbacks.getRandom),
    versions: respondJSON(callbacks.getListOfVersions),
  };
}

module.exports = routes;
