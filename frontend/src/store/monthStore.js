import { create }
from "zustand";

const storedDate =
  localStorage.getItem(
    "selectedDate"
  );

export const useMonthStore =
  create((set) => ({

    selectedDate:
      storedDate ||
      new Date()
        .toISOString()
        .split("T")[0],

    setSelectedDate:
      (date) => {

        localStorage.setItem(
          "selectedDate",
          date
        );

        set({
          selectedDate:
            date,
        });
      },
  }));