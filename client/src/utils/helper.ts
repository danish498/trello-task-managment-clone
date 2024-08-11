export const utilityFunction = (token: string) => {
  return token;
};

export const getFirstName = (name: any) => {
  if (!name) {
    return "";
  }

  const word = name.split(" ")[0];
  const firstWord = word.charAt(0).toUpperCase() + word.slice(1);

  return firstWord;
};
export const capitalizedFirstWord = (name: any) => {
  if (!name) {
    return "";
  }
  const capWord = name.charAt(0).toUpperCase() + name.slice(1);

  return capWord;
};

export function getGreetingMessage() {
  const currentHour = new Date().getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = "Good morning!";
  } else if (currentHour < 18) {
    greeting = "Good afternoon!";
  } else {
    greeting = "Good evening!";
  }

  return greeting;
}
