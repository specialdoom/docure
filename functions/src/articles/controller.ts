import { Request, Response } from "express";
import * as admin from 'firebase-admin'
import { handleError } from "../utils";
import * as serviceAccount from '../../credentials/docure-firebase.json';

const params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url
}


admin.initializeApp({
  credential: admin.credential.cert(params),
  databaseURL: "https://docure-9a8dd-default-rtdb.europe-west1.firebasedatabase.app"
});

const database = admin.database();

export async function all(req: Request, res: Response) {
  try {
    const values: any[] = []
    const snapshot = await database.ref('articles').once("value");
    snapshot.forEach(element => {
      values.push({ id: element.key, ...element.val() })
    })
    return res.status(200).send(JSON.stringify(values));
  } catch (e) {
    return handleError(res, e);
  }
}

export async function get(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'No id provided!' });
    }

    const snapshot = await database.ref('articles').child(id).once("value");

    return snapshot.val() ? res.status(200).send(JSON.stringify(snapshot.val())) : res.status(404).send({ message: 'Object not found!' });
  } catch (e) {
    return handleError(res, e);
  }
}

export async function allRecentlyViewed(req: Request, res: Response) {
  try {
    const { id: userId } = req.params;

    if (!userId) {
      return res.status(400).send({ message: 'No user id provided!' });
    }
    const values: any[] = []
    const snapshot = await database.ref('recently-viewed').child(userId).once("value");
    snapshot.forEach(element => {
      values.push(element.val())
    })
    return res.status(200).send(JSON.stringify(values));
  } catch (e) {
    return handleError(res, e);
  }
}

export async function addToRecentlyViewed(req: Request, res: Response) {
  try {
    const { id, userId } = req.body;

    if (!id || !userId) {
      return res.status(400).send({ message: 'No id provided!' });
    }

    const values = await database.ref('recently-viewed').child(userId).once("value");

    const article = await database.ref('articles').child(id).once("value");

    let key = '';

    values.forEach(element => {
      if (element.val().articleId === id) {
        key = `${element.key}`;
      }
    })

    if (key) {
      database.ref('recently-viewed').child(userId).child(key).update({
        date: new Date().toString()
      })
    } else {
      database.ref('recently-viewed').child(userId).push().set({
        articleId: id,
        title: article.val().title,
        date: new Date().toString()
      })
    }

    return res.status(200).send({ message: 'Article added successfully.' })
  } catch (e) {
    return handleError(res, e);
  }
}