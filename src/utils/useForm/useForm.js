import {useState} from 'react';

const useForm = initialValue => {
  const [from, setFrom] = useState(initialValue);
  return [
    from,
    (formType, formValue) => {
      if (formType === 'reset') {
        return setFrom(initialValue);
      }
      return setFrom({...from, [formType]: formValue});
    },
  ];
};

export default useForm;
