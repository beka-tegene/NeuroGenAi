import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  InputStrokeRecommendations: [],
  InputStrokepredictor: [],
};

const PredictionStore = createSlice({
  name: "prediction",
  initialState: initialState,
  reducers: {
    setStrokeRecommendationsData(state) {},
    setStrokeRecommendations(state, action) {
      const newData = action.payload;
      state.InputStrokeRecommendations.push({
        exposure_percent: 40,
        weight: newData.weight,
        height: newData.height,
        history_of_stroke: newData.history_of_stroke,
        family_history_of_stroke: newData.family_history_of_stroke,
        physical_activity_level: newData.physical_activity_level,
        diet: newData.diet,
        systolic_blood_pressure: newData.systolic_blood_pressure,
        diastolic_blood_pressure: newData.diastolic_blood_pressure,
        data: [
          {
            age: newData.age,
            hypertension: newData.hypertension,
            heart_disease: newData.heart_disease,
            ever_married: newData.ever_married,
            work_type: newData.work_type,
            Residence_type: newData.Residence_type,
            avg_glucose_level: newData.avg_glucose_level,
            bmi: newData.bmi,
            smoking_status: newData.smoking_status,
            gender: newData.gender,
          },
        ],
      });
    },
    setStrokepredictorData(state) {},
    setStrokepredictor(state, action) {
      const newData = action.payload;
      state.InputStrokepredictor.push({
        data: [
          {
            age: newData.age,
            hypertension: newData.hypertension,
            heart_disease: newData.heart_disease,
            ever_married: newData.ever_married,
            work_type: newData.work_type,
            Residence_type: newData.Residence_type,
            avg_glucose_level: newData.avg_glucose_level,
            bmi: newData.bmi,
            smoking_status: newData.smoking_status,
            gender: newData.gender,
          },
        ],
      });
    },
  },
});

export const {
  setStrokeRecommendationsData,
  setStrokeRecommendations,
  setStrokepredictorData,
  setStrokepredictor,
} = PredictionStore.actions;

export default PredictionStore.reducer;
