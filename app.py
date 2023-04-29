import pickle as pkl
import streamlit as st
import numpy as np

with open("./model.pkl", "rb") as file:
    model = pkl.load(file)


def predict():
    global cholestrol
    global active
    cholestrol = cholestrol_choices.index(cholestrol)
    active = active_choices.index(active)

    features = list(
        map(float, [height, sbp, dbp, cholestrol, active, age_y, pulse]))
    features = [np.array(features)]
    prediction = model.predict(features)
    label = prediction[0]

    if (label == 1):
        st.warning(
            "According to our machine learning model, we think that you do have the disease. :skull:")
    else:
        st.success(
            "Congratulations! According to us, you don't have the disease. :heart_decoration:")


if not hasattr(st, 'already_started_server'):

    cholestrol_choices = ['Normal', 'Above Normal', 'Well Above Normal']
    active_choices = ["Yes", "No"]

    st.title('Cardiovascular Disease Prediction :anatomical_heart:')
    height = st.number_input("Enter your height ( in cms )")
    sbp = st.number_input("Enter your Systolic Blood Pressure ( in mmHg )")
    dbp = st.number_input("Enter your Diastolic Blood Pressure ( in mmHg )")

    cholestrol = st.selectbox(
        'Select your cholestron level', cholestrol_choices)

    active = st.selectbox(
        'Are you physically active?', active_choices)

    age_y = st.number_input("Enter your age ( in Years )")
    pulse = st.number_input("Enter your pulse ( in pulse/sec )")
    trigger = st.button("Predict", on_click=predict)
