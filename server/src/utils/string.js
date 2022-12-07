const generateNickName = (email) => {
  const rawString = email.split('@')[0];
  var regex = /[!@#\$%\^\&*\)\(+=._-]/g;
  const stringArray = rawString.split(regex);
  const resultArray = stringArray.map((word, index) => {
    return word.toLowerCase()[0].toUpperCase() + word.substring(1);
  });

  return resultArray.join('');
};

module.exports = { generateNickName };
