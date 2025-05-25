import { defaultChangePasswordRepository } from "api/repositories/changePassword/ChangePasswordRepository";
import popUpComponent from "components/generalComponents/popUpComponent/PopUpComponent";
import { AuthenticationContext } from "context/AuthenticationContext";
import React from "react";
import { useHistory } from "react-router-dom";

const ChangePasswordViewModel = () => {
  const history = useHistory();
  const [info, setInfo] = React.useState<Record<string, any>>({});
  const [error, setError] = React.useState<Record<string, any>>({});
  const [loading, setLoading] = React.useState<boolean>(false);
  const { localStrings } = AuthenticationContext();

  const onSubmit = async () => {
    try {
      if (!info.oldPassword && !info.password && !info.confirmPassword) {
        return setError({
          oldPassword: true,
          password: true,
          confirmPassword: true,
        });
      }
      if (!info.oldPassword) return setError({ ...error, oldPassword: true });
      if (!info.password) return setError({ ...error, password: true });
      if (!info.confirmPassword)
        return setError({
          ...error,
          confirmPassword: localStrings.ChangePassword.Message.InvalidPass,
        });

      if (info.password !== info.confirmPassword) {
        return setError({
          ...error,
          confirmPassword: localStrings.ChangePassword.Message.UnmatchedPass,
        });
      }
      setLoading(true);

      const body = {
        oldPassword: info.oldPassword,
        newPassword: info.confirmPassword,
      };

      const res = await defaultChangePasswordRepository?.changePassword(body);
      if (res) {
        popUpComponent.success(
          localStrings.ChangePassword.Message.ChangePassSucceed,
          5
        );
        localStorage.removeItem("thesis-cms-token");
        history.push("/login");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      popUpComponent.error(err && err.error?.message, 4);
    } finally {
      setLoading(false);
    }
  };

  const handleOnChange = (e) => {
    setError({});
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  return {
    info,
    error,
    loading,
    onSubmit,
    handleOnChange,
  };
};

export default ChangePasswordViewModel;
