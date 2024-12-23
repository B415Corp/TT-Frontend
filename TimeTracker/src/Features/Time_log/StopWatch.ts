// src/components/Stopwatch.tsx
import React, { useEffect, useState } from "react";

// Функция для форматирования времени в формат "HH:MM:SS"
export const formatTime = (totalSeconds: number): string => {
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0"
  );
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

// Типизация пропсов компонента
export interface StopwatchProps {
  initialTime?: number;
}




