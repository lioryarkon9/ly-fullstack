'use client';
import React from 'react';

interface FormData {
  name: string;
  age: string;
  habits: string[];
}

const INITIAL_PERSON: FormData = {
  name: '',
  age: '',
  habits: [],
};

export const CreateGreetingCard: React.FC = () => {
  const [birthdayPerson, setBirthdayPerson] =
    React.useState<FormData>(INITIAL_PERSON);

  const resetForm = () => setBirthdayPerson(INITIAL_PERSON);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBirthdayPerson((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleHabitsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { options } = e.target;
    const selectedHabits: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedHabits.push(options[i].value);
      }
    }
    setBirthdayPerson((prevFormData) => ({
      ...prevFormData,
      habits: selectedHabits,
    }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch('/api/createCard', {
      method: 'POST',
      body: JSON.stringify({
        name: birthdayPerson.name,
        age: birthdayPerson.age,
        selectedHabits: birthdayPerson.habits,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log('res: ', res))
      .then(() => document.querySelector('#createGreetingCardDialog')?.close())
      .then(() => resetForm());
  };

  const isValidForm =
    birthdayPerson.name.length > 1 &&
    birthdayPerson.age &&
    birthdayPerson.habits.length > 0;

  return (
    <dialog id="createGreetingCardDialog">
      <form
        onSubmit={onSubmit}
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}
      >
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={birthdayPerson.name}
          onChange={handleChange}
        />

        <label htmlFor="age">Age:</label>
        <select
          id="age"
          name="age"
          value={birthdayPerson.age}
          onChange={handleChange}
        >
          <option value="">Select Age</option>
          <option value="child">Child</option>
          <option value="teenager">Teenager</option>
          <option value="adult">Adult</option>
        </select>

        <label htmlFor="habits">Habits:</label>
        <select
          id="habits"
          name="habits"
          multiple
          value={birthdayPerson.habits}
          onChange={handleHabitsChange}
        >
          <option value="exercise">Exercise</option>
          <option value="reading">Reading</option>
          <option value="music">Music</option>
          <option value="drawing">Drawing</option>
        </select>

        <div>
          <button disabled={!isValidForm} type="submit">
            Submit
          </button>
          <button
            onClick={(event) => {
              event.preventDefault();
              document.querySelector('#createGreetingCardDialog')?.close();
            }}
          >
            Close
          </button>
        </div>
      </form>
    </dialog>
  );
};
