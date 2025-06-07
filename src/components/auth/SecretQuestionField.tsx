import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import RegisterFormFieldInput from './RegisterFormFieldInput';
import { AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SecretQuestionFieldProps {
  questionNumber: number;
  selectedQuestion: string;
  onQuestionChange: (value: string) => void;
  answer: string;
  onAnswerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  questionError: string;
  answerError: string;
  isQuestionValid: boolean;
  isAnswerValid: boolean;
  customQuestion: string;
  onCustomQuestionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customQuestionError: string;
  isCustomQuestionValid: boolean;
  t: (key: string) => string;
}

// List of translation keys for secret questions (must match keys in authSecretQuestions.ts)
const secretQuestionKeys = [
  'mothers-maiden-name',
  'first-pet-name',
  'birth-city',
  'elementary-school',
  'favorite-teacher',
  'childhood-friend',
  'first-car',
  'favorite-book',
  'childhood-nickname',
  'favorite-food',
  'street-grew-up',
  'fathers-middle-name',
  'high-school-mascot',
  'first-job',
  'dream-vacation',
];

const SecretQuestionField: React.FC<SecretQuestionFieldProps> = ({
  questionNumber,
  selectedQuestion,
  onQuestionChange,
  answer,
  onAnswerChange,
  questionError,
  answerError,
  isQuestionValid,
  isAnswerValid,
  customQuestion,
  onCustomQuestionChange,
  customQuestionError,
  isCustomQuestionValid,
  t
}) => {
  const renderValidationIcon = (isValid: boolean, error: string) => {
    if (error) return <AlertCircle className="h-5 w-5 text-red-500" />;
    if (isValid) return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    return null;
  };

  const isCustomSelected = selectedQuestion === 'custom';

  const handleBackToDropdown = () => {
    onQuestionChange('');
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`secret-question-${questionNumber}`}>
          {t(`secret-question-${questionNumber}`)}
        </Label>
        {!isCustomSelected ? (
          <div className="relative">
            <Select value={selectedQuestion} onValueChange={onQuestionChange}>
              <SelectTrigger className={`border-2 focus:ring-green-600 focus:border-green-600 ${questionError ? 'border-red-500' : isQuestionValid ? 'border-green-500' : ''}`}>
                <SelectValue placeholder={t('select-question')} />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                {secretQuestionKeys.map((key) => (
                  <SelectItem key={key} value={key} className="hover:bg-gray-100">
                    {t(key)}
                  </SelectItem>
                ))}
                <SelectItem value="custom" className="hover:bg-gray-100">
                  - {t('create-your-own-question')} -
                </SelectItem>
              </SelectContent>
            </Select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {renderValidationIcon(isQuestionValid, questionError)}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleBackToDropdown}
                className="p-1 h-auto text-green-600 hover:text-green-700"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                {t('back-to-questions')}
              </Button>
            </div>
            <div className="relative">
              <Input
                id={`custom-question-${questionNumber}`}
                type="text"
                placeholder={t('enter-your-custom-question')}
                value={customQuestion}
                onChange={onCustomQuestionChange}
                className={`border-2 focus:ring-green-600 focus:border-green-600 ${customQuestionError ? 'border-red-500' : isCustomQuestionValid ? 'border-green-500' : ''}`}
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                {renderValidationIcon(isCustomQuestionValid, customQuestionError)}
              </div>
            </div>
            {customQuestionError && <p className="text-red-500 text-xs mt-1">{customQuestionError}</p>}
          </div>
        )}
        {!isCustomSelected && questionError && <p className="text-red-500 text-xs mt-1">{questionError}</p>}
      </div>
      <RegisterFormFieldInput
        id={`secret-answer-${questionNumber}`}
        label={t('your-answer')}
        type="text"
        placeholder={t('enter-your-answer')}
        value={answer}
        onChange={onAnswerChange}
        error={answerError}
        isValid={isAnswerValid}
        renderValidationIcon={renderValidationIcon}
        t={t}
        required
      />
    </div>
  );
};

export default SecretQuestionField;
