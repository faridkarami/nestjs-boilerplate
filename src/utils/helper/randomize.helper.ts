const characters = {
  numeric: '0123456789',
  alphabetLowercase: 'abcdefghijklmnopqrstuvwxyz',
  alphabetUppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
};

const codeGenerator = (chars, len) => {
  let result = '';
  while (len--) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

export const generateVerificationCode = () =>
  codeGenerator(characters.numeric, 4);

export const generateReferralCode = () =>
  codeGenerator(
    `${characters.numeric}${characters.alphabetLowercase}${characters.alphabetUppercase}`,
    8,
  );

export const generateSubscriptionKey = () =>
  codeGenerator(`${characters.alphabetLowercase}`, 16);

export const generateTrackingId = () =>
  codeGenerator(`${characters.numeric}${characters.alphabetLowercase}`, 16);
