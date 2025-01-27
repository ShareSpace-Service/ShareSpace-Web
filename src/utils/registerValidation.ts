export const validatePassword = (password: string) => {
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  return regex.test(password);
};

export const validateEmail = (email: string) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};

export const validateNickname = (nickname: string) => {
  return nickname.length >= 2 && nickname.length <= 50;
};

export const validateForm = (formData: {
  email: string;
  password: string;
  passwordValidate: string;
  nickname: string;
  location: string;
}) => {
  const { email, password, passwordValidate, nickname, location } = formData;

  if (!email || !password || !passwordValidate || !nickname || !location) {
    return { isValid: false, message: '필수 입력 항목을 확인해주세요.' };
  }

  if (!validatePassword(password)) {
    return {
      isValid: false,
      message:
        '비밀번호는 문자, 숫자, 특수문자를 포함한 8-20자로 설정해야 합니다.',
    };
  }

  if (password !== passwordValidate) {
    return { isValid: false, message: '비밀번호가 일치하지 않습니다.' };
  }

  if (!validateNickname(nickname)) {
    return {
      isValid: false,
      message: '닉네임은 2자 이상 50자 이내로 작성해주세요.',
    };
  }

  return { isValid: true, message: '' };
};
