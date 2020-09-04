import React, {useRef, useState} from 'react';
import { IonApp, IonHeader, IonContent, IonToolbar, IonTitle, IonGrid, IonRow, IonCol, IonItem, IonInput, IonLabel, IonAlert} from '@ionic/react';
import BMIControls from './components/BMIControls'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import BMIResult from './components/BMIResult';
import { InputControl } from './components/InputControl';


const App: React.FC = () => {
  const [calcualtedBMI, setCalcualtedBMI] = useState<number>()
  const [error, setError]= useState<string>()
  const [calcUnits, setCalcUnits] = useState<'mkg' |'ftlbs'>('mkg')

  const weighInputRef= useRef<HTMLIonInputElement>(null);
  const heightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBMI=()=>{
    const enteredWeight =  weighInputRef.current!.value;
    const enteredHeight = heightInputRef.current!.value;
    if(!enteredHeight || !enteredWeight || +enteredHeight <=0 || +enteredWeight <=0){
      setError('Please entere a valid non negetive number!')
      return;
    }
    const weightConversionFactor = calcUnits === 'ftlbs'? 2.2 : 1;
    const heightConversionFactor = calcUnits === 'ftlbs'? 3.28: 1;

    const weight = +enteredWeight / weightConversionFactor;
    const height = +enteredHeight / heightConversionFactor;

    const bmi = weight/(height* height)
    setCalcualtedBMI(bmi)
  }

  const resetInput =()=>{
    weighInputRef.current!.value = '';
    heightInputRef.current!.value = '';
    setCalcualtedBMI(0)
  }

  const clearError = ()=>{
    setError('')
  }

  const selectCalcUnitHandler = (selectedValue: 'mkg' | 'ftlbs')=>{
    setCalcUnits(selectedValue)
  }
return (
  <React.Fragment>
    <IonAlert isOpen={!!error} message={error} buttons={[ {
      text:'Okay', handler: clearError
    }]}/>

  <IonApp>
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>BMI Calculator</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <IonGrid>
        <IonRow>
          <IonCol>
            <InputControl selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler}/>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Your Height ({calcUnits === 'mkg'? 'meteres': 'feets'})</IonLabel>
              <IonInput type="number" ref={heightInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Your Weight ({calcUnits === 'mkg'? 'kg': 'lbs'})</IonLabel>
              <IonInput type="number" ref={weighInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <BMIControls onCalculate={calculateBMI} onReset={resetInput}/>
        {calcualtedBMI ? (
        <BMIResult result={calcualtedBMI}/>
        ): null}
      </IonGrid>
    </IonContent>
  </IonApp>
  </React.Fragment>
)};

export default App;
