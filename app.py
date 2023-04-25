import pickle as pkl
import streamlit as st
import numpy as np

cholestrol_choice = ['Normal', 'Above Normal', 'Well Above Normal']

st.title('Cardiovascular Disease Prediction :anatomical_heart:')
age = st.number_input("Enter your age ( in Days )")
height = st.number_input("Enter your height ( in cms )")
sbp = st.number_input("Enter your Systolic Blood Pressure ( in mmHg )")
dbp = st.number_input("Enter your Diastolic Blood Pressure ( in mmHg )")
cholestrol = st.selectbox(
    'Pick one', cholestrol_choice)
age_y = st.number_input("Enter your age ( in Years )")
pulse = st.number_input("Enter your pulse ( in pulse/sec )")

with open("./model.pkl", "rb") as file:
    model = pkl.load(file)


def predict():
    global cholestrol
    cholestrol = cholestrol_choice.index(cholestrol)

    features = list(
        map(float, [0, age, height, sbp, dbp, cholestrol, age_y, pulse]))
    features = [np.array(features)]
    prediction = model.predict(features)
    label = prediction[0]

    print(type(label))
    print(label)

    st.success('Does the person die or survive? : ' +
               str(label) + ' :thumbsup:')


trigger = st.button("Predict", on_click=predict)
