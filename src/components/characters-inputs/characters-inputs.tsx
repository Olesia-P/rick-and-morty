import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import css from "./characters-inputs.module.scss";
import { CharactersState } from "../../types/types";
import { RadioButtonInput } from "./radio-button-input/radio-button-input";
import {
  changeGender,
  changeName,
  changePage,
  changeStatus,
} from "../../store/modules/characters-slice";

export const CharactersInputs = () => {
  const genders = [
    {
      value: "male",
      render: "male",
    },
    {
      value: "female",
      render: "female",
    },
    {
      value: "genderless",
      render: "genderless",
    },
    {
      value: "unknown",
      render: "unknown",
    },
    {
      value: "",
      render: "not chosen",
    },
  ];
  const status = [
    {
      value: "alive",
      render: "alive",
    },
    {
      value: "dead",
      render: "dead",
    },

    {
      value: "unknown",
      render: "unknown",
    },
    {
      value: "",
      render: "not chosen",
    },
  ];
  const [name, setName] = useState("");
  const charactersParams = useSelector(
    (state: { characters: CharactersState }) =>
      state.characters.charactersParams
  );

  const router = useRouter();

  const dispatch = useDispatch();
  const handleGenderFilter = (option: { value: string; render: string }) => {
    dispatch(changeGender(option.value));
    dispatch(changePage("1"));
    router.push("/characters/pages/1");
  };
  const handleStatusFilter = (option: { value: string; render: string }) => {
    dispatch(changeStatus(option.value));
    dispatch(changePage("1"));
    router.push("/characters/pages/1");
  };
  const handleNameFilter = (option: string) => {
    dispatch(changeName(option));
    dispatch(changePage("1"));
    router.push("/characters/pages/1");
  };

  return (
    <div className={css.container}>
      <form
        className={css.inputWrap}
        onSubmit={(event) => {
          event.preventDefault();
          handleNameFilter(name);
        }}
      >
        <input
          type="text"
          value={name}
          placeholder="Type a character name..."
          onChange={(event) => setName(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <RadioButtonInput
        values={genders}
        setState={handleGenderFilter}
        statePropertyToChange="gender"
        title="Choose gender"
        mainState={charactersParams}
      />
      <RadioButtonInput
        values={status}
        setState={handleStatusFilter}
        statePropertyToChange="status"
        title="Choose status"
        mainState={charactersParams}
      />
    </div>
  );
};
