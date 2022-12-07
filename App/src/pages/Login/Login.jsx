import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";

import { loginUser } from "../../services/API";

const Login = () => {
  const [userLogin, setUserLogin] = useState("");
  const [eye, setEye] = useState(false);

  const toggleEye = (ev) => {
    ev.preventDefault();
    setEye(!eye);
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (values) => {
    values.preventDefault();
    loginUser({
      nickname: values.nickname,
      password: values.password,
    });
  };

  return (
    <div className="loginContainer">
      <div className="loginPage">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="ucademyDiv">
            <img src="imagen del melocotonsito que es nuestro logo" alt="logo" />
          </div>
          <div className="alignCenter ">
            <span>Nickname:</span>
          </div>
          <div className="alignCenter inputBox">
            <label className="userlabel">
              <input
                className="input"
                {...register("username", {
                  required: true,
                  minLength: 2,
                })}
                type="text"
                onChange={(ev) => setUserLogin({ ...userLogin, nickname: ev.target.value })}
              />
              {errors.username ? <p className="error">Este campo es requerido y debe tener al menos 2 caracteres</p> : null}
            </label>
          </div>
          <div className="alignCenter password">
            <label className="passwordDiv">
              <div>
                <span>Contraseña:</span>
              </div>
              <div className="inputBox">
                <label>
                  <button className="passwordBtn" onClick={(ev) => toggleEye(ev)}>
                    {eye ? <BsEyeSlash /> : <BsEye />}
                  </button>
                  <input
                    className="input"
                    {...register("Contraseña", {
                      required: true,
                      minLength: 6,
                      pattern: /^\S*$/,
                      validate: {
                        format: (Contraseña) => {
                          return /[A-Z]/g.test(Contraseña) && /[a-z]/g.test(Contraseña) && /[0-9]/g.test(Contraseña);
                        },
                      },
                    })}
                    placeholder="*****"
                    type={eye ? "text" : "password"}
                    onChange={(ev) => setUserLogin({ ...userLogin, password: ev.target.value })}
                  />

                  {errors.Contraseña ? (
                    <p className="error">
                      {errors.Contraseña.type === "format"
                        ? "La contraseña debe contener al menos una mayúscula, una minúscula y un número"
                        : "Este campo es requerido y debe tener al menos 6 caracteres"}
                    </p>
                  ) : null}
                </label>
              </div>
            </label>
          </div>
          <button className="loginBtn" type="submit">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
