import { validate, minLength, isNumber, required, minNumber, numberBetween, isEmail } from "../deps.js";


// Input fields validation rules
const authFormRules = {
    email: [required, isEmail],
    password: [required, minLength(4)],
};

const morningFormRules = {
  sleepDuration: [required, isNumber, minNumber(0)],
  sleepQuality: [required, isNumber, numberBetween(1,5)],
  mood: [required, isNumber, numberBetween(1,5)]
}

const eveningFormRules = {
  exerciseTime: [required, isNumber, minNumber(0)],
  studyTime: [required, isNumber, minNumber(0)],
  qualityOfEating: [required, isNumber, numberBetween(1,5)],
  mood: [required, isNumber, numberBetween(1,5)]
}


// Get the data from Input fields
const getRegistrationData = async (request) => {
  const data = {
    email: "",
    password: '',
    verification: '',
    errors: null
  };

  if (request) {
    const body = request.body();
    const params = await body.value;
    data.email = params.get("email");
    data.password = params.get("password");
    data.verification = params.get("verification");
  }

  return data;
};


const getMorningData = async (request) => {
  const data = {
    date: '',
    sleepDuration:'',
    sleepQuality:'',
    mood: '',
  }
  if (request) {
    const body = request.body();
    const params = await body.value;
    data.date = params.get("date").substring(0,10);
    data.sleepDuration = Number(params.get("sleepDuration"));
    data.sleepQuality = Number(params.get("sleepQuality"));
    data.mood = Number(params.get("mood"));
  }

  return data;
}

const getEveningData = async (request) => {
  const data = {
    date: '',
    exerciseTime:'',
    studyTime:'',
    qualityOfEating:'',
    mood: '',
  }
  if (request) {
    const body = request.body();
    const params = await body.value;
    data.date = params.get("date").substring(0,10);
    data.exerciseTime = Number(params.get("exerciseTime"));
    data.studyTime = Number(params.get("studyTime"));
    data.qualityOfEating = Number(params.get("qualityOfEating"));
    data.mood = Number(params.get("mood"));
  }
  return data;
}


// Validate inputfield data based on the above validation rules

const validateRegistration = async (request) => {
  const data = await getRegistrationData(request)
  const [passes, errors] = await validate(data, authFormRules);
  if (!passes) {
    data.errors = errors;
  }
  return data;
}

const validateMorningForm = async(request) => {
  const data = await getMorningData(request);
  const [passes, errors] = await validate(data, morningFormRules);
    if(!passes){
        data.errors = errors;
    }
  return data;
}

const validateEveningForm = async(request) => {
  const data = await getEveningData(request);
  const [passes, errors] = await validate(data, eveningFormRules);
    if(!passes){
        data.errors = errors;
    }
  return data;
}


export { validateRegistration, validateMorningForm, validateEveningForm};