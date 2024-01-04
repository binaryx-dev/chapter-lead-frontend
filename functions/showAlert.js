const { default: Swal } = require("sweetalert2");

const showAlert = ({
  title = 'Alerta de prueba',
  text = 'Esta es una alerta de prueba',
  icon = 'success',
  confirmButtonText = 'Aceptar'
}) => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText
  });
};

export default showAlert;