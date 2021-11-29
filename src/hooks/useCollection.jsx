import { useState, useEffect, useRef } from "react";
import { projectFirestore } from "../config/config";

export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;
  useEffect(() => {
    let ref = projectFirestore.collection(collection);

    if (query) ref = ref.where(...query);

    if (orderBy) ref = ref.orderBy(...orderBy);

    const unSub = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        // Update state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError(error.message);
      }
    );

    // Unmount
    return () => unSub();
  }, [collection, query, orderBy]);

  return { documents, error };
};
