import { useNavigate } from "react-router-dom";
import { nomesAlimentos } from "../types/types";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import styles from "./CalculadoraChurrasco.module.css";

const CalculadoraChurrasco = () => {
  const navigate = useNavigate();
  const esquemaValidacao = Yup.object().shape({
    pessoas: Yup.number().min(1, "Número de pessoas é obrigatório"),
    selecaoAlimentos: Yup.array()
      .of(Yup.string())
      .test(
        "check-selecaoAlimentos",
        "Selecione pelo menos um alimento",
        (array) => array !== null && array!.length > 0
      ),
  });

  return (
    <div className={styles.container}>
      <Formik
        initialValues={{ pessoas: 0, selecaoAlimentos: [] }}
        onSubmit={(values) => {
          navigate("/resultado", {
            state: {
              pessoas: values.pessoas,
              alimentosSelecionados: values.selecaoAlimentos,
            },
          });
        }}
        validationSchema={esquemaValidacao}
      >
        {({ errors, touched }) => (
          <Form>
            <div className={styles.inputGroup}>
              <label htmlFor="pessoas" className={styles.inputLabel}>
                Número de Pessoas
              </label>
              <Field
                className={styles.inputField}
                name="pessoas"
                type="number"
              />
              {errors.pessoas && touched.pessoas ? (
                <p className={styles.error}>{errors.pessoas}</p>
              ) : null}
            </div>
            <h2>Selecione os alimentos para o churrasco</h2>
            {Object.keys(nomesAlimentos).map((alimento) => (
              <div key={alimento}>
                <Field
                  type="checkbox"
                  name="selecaoAlimentos"
                  value={alimento}
                  className={styles.checkboxInput}
                />
                <label htmlFor="selecaoAlimentos">
                  {nomesAlimentos[alimento]}
                </label>
              </div>
            ))}
            {errors.selecaoAlimentos && touched.selecaoAlimentos ? (
              <p className={styles.error}>{errors.selecaoAlimentos}</p>
            ) : null}
            <button className={styles.calculateButton} type="submit">
              Calcular
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CalculadoraChurrasco;
