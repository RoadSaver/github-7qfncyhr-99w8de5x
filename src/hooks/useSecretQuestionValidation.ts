
import { useFieldValidation } from './useFieldValidation';

export const useSecretQuestionValidation = (t: (key: string) => string) => {
  return useFieldValidation<string>(
    '',
    [
      (answer) => {
        if (!answer || answer.trim().length === 0) {
          return { isValid: false, errorMessage: t('secret-answer-required') };
        }
        if (answer.trim().length < 2) {
          return { isValid: false, errorMessage: t('secret-answer-too-short') };
        }
        return { isValid: true, errorMessage: null };
      }
    ],
    [t]
  );
};

export const useSecretQuestionDropdownValidation = (t: (key: string) => string) => {
  return useFieldValidation<string>(
    '',
    [
      (question) => {
        if (!question || question === '') {
          return { isValid: false, errorMessage: t('secret-question-required') };
        }
        return { isValid: true, errorMessage: null };
      }
    ],
    [t]
  );
};

export const useCustomQuestionValidation = (t: (key: string) => string) => {
  return useFieldValidation<string>(
    '',
    [
      (question) => {
        if (!question || question.trim().length === 0) {
          return { isValid: false, errorMessage: t('custom-question-required') };
        }
        if (question.trim().length < 5) {
          return { isValid: false, errorMessage: t('custom-question-too-short') };
        }
        return { isValid: true, errorMessage: null };
      }
    ],
    [t]
  );
};
