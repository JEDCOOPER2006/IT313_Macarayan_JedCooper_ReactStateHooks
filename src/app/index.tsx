import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

function useStopwatch(isRunning: boolean): number {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    let myInterval: any = null;

    if (isRunning === true) {
      myInterval = setInterval(function() {
        setSeconds(function(oldSeconds) {
          return oldSeconds + 1;
        });
      }, 1000);
    }

    return function() {
      if (myInterval !== null) {
        clearInterval(myInterval);
      }
    };
  }, [isRunning]);

  return seconds;
}

interface PracticeProps {
  solved: number;
  onSolve: () => void;
  onReset: () => void;
}

function PracticeTracker(props: PracticeProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.textLabel}>Solved: {props.solved}</Text>
      
      {props.solved >= 5 ? (
        <Text style={styles.msg}>Great job! 🎉</Text>
      ) : null}
      
      <View style={styles.rowButtons}>
        {/* 7. References passed without calling them directly */}
        <Button title="Solve +1" onPress={props.onSolve} color="green" />
        <Button title="Reset" onPress={props.onReset} color="red" />
      </View>
    </View>
  );
}

interface StopwatchProps {
  seconds: number;
  isRunning: boolean;
}

function Stopwatch(props: StopwatchProps) {


  const m = Math.floor(props.seconds / 60);
  const s = props.seconds % 60;


  let minStr = '';
  if (m < 10) {
    minStr = '0' + m;
  } else {
    minStr = '' + m;
  }

  let secStr = '';
  if (s < 10) {
    secStr = '0' + s;
  } else {
    secStr = '' + s;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.clockText}>{minStr}:{secStr}</Text>
      
      {/* 4. Conditional rendering for status text */}
      {props.isRunning === true ? (
        <Text style={styles.statusOn}>Running...</Text>
      ) : (
        <Text style={styles.statusOff}>Paused</Text>
      )}
    </View>
  );
}

export default function LabScreen() {
  const [solved, setSolved] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const seconds = useStopwatch(isRunning);

  function pressSolve() {
    setSolved(function(prev) {
      return prev + 1;
    });
  }

  function pressReset() {
    setSolved(0);
  }

  function pressStart() {
    setIsRunning(true);
  }

  function pressStop() {
    setIsRunning(false);
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.mainHeading}>Lab Timer & Practice Tracker</Text>
    
      <PracticeTracker 
        solved={solved} 
        onSolve={pressSolve} 
        onReset={pressReset} 
      />
      
      <Stopwatch 
        seconds={seconds} 
        isRunning={isRunning} 
      />

      <View style={styles.bottomControls}>
        <Button title="Start" onPress={pressStart} disabled={isRunning} />
        <Button title="Stop" onPress={pressStop} disabled={!isRunning} color="darkgray" />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  card: {
    width: 300,
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  textLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  msg: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  clockText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  statusOn: {
    color: 'green',
    fontSize: 14,
    marginTop: 5,
  },
  statusOff: {
    color: 'orange',
    fontSize: 14,
    marginTop: 5,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 160,
    marginTop: 10,
  },
});
