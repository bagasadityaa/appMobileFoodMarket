import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const isRestoOpen = (jamBuka, jamTutup, hariBuka) => {
  const currentDay = new Date().getDay(); // Mendapatkan hari saat ini (0 = Minggu, 1 = Senin, dst.)
  const currentTime = new Date();
  const openTime = new Date(`1970-01-01T${jamBuka}`);
  const closeTime = new Date(`1970-01-01T${jamTutup}`);

  // Mengubah hari saat ini menjadi nama hari (misalnya, 'Minggu', 'Senin', dst.)
  const daysOfWeek = [
    'Minggu',
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
  ];
  const currentDayName = daysOfWeek[currentDay];

  // Memeriksa apakah hari saat ini sama dengan hari buka restoran
  if (currentDayName.toLowerCase() !== hariBuka.toLowerCase()) {
    return false; // Restoran tutup jika hari tidak sesuai
  }

  return currentTime >= openTime && currentTime <= closeTime;
};

export default isRestoOpen;

const styles = StyleSheet.create({});
