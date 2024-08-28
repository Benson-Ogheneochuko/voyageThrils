import { Firestore, collection, getDocs, doc, query, where, runTransaction, serverTimestamp, DocumentData } from "firebase/firestore"
import { AppError } from "@/utils/appErrors"

export enum Operation {
  create ='create',
  update ='update',
  get ='get',
  delete = 'delete'
}

interface IPerformEntityOperationParams<T extends DocumentData> {
  db: Firestore
  collectionName: string
  operation: Operation
  uniqueField: keyof T
  searchValue: unknown
  data?: Partial<T>
}

export const performEntityOperation = async <T extends DocumentData>({
  db,
  collectionName,
  operation,
  uniqueField,
  searchValue,
  data,
}: IPerformEntityOperationParams<T>): Promise<DocumentData | null> => {

  const collectionRef = collection(db, collectionName)

  return runTransaction(db, async (transaction) => {
    // Check for existing entity
    const q = query(collectionRef, where(uniqueField as string, '==', searchValue))
    const querySnapshot = await getDocs(q)

    switch (operation) {
      case Operation.create:
        if (!data) {
          throw new AppError({
            userMessage: `Invalid Data provided.`,
            code: 'Invalid Data Provided',
            status: 404,
            operation: `${operation} ${collectionName}`,
          })
        }

        if (!querySnapshot.empty) {
          throw new AppError({
            userMessage: `${collectionName} with this ${String(uniqueField)} already exists.`,
            code: 'User Exists',
            status: 403,
            operation: `${operation} ${collectionName}`,
          })
        }

        const newDocRef = doc(collectionRef)
        const newEntity = {
          ...data,
          userId: newDocRef.id,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        } as DocumentData

        transaction.set(newDocRef, newEntity)
        return newEntity
      // end create

      case Operation.update:
        if (!data) {
          throw new AppError({
            userMessage: `Invalid User Data provided.`,
            code: 'Invalid Data Provided',
            status: 404,
            operation: `${operation} ${collectionName}`,
          })
        }

        if (querySnapshot.empty) {
          throw new AppError({
            userMessage: `${collectionName} not found.`,
            code: 'User Not Found',
            status: 404,
            operation: `${operation} ${collectionName}`,
          })
        }

        const docToUpdate = querySnapshot.docs[0]
        const updatedEntity = {
          ...data,
        } as DocumentData

        transaction.update(docToUpdate.ref, updatedEntity)
        return { ...updatedEntity, userID: docToUpdate.id }
      // end update

      case Operation.delete:
        if (querySnapshot.empty) {
          throw new AppError({
            userMessage: `${collectionName} not found.`,
            code: 'User Not Found',
            status: 404,
            operation: `${operation} ${collectionName}`,
          })
        }

        const docToDelete = querySnapshot.docs[0]
        transaction.delete(docToDelete.ref)
        return null // No data returned for delete
      // end delete

      case Operation.get:
        if (querySnapshot.empty) {
          throw new AppError({
            userMessage: `${collectionName} not found.`,
            code: 'User Not Found',
            status: 404,
            operation: `${operation} ${collectionName}`,
          })
        }

        return querySnapshot.docs[0].data() as T
      //end get

      default:
        throw new AppError({
          userMessage: `Invalid Operation.`,
          code: 'Invalid Operation',
          status: 404,
          operation: `${operation} ${collectionName}`,
        })
    }
  })
}

interface IPerformEntityIdOperation<T extends DocumentData> {
  db: Firestore
  collectionName: string
  operation: Operation.update | Operation.get | Operation.delete
  id: string
  data?: Partial<T>
}

export const performEntityIdOperation = async <T extends DocumentData>({ db, collectionName, operation, id, data, }: IPerformEntityIdOperation<T>) => {
  return runTransaction(db, async (transaction) => {
    const docRef = doc(db, collectionName, id)
    const docSnap = await transaction.get(docRef)

    switch (operation) {
      case Operation.update:
        if (!data) {
          throw new AppError({
            userMessage: `Invalid User Data provided.`,
            code: 'Invalid Data Provided',
            status: 404,
            operation: `${operation} ${collectionName}`,
          })
        }

        if (!docSnap.exists()) {
          throw new AppError({
            userMessage: `${collectionName} not found.`,
            code: `${collectionName} Not Found`,
            status: 404,
            operation: `${operation} ${collectionName}`,
          })
        }

        const existingData = docSnap.data() as DocumentData
        const updatedDoc: DocumentData = {
          ...existingData,
          ...data,
        }

        transaction.update(docRef, updatedDoc)
        return { ...updatedDoc, userId: docSnap.id } as DocumentData
      // end update

      case Operation.delete:
        if (!docSnap.exists()) {
          throw new AppError({
            userMessage: `${collectionName} not found.`,
            code: `${collectionName} Not Found`,
            status: 404,
            operation: `${operation} ${collectionName}`,
          })
        }
        transaction.delete(docRef)
        return docSnap.data() as T
      // end delete

      case Operation.get:
        if (!docSnap.exists()) {
          throw new AppError({
            userMessage: `${collectionName} not found.`,
            code: `${collectionName} Not Found`,
            status: 404,
            operation: `${operation} ${collectionName}`,
          })
        }
        return { ...docSnap.data() } as T
      // end get

      default:
        throw new Error('Invalid operation')
    }
  })
}

// interface IPerformEntityOperationParams<T extends DocumentData> {
//   // ... existing fields
//   conditions?: Array<{
//     field: keyof T;
//     operator: '==' | '>' | '<' | '>=' | '<=' | 'array-contains' | 'in';
//     value: unknown;
//   }>;
// }