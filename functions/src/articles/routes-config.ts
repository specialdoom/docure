import { Application } from "express";
import { isAuthenticated } from "../auth/authenticated";
import { addToRecentlyViewed, all, allRecentlyViewed, get } from "./controller";

export function articleRoutesConfig(app: Application) {
  // get all
  app.get('/articles', [
    isAuthenticated,
    all
  ]);
  app.get('/article/:id', [
    isAuthenticated,
    get
  ]);
  app.get('/recently-viewed/:id', [
    isAuthenticated,
    allRecentlyViewed
  ]);
  app.post('/recently-viewed', [
    isAuthenticated,
    addToRecentlyViewed
  ]);
}