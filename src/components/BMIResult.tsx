import React from 'react'
import {IonRow, IonCol, IonCard, IonCardContent} from '@ionic/react'

const BMIResult: React.FC <{result: number }>= ({result}) => {
    return (
        <IonRow>
          <IonCol>
            <IonCard>
              <IonCardContent className="ion-text-center">
              <h2>Your Body-Mass-Index is:</h2>
                <h2>{result.toFixed(2)}</h2>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
    )
}

export default BMIResult;