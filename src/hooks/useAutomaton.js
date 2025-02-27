import { useState, useEffect } from 'react';
import { automatonDefinition } from '../utils/automatonDefinition';

export const useAutomaton = () => {
  const [automaton, setAutomaton] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setAutomaton(automatonDefinition);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load automaton:', err);
      setError(err.message);
      setLoading(false);
    }
  }, []);

  return { automaton, loading, error };
};

export default useAutomaton;