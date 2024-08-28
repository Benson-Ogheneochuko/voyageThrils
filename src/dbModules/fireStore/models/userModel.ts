import { Firestore, DocumentData } from "firebase/firestore"
import { firestoreDb } from "../db_config"
import { performEntityIdOperation, performEntityOperation, Operation } from "../fireStoreUtils"

type IFirestore = Firestore
const firestore: IFirestore = firestoreDb

interface IdOperation {
  operation: Operation.update | Operation.get | Operation.delete
  userId: string
  userData?: DocumentData
}

interface IQueryOperation {
  operation: Operation;
  searchValue: string;
  uniqueField?: string;
  userData?: DocumentData;
}

export interface IUser extends DocumentData {
  userId?: string
  email: string
  firstName: string
  lastName?: string
  pictureUrl?: string
}

// class
export class User {
  public static instance: User;
  private db: IFirestore;
  private collectionName: string;

  constructor(db: IFirestore = firestore) {
    this.db = db;
    this.collectionName = "users";
  }

  public static getInstance(db: IFirestore = firestore): User {
    if (!User.instance) {
      User.instance = new User(db);
    }
    return User.instance;
  }

  private idOperation = async ({ operation, userId, userData }: IdOperation) => {
    return await performEntityIdOperation({
      db: this.db,
      collectionName: this.collectionName,
      operation,
      id: userId,
      data: userData
    });
  };

  private queryOperation = async ({operation, searchValue, uniqueField = 'email', userData }: IQueryOperation) => {
    return (await performEntityOperation({
      db: this.db,
      collectionName: this.collectionName,
      operation: operation,
      uniqueField: uniqueField,
      searchValue: searchValue,
      data: userData
    })) as IUser;
  };
  // email operations
  public createUser = async (userData: IUser): Promise<IUser> => {
    return (await this.queryOperation({ operation: Operation.create, searchValue: userData["email"], userData })) as IUser;
  };


  public getUserByEmail = async (email: string): Promise<IUser | null> => {
    return (await this.queryOperation({ operation: Operation.get, searchValue: email })) as IUser;
  };

  public deleteUserByEmail = async (email: string): Promise<IUser | null> => {
    return (await this.queryOperation({operation: Operation.delete, searchValue: email })) as IUser;
  };

  // id operations
  public async updateUser( userId: string, userData: Partial<IUser> ): Promise<IUser> {
    return (await this.idOperation({ operation: Operation.update, userId, userData })) as IUser;
  }

  public getUser = async (userId: string): Promise<IUser | null> => {
    return (await this.idOperation({ operation: Operation.get, userId })) as IUser;
  };

  public deleteUser = async (userId: string): Promise<IUser | null> => {
    return (await this.idOperation({ operation: Operation.delete, userId })) as IUser;
  };
}
