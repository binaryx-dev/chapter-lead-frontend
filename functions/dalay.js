export default function delay(miliSeconds) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Hecho!');
    }, miliSeconds);
  });
}