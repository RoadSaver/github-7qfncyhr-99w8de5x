import { useState } from 'react';
import {
  useSecretQuestionValidation,
  useSecretQuestionDropdownValidation,
  useCustomQuestionValidation
} from './useSecretQuestionValidation';

export const useSecretQuestions = (t: (key: string) => string) => {
  // Secret Question 1
  const [secretQuestion1, setSecretQuestion1] = useState('');
  const [customQuestion1, setCustomQuestion1] = useState('');
  const {
    value: secretAnswer1,
    setValue: setSecretAnswer1,
    error: secretAnswer1Error,
    isValid: isSecretAnswer1Valid
  } = useSecretQuestionValidation(t);

  const {
    value: secretQuestion1Validation,
    setValue: setSecretQuestion1Validation,
    error: secretQuestion1Error,
    isValid: isSecretQuestion1Valid
  } = useSecretQuestionDropdownValidation(t);

  const {
    value: customQuestion1Validation,
    setValue: setCustomQuestion1Validation,
    error: customQuestion1Error,
    isValid: isCustomQuestion1Valid
  } = useCustomQuestionValidation(t);

  // Secret Question 2
  const [secretQuestion2, setSecretQuestion2] = useState('');
  const [customQuestion2, setCustomQuestion2] = useState('');
  const {
    value: secretAnswer2,
    setValue: setSecretAnswer2,
    error: secretAnswer2Error,
    isValid: isSecretAnswer2Valid
  } = useSecretQuestionValidation(t);

  const {
    value: secretQuestion2Validation,
    setValue: setSecretQuestion2Validation,
    error: secretQuestion2Error,
    isValid: isSecretQuestion2Valid
  } = useSecretQuestionDropdownValidation(t);

  const {
    value: customQuestion2Validation,
    setValue: setCustomQuestion2Validation,
    error: customQuestion2Error,
    isValid: isCustomQuestion2Valid
  } = useCustomQuestionValidation(t);

  const handleSecretQuestion1Change = (value: string) => {
    setSecretQuestion1(value);
    setSecretQuestion1Validation(value);
    if (value !== 'custom') {
      setCustomQuestion1('');
      setCustomQuestion1Validation('');
    }
  };

  const handleSecretQuestion2Change = (value: string) => {
    setSecretQuestion2(value);
    setSecretQuestion2Validation(value);
    if (value !== 'custom') {
      setCustomQuestion2('');
      setCustomQuestion2Validation('');
    }
  };

  const handleCustomQuestion1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomQuestion1(value);
    setCustomQuestion1Validation(value);
  };

  const handleCustomQuestion2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomQuestion2(value);
    setCustomQuestion2Validation(value);
  };

  // Get the actual question text for comparison
  const getQuestion1Text = () => secretQuestion1 === 'custom' ? customQuestion1 : secretQuestion1;
  const getQuestion2Text = () => secretQuestion2 === 'custom' ? customQuestion2 : secretQuestion2;

  // Check if questions are the same
  const areQuestionsTheSame = () => {
    const q1 = getQuestion1Text();
    const q2 = getQuestion2Text();
    
    // Only check if both questions have values
    if (!q1 || !q2) return false;
    
    // Compare the actual question text (case-insensitive)
    return q1.toLowerCase().trim() === q2.toLowerCase().trim();
  };

  // For question 1, check if it's custom and use custom validation, otherwise use dropdown validation
  const isQuestion1Valid = secretQuestion1 === 'custom' ? isCustomQuestion1Valid : isSecretQuestion1Valid;
  let question1Error = secretQuestion1 === 'custom' ? customQuestion1Error : secretQuestion1Error;

  // For question 2, check if it's custom and use custom validation, otherwise use dropdown validation
  const isQuestion2Valid = secretQuestion2 === 'custom' ? isCustomQuestion2Valid : isSecretQuestion2Valid;
  let question2Error = secretQuestion2 === 'custom' ? customQuestion2Error : secretQuestion2Error;

  // Add uniqueness validation error if questions are the same
  if (areQuestionsTheSame()) {
    if (!question1Error) question1Error = t('secret-questions-must-be-different');
    if (!question2Error) question2Error = t('secret-questions-must-be-different');
  }

  // Overall validation includes uniqueness check
  const isSecretQuestionsValid = isQuestion1Valid && isSecretAnswer1Valid && 
                                isQuestion2Valid && isSecretAnswer2Valid &&
                                !areQuestionsTheSame();

  return {
    // Question 1
    secretQuestion1,
    secretAnswer1,
    setSecretAnswer1,
    secretQuestion1Error: question1Error,
    secretAnswer1Error,
    isSecretQuestion1Valid: isQuestion1Valid && !areQuestionsTheSame(),
    isSecretAnswer1Valid,
    handleSecretQuestion1Change,
    customQuestion1,
    handleCustomQuestion1Change,
    customQuestion1Error,
    isCustomQuestion1Valid,
    
    // Question 2
    secretQuestion2,
    secretAnswer2,
    setSecretAnswer2,
    secretQuestion2Error: question2Error,
    secretAnswer2Error,
    isSecretQuestion2Valid: isQuestion2Valid && !areQuestionsTheSame(),
    isSecretAnswer2Valid,
    handleSecretQuestion2Change,
    customQuestion2,
    handleCustomQuestion2Change,
    customQuestion2Error,
    isCustomQuestion2Valid,
    
    // Overall validation
    isSecretQuestionsValid,
    
    // Helper methods to get final question text
    getQuestion1Text,
    getQuestion2Text,
    
    // Uniqueness check
    areQuestionsTheSame
  };
};