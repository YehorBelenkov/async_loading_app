import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const App = () => {
  const [status, setStatus] = useState('Pending');
  const [progress, setProgress] = useState(0);
  const [isTaskRunning, setIsTaskRunning] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const startAsyncTask = () => {
    setIsTaskRunning(true);
    setStatus('Running');
    setProgress(0);

    const maxIterations = 100; 
    const delay = 300; 

    let currentIteration = 0;

    const asyncOperation = () => {
      if (currentIteration < maxIterations) {
        setTimeoutId(
          setTimeout(() => {
            currentIteration++;
            setProgress((currentIteration / maxIterations) * 100);
            setStatus('Running');
            asyncOperation();
          }, delay)
        );
      } else {
        setStatus('Finished');
        setIsTaskRunning(false);
      }
    };

    asyncOperation();
  };

  const cancelAsyncTask = () => {
    clearTimeout(timeoutId); 
    setStatus('Canceled');
    setIsTaskRunning(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]}>
          <Text style={styles.progressText}>{progress.toFixed(2)}%</Text>
        </View>
      </View>
      <Text>Status: {status}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Start" onPress={startAsyncTask} disabled={isTaskRunning} />
        <Button title="Cancel" onPress={cancelAsyncTask} disabled={!isTaskRunning} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    width: '100%',
    height: 20,
    backgroundColor: 'lightgray',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'blue',
    alignItems: 'center',
  },
  progressText: {
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default App;