import { useNavigate } from "react-router-dom";

function SuccessNotification({ onClose, info }) {
  const handleCerrarClick = () => {
    onClose();
  };

  const navigae = useNavigate();
  const onMislibros = () => {
    navigae("/perfil", {
      replace: true,
    });
  };
  return (
    <div className="notifications-container  animate__animated animate__headShake">
      <div
        className={
          info.data.status === 500
            ? "alert alert-danger alert-dismissible fade show"
            : "alert alert-success alert-dismissible fade show"
        }
        role="alert"
      >
        <strong>Holy guacamole! </strong>
        {info.data.message.msg === undefined
          ? info.data.message
          : info.data.message.msg}
      </div>
    </div>
  );
}

export default SuccessNotification;
