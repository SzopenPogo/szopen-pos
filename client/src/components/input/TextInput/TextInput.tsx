import InputWrapper from 'components/input/InputWrapper/InputWrapper';
import useAssignRefs from 'hooks/useAssignRefs';
import { ChangeEvent, forwardRef, useEffect, useId, useRef, useState } from 'react';

interface Props {
  title: string;
  value?: string;
  isReadonly?: boolean;
  isValid?: boolean;
  minLenght?: number;
  maxLenght?: number;
  onChange?: (value: string) => void;
}

const TextInput = forwardRef<HTMLInputElement, Props>(({
  title,
  value = '',
  isReadonly,
  isValid = true,
  minLenght,
  maxLenght,
  onChange
}, ref) => {
  const inputLocalRef = useRef<HTMLInputElement>(null);
  const inputRef = useAssignRefs(inputLocalRef, ref);
  const imputId = useId();

  const [inputValue, setInputValue] = useState<string>(value);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isInputValid, setIsInputValid] = useState<boolean>(isValid);

  useEffect(() => {

    // Remove invalid input border if input value length is 0
    if(inputValue.length <= 0) {
      setIsInputValid(true);
    } else {
      setIsInputValid(isValid);
    }
  }, [inputValue, isValid])
  

  const inputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);

    if(onChange) {
      onChange(newValue);
    }
  }

  const focusInput = () => {
    inputLocalRef.current?.focus();
    setFocus();
  }

  const setFocus = () => {
    setIsFocus(true);
  }

  const setBlur = () => {
    setIsFocus(false);
  }


  return (
    <InputWrapper
      focusInput={focusInput}
      isInputFocus={isFocus}
      title={title}
      inputId={imputId}
      isValid={isInputValid}
    >
      <input
        ref={inputRef}
        id={imputId}
        onBlur={setBlur}
        maxLength={maxLenght}
        minLength={minLenght}
        type='text'
        title={title}
        readOnly={isReadonly}
        value={inputValue}
        onChange={inputValueHandler}
      />
    </InputWrapper>
  )
})

export default TextInput;