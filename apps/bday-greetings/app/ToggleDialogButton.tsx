'use client';
import React from 'react';

export function ToggleDialogButton() {
  const toggleDialog = () => {
    const dialog = document.querySelector('#createGreetingCardDialog');

    dialog?.showModal();
  };
  return <button onClick={toggleDialog}>New Greeting Card</button>;
}
