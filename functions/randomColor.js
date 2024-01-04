// Esta función genera un número aleatorio entre 0 y 255
const generarNumeroAleatorio = (bright = 10) => {
  if(bright > 0) return Math.floor(Math.random() * 156 + (bright * 10));
  else return Math.floor(Math.random() * 256);
}

// Esta función convierte un número decimal a hexadecimal
const decimalAHexadecimal = (numero) => numero.toString(16).padStart(2, "0");

// Esta función genera un color hexadecimal
const generarColorHexadecimal = () => {
  // Generamos los valores de rojo, verde y azul
  const r = generarNumeroAleatorio();
  const g = generarNumeroAleatorio();
  const b = generarNumeroAleatorio();
  // Los convertimos a hexadecimal
  const hexR = decimalAHexadecimal(r);
  const hexG = decimalAHexadecimal(g);
  const hexB = decimalAHexadecimal(b);
  // Los concatenamos con el símbolo #
  const colorHex = "#" + hexR + hexG + hexB;
  // Devolvemos el color hexadecimal
  return colorHex;
}

// Esta función genera un color RGB
const generarColorRGB = () => {
  // Generamos los valores de rojo, verde y azul
  const r = generarNumeroAleatorio();
  const g = generarNumeroAleatorio();
  const b = generarNumeroAleatorio();
  // Los concatenamos con el formato rgb(r, g, b)
  const colorRGB = "rgb(" + r + ", " + g + ", " + b + ")";
  // Devolvemos el color RGB
  return colorRGB;
}

const randomColor = {
  RGB: generarColorRGB,
  HEX: generarColorHexadecimal
}

export default randomColor;
