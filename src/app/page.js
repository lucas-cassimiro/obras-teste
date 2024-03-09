"use client";

import { useForm, SubmitHandler, Submit, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";

const registerConstructionSchema = z.object({
  obra: z.object({
    casas: z.array(
      z.object({
        name: z.string().nonempty(),
      })
    ),
  }),
});

export default function Home() {
  const [numeroCasas, setNumeroCasas] = useState(0);
  const [numeroLocaisRepeticao, setNumeroLocaisRepeticao] = useState(0);
  const [location, setLocation] = useState([]);
  console.log(location);

  const [casas, setCasas] = useState([]);
  console.log(casas);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
    control,
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(registerConstructionSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    data.obra.casas = casas;
    console.log(data);
  };

  const onError = (errors) => {
    console.log(errors);
  };

  const handleLocationChange = (index, value) => {
    const newLocations = [...location];
    newLocations[index] = value;
    setLocation(newLocations);

    const novasCasas = [];
    for (let i = 0; i < numeroCasas; i++) {
      for (let j = 0; j < newLocations.length; j++) {
        novasCasas.push({ name: `Casa ${i + 1}`, locais: newLocations[j] });
      }
    }
    setCasas(novasCasas);
  };

  return (
    <main className="bg-black">
      <div className="bg-white">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <label>Quantas unidades de repetição?</label>
          <input
            type="number"
            value={numeroCasas}
            onChange={(e) => setNumeroCasas(parseInt(e.target.value))}
          />
          <label>Quantos locais de unidade de repetição?</label>
          <input
            type="number"
            value={numeroLocaisRepeticao}
            onChange={(e) => setNumeroLocaisRepeticao(parseInt(e.target.value))}
          />

          {Array.from({ length: numeroCasas }).map((_, indexCasa) => (
            <div key={indexCasa}>
              <label>{`Casa ${indexCasa + 1}`}</label>
              <input {...register(`obra.casas[${indexCasa}].name`)} />
            </div>
          ))}

          <div className="mt-5">
            {Array.from({ length: numeroLocaisRepeticao }).map((_, index) => (
              <div key={index}>
                <label>{`Local ${index + 1}`}</label>
                <input
                  type="text"
                  onChange={(e) => handleLocationChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>
          <button type="submit" disabled={isSubmitting}>
            Enviar
          </button>
        </form>
      </div>
    </main>
  );
}
