import { makeVar } from "@apollo/client";

export const test = makeVar(true);

export const loading = makeVar(false);

export const dashboard = makeVar(false);

export const survey = makeVar({
  surveyName: "",
  targetAudienceID: "",
  surveyTemplate: "",
  lastActivity: "",
});

export const sendSurveyValues = makeVar({
  surveyTemplate: "",
  surveyBrief: "",
  surveyName: "",
  targetAudienceId: 0,
  canRetake: "",
  retakeLimit: "",
  maxRespondents: "",
  joinCode: "",
  retakeName: "",
  retakeValue: "",
  participantTimeoutName: " ",
  participantTimeoutValue: 0,
  surveyTimeOutName: " ",
  surveyTimeOutValue: 0,
  incentiveName: " ",
  incentiveValue: 0,
});

export const loadingStatus = makeVar(false);

export const staticFooter = makeVar(false);

export const loadingNavStatus = makeVar(false);

export const responseMessage = makeVar({
  open: false,
  title: "",
  state: "info", // to represent success, error, warning, info
  message: "",
  element: null,
});
