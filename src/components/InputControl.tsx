import React from 'react'
import {IonSegment, IonSegmentButton, IonLabel } from '@ionic/react'
export const InputControl:React.FC <{selectedValue: 'mkg'| 'ftlbs'; onSelectValue: (value: 'mkg'| 'ftlbs')=>void}>= (props) => {

    const inputHandler = (e: CustomEvent)=>{
        props.onSelectValue(e.detail.value)
    }
    return (
        <IonSegment value={props.selectedValue} onIonChange={inputHandler}>
            <IonSegmentButton value="mkg">
                <IonLabel>m/kg</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="ftlbs">
                <IonLabel>ft/lbs</IonLabel>
            </IonSegmentButton>
        </IonSegment>
    )
}
