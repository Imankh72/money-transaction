import { useReducer, useState, useEffect } from "react";
import { projectFirestore, timestamp } from "../config/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};
const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null };
    case "ADD_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETE_DOCUMENT":
      return {
        isPending: false,
        document: null,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const ref = projectFirestore.collection(collection);

  //   Add a document
  const addDocument = async (document) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const createdAt = timestamp.fromDate(new Date());

      const addedDocument = await ref.add({ ...document, createdAt });

      if (!isCancelled)
        dispatch({ type: "ADD_DOCUMENT", payload: addedDocument });
    } catch (error) {
      if (!isCancelled) dispatch({ type: "ERROR", payload: error.message });
    }
  };

  //   Delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });
    try {
      await ref.doc(id).delete();
      if (!isCancelled) dispatch({ type: "DELETE_DOCUMENT" });
    } catch (error) {
      if (!isCancelled) {
        console.log(error.message);
        dispatch({ type: "ERROR", payload: error.message });
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
